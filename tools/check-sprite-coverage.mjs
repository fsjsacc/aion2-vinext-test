// 校验地图数据里的 marker iconUrl 是否都能在 sprite atlas 中找到
// 这是「图标显示为空」的直接判定：atlas 里没有对应 id → MapLibre 渲染空白
import { readFileSync } from "node:fs";

const mapData = JSON.parse(readFileSync("verify_out_local/data_aion2-map-data.json", "utf8"));
const atlas = JSON.parse(readFileSync("verify_out_local/sprites_maps_verteron.json", "utf8"));
const globalAtlas = JSON.parse(readFileSync("verify_out_local/sprites_aion2.json", "utf8"));

const ids = new Set(Object.keys(atlas));
const globalIds = new Set(Object.keys(globalAtlas));

console.log(`verteron atlas 图标数: ${ids.size}`);
console.log(`aion2 全局 atlas 图标数: ${globalIds.size}`);

function spriteId(url) {
  const filename = url.split("/").pop()?.split("?")[0] ?? "";
  const ext = filename.lastIndexOf(".");
  return ext > 0 ? filename.slice(0, ext) : filename || "__fallback";
}

// 找到 verteron 地图
const maps = mapData.maps ?? [];
const target = maps.find((m) => m.slug === "verteron");
if (!target) {
  console.log("未找到 verteron 地图。可用 slug:", maps.map((m) => m.slug).join(", "));
  process.exit(1);
}

console.log(`\nverteron.markerCount（声明值）= ${target.markerCount}`);
console.log(`verteron.name = ${target.name}   （markersByMap 用 name 作键，不是 id）`);
console.log(`verteron.tileTemplate = ${target.tileTemplate}`);

const markers = mapData.markersByMap?.[target.name] ?? [];
console.log(`markersByMap["${target.name}"] 实际条数 = ${markers.length}`);
if (markers.length) {
  console.log(`marker 样例: ${JSON.stringify(markers.slice(0, 2)).slice(0, 400)}`);
}

let hit = 0, miss = 0, noIcon = 0;
const missing = new Map();

for (const mk of markers) {
  const url = mk.iconUrl || mk.darkIconUrl || "";
  if (!url) { noIcon++; continue; }
  const id = spriteId(url);
  if (ids.has(id) || globalIds.has(id)) hit++;
  else {
    miss++;
    missing.set(id, (missing.get(id) ?? 0) + 1);
  }
}

console.log(`\n命中 atlas : ${hit}`);
console.log(`缺失      : ${miss}`);
console.log(`无 iconUrl: ${noIcon}`);

if (missing.size) {
  console.log(`\n缺失的 icon id（前 25 个）:`);
  [...missing.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)
    .forEach(([id, n]) => console.log(`  ${String(n).padStart(5)}x  ${id}`));
}

// atlas 元数据
console.log(`\natlas 字段: ${Object.keys(atlas).slice(0, 8).join(", ")}`);
const sample = Object.entries(atlas)[0];
console.log(`样例条目: ${sample[0]} = ${JSON.stringify(sample[1])}`);
