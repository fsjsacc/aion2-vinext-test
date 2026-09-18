"""Generate one resumable editorial locale from the reviewed English records.

The generated copy is an initial localization draft. Technical identifiers,
URLs, map filters, and the PFG byline are deliberately preserved. The public
site labels these locales as editorial translations whose game terminology is
still subject to replacement by future official terminology.
"""

from __future__ import annotations

import argparse
import copy
import json
import os
import re
from pathlib import Path
from typing import Any

os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")
os.environ.setdefault("ARGOS_BEAM_SIZE", "1")
os.environ.setdefault("ARGOS_BATCH_SIZE", "256")
os.environ.setdefault("ARGOS_INTRA_THREADS", "2")

from argostranslate import translate  # noqa: E402


TARGET_CODES = {
    "zh-hans": "zh",
    "fr": "fr",
    "de": "de",
    "es": "es",
    "ja": "ja",
    "pt-br": "pt",
    "ru": "ru",
}

PRESERVED_KEYS = {"id", "byline", "href", "mapSlug", "filterSubtype"}
START_PREFIX = "984"
END_PREFIX = "985"
MARKER_DIGITS = 9


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--locale", required=True, choices=TARGET_CODES)
    parser.add_argument(
        "--source",
        default="tmp/editorial-content-source.json",
    )
    parser.add_argument("--output-dir", default="tmp/editorial-locales")
    parser.add_argument("--cache-dir", default="tmp/editorial-translation-cache")
    return parser.parse_args()


def collect_strings(value: Any, key: str = "", result: list[str] | None = None):
    result = result if result is not None else []
    if isinstance(value, str):
        if key not in PRESERVED_KEYS and value.strip():
            result.append(value)
    elif isinstance(value, list):
        for item in value:
            collect_strings(item, key, result)
    elif isinstance(value, dict):
        for child_key, child_value in value.items():
            collect_strings(child_value, child_key, result)
    return result


def normalized_marker(line: str) -> str:
    return re.sub(r"[\s.,]", "", line)


def translate_batch(
    translator: translate.ITranslation,
    items: list[tuple[int, str]],
) -> dict[int, str]:
    chunks: list[str] = []
    for index, source in items:
        chunks.extend(
            [
                f"KINA START {START_PREFIX}{index:0{MARKER_DIGITS}d}.",
                source,
                f"KINA END {END_PREFIX}{index:0{MARKER_DIGITS}d}.",
            ],
        )

    translated = translator.translate("\n".join(chunks))
    lines = translated.splitlines()
    starts: dict[int, int] = {}
    ends: dict[int, int] = {}

    for line_index, line in enumerate(lines):
        marker = normalized_marker(line)
        start_match = re.search(
            rf"{START_PREFIX}(\d{{{MARKER_DIGITS}}})",
            marker,
        )
        end_match = re.search(
            rf"{END_PREFIX}(\d{{{MARKER_DIGITS}}})",
            marker,
        )
        if start_match:
            starts[int(start_match.group(1))] = line_index
        if end_match:
            ends[int(end_match.group(1))] = line_index

    output: dict[int, str] = {}
    for index, source in items:
        start = starts.get(index)
        end = ends.get(index)
        if start is None or end is None or end <= start:
            # Marker recovery is intentionally conservative. A single direct
            # call is slower but prevents one malformed batch from shifting
            # every following field into the wrong page.
            output[index] = translator.translate(source).strip()
            continue
        output[index] = "\n".join(lines[start + 1 : end]).strip()

    return output


def translate_strings(
    translator: translate.ITranslation,
    strings: list[str],
    cache: dict[str, str],
    cache_path: Path,
) -> dict[str, str]:
    unique = list(dict.fromkeys(strings))
    missing = [source for source in unique if source not in cache]

    batches: list[list[tuple[int, str]]] = []
    current: list[tuple[int, str]] = []
    current_chars = 0
    for index, source in enumerate(missing):
        estimated = len(source) + 70
        if current and (len(current) >= 24 or current_chars + estimated > 7_500):
            batches.append(current)
            current = []
            current_chars = 0
        current.append((index, source))
        current_chars += estimated
    if current:
        batches.append(current)

    completed = 0
    for batch in batches:
        translated = translate_batch(translator, batch)
        for index, value in translated.items():
            cache[missing[index]] = value
        cache_path.write_text(
            json.dumps(cache, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        completed += len(batch)
        print(
            f"Translated {completed}/{len(missing)} unique strings",
            flush=True,
        )

    return {source: cache[source] for source in unique}


def apply_translations(
    value: Any,
    translated: dict[str, str],
    key: str = "",
) -> Any:
    if isinstance(value, str):
        if key in PRESERVED_KEYS or not value.strip():
            return value
        return translated[value]
    if isinstance(value, list):
        return [apply_translations(item, translated, key) for item in value]
    if isinstance(value, dict):
        return {
            child_key: apply_translations(child_value, translated, child_key)
            for child_key, child_value in value.items()
        }
    return value


def main() -> None:
    args = parse_args()
    locale = args.locale
    source_path = Path(args.source)
    output_dir = Path(args.output_dir)
    cache_dir = Path(args.cache_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    cache_dir.mkdir(parents=True, exist_ok=True)

    source_payload = json.loads(source_path.read_text(encoding="utf-8"))
    cache_path = cache_dir / f"{locale}.json"
    cache = (
        json.loads(cache_path.read_text(encoding="utf-8"))
        if cache_path.exists()
        else {}
    )

    target_code = TARGET_CODES[locale]
    translator = translate.get_translation_from_codes("en", target_code)
    if translator is None:
        raise RuntimeError(
            f"Argos Translate package en->{target_code} is not installed",
        )

    strings = collect_strings(source_payload["entries"])
    translated = translate_strings(translator, strings, cache, cache_path)
    cache_path.write_text(
        json.dumps(cache, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    localized_entries = apply_translations(
        copy.deepcopy(source_payload["entries"]),
        translated,
    )
    output_path = output_dir / f"{locale}.json"
    output_path.write_text(
        json.dumps(
            {
                "version": 1,
                "sourceLocale": "en",
                "locale": locale,
                "entries": localized_entries,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(localized_entries)} entries to {output_path}", flush=True)


if __name__ == "__main__":
    main()
