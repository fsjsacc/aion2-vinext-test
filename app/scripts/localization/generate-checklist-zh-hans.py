"""Convert the reviewed Traditional Chinese checklist copy to Simplified."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

from opencc import OpenCC


SIMPLIFIED_EDITORIAL_REPLACEMENTS = {
    "自订": "自定义",
    "伺服器": "服务器",
    "目前": "当前",
    "储存": "存储",
    "介面": "界面",
    "资讯": "信息",
}


def normalize_simplified(value: str) -> str:
    for source, replacement in SIMPLIFIED_EDITORIAL_REPLACEMENTS.items():
        value = value.replace(source, replacement)
    return value


def convert_value(value: Any, converter: OpenCC) -> Any:
    if isinstance(value, str):
        return normalize_simplified(converter.convert(value))
    if isinstance(value, list):
        return [convert_value(item, converter) for item in value]
    if isinstance(value, dict):
        return {
            child_key: convert_value(child_value, converter)
            for child_key, child_value in value.items()
        }
    return value


source_path = Path("tmp/checklist-source-zh-hant.json")
output_path = Path("tmp/checklist-locales/zh-hans.json")
source = json.loads(source_path.read_text(encoding="utf-8"))
converter = OpenCC("t2s")
entries = convert_value(copy.deepcopy(source["entries"]), converter)

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(
    json.dumps(
        {
            "version": 1,
            "sourceLocale": "zh-hant",
            "locale": "zh-hans",
            "entries": entries,
        },
        ensure_ascii=False,
        indent=2,
    )
    + "\n",
    encoding="utf-8",
)
print(f"Wrote Simplified Chinese checklist copy to {output_path}")
