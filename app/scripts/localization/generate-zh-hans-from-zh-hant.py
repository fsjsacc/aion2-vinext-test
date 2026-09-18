"""Create the initial Simplified Chinese editorial copy from reviewed zh-Hant."""

from __future__ import annotations

import argparse
import copy
import json
from pathlib import Path
from typing import Any

from opencc import OpenCC


PRESERVED_KEYS = {"id", "byline", "href", "mapSlug", "filterSubtype"}


def convert_value(value: Any, converter: OpenCC, key: str = "") -> Any:
    if isinstance(value, str):
        return value if key in PRESERVED_KEYS else converter.convert(value)
    if isinstance(value, list):
        return [convert_value(item, converter, key) for item in value]
    if isinstance(value, dict):
        return {
            child_key: convert_value(child_value, converter, child_key)
            for child_key, child_value in value.items()
        }
    return value


source_path = Path("tmp/editorial-content-source-zh-hant.json")
output_path = Path("tmp/editorial-locales/zh-hans.json")
source = json.loads(source_path.read_text(encoding="utf-8"))
converter = OpenCC("t2s")
parser = argparse.ArgumentParser()
parser.add_argument(
    "--identity",
    help="Only replace one entry in the existing output file.",
)
args = parser.parse_args()

if args.identity:
    if args.identity not in source["entries"]:
        raise KeyError(f"Missing source entry: {args.identity}")
    output = json.loads(output_path.read_text(encoding="utf-8"))
    output["entries"][args.identity] = convert_value(
        copy.deepcopy(source["entries"][args.identity]),
        converter,
    )
    entries = output["entries"]
else:
    entries = convert_value(copy.deepcopy(source["entries"]), converter)
    output = {
        "version": 1,
        "sourceLocale": "zh-hant",
        "locale": "zh-hans",
        "entries": entries,
    }

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(
    json.dumps(output, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
scope = args.identity or f"{len(entries)} entries"
print(f"Wrote {scope} to {output_path}")
