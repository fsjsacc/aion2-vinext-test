"""Convert the complete reviewed Traditional Chinese home UI to Simplified."""

from __future__ import annotations

import json
from pathlib import Path

from opencc import OpenCC

source = json.loads(
    Path("tmp/home-copy-source-zh-hant.json").read_text(encoding="utf-8"),
)
converter = OpenCC("t2s")
content = {
    key: converter.convert(value)
    for key, value in source["entries"]["home"]["content"].items()
}
output_path = Path("tmp/home-locales/zh-hans.json")
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(
    json.dumps(
        {
            "version": 1,
            "sourceLocale": "zh-hant",
            "locale": "zh-hans",
            "entries": {
                "home": {
                    "content": content,
                    "heroImage": None,
                    "primaryAction": None,
                    "sourceLabels": {},
                },
            },
        },
        ensure_ascii=False,
        indent=2,
    )
    + "\n",
    encoding="utf-8",
)
print(f"Wrote {len(content)} strings to {output_path}")
