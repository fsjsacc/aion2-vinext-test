// AION2-KINA 运行时验证脚本
// 逐路径真实下载并记录 状态码 / Content-Type / 实际字节数
// 避免 Git Bash curl -w "%{size_download}" -o /dev/null 恒为 0 的陷阱
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3099";
const VK = process.argv[3] ?? "";
const OUT = process.argv[4] ?? "verify_out";

const paths = [
  // 页面
  ["/en/", "html"],
  ["/zh-hans/", "html"],
  ["/en/tools/map/", "html"],
  ["/health", "text"],
  // sprite（标记图标的核心依赖）
  ["/sprites/aion2.json", "sprite-json"],
  ["/sprites/aion2.png", "sprite-png"],
  ["/sprites/maps/verteron.json", "map-sprite-json"],
  // 地图数据
  ["/data/aion2-map-data.json", "map-data"],
  ["/data/aion2-map-i18n.json", "map-i18n"],
  // map-runtime
  ["/map-runtime/manifest.json", "manifest"],
];

const versioned = VK
  ? [
      [`/map-runtime/releases/${VK}/icons/creature_creatureFeral.webp`, "icon"],
      [`/map-runtime/releases/${VK}/maps/tiles/verteron/0/0/0.webp`, "tile"],
      [`/map-runtime/releases/${VK}/sprites/aion2.json`, "ver-sprite"],
      [`/map-runtime/releases/${VK}/data/aion2-map-data.json`, "ver-data"],
    ]
  : [];

const all = [...paths, ...versioned];

mkdirSync(OUT, { recursive: true });

let ok = 0, fail = 0;
const rows = [];

for (const [p, label] of all) {
  const url = BASE + p;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const buf = Buffer.from(await res.arrayBuffer());
    const safe = p.replace(/[/]/g, "_").replace(/^_/, "");
    writeFileSync(join(OUT, safe), buf);

    const status = res.status;
    const ct = res.headers.get("content-type") ?? "-";
    const marker = status === 200 && buf.length > 0 ? "OK  " : "FAIL";
    if (marker === "OK  ") ok++; else fail++;

    rows.push(`${marker} ${String(status).padEnd(3)} ${String(buf.length).padStart(9)}  ${label.padEnd(16)} ${ct.split(";")[0].padEnd(24)} ${p}`);
  } catch (err) {
    fail++;
    rows.push(`ERR  --- ${String(0).padStart(9)}  ${label.padEnd(16)} ${"-".padEnd(24)} ${p}  (${err.message})`);
  }
}

console.log("\n结果 | 状态 |     字节数 | 用途             | Content-Type             | 路径");
console.log("-".repeat(140));
for (const r of rows) console.log(r);
console.log("-".repeat(140));
console.log(`通过 ${ok} / 失败 ${fail} / 合计 ${all.length}`);
