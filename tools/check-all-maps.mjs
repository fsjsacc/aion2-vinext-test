// 全地图 sprite 覆盖率校验
// 对每张地图，检查其全部 marker 的 iconUrl 是否都能在对应 atlas 中找到
import { readFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://127.0.0.1:3099";

const mapData = JSON.parse(readFileSync("verify_out_local/data_aion2-map-data.json", "utf8"));
const globals = JSON.parse(readFileSync("verify_out_local/sprites_aion2.json", "utf8"));
const globalIds = new Set(Object.keys(globals));

function spriteId(url) {
  const filename = url.split("/").pop()?.split("?")[0] ?? "";
  const ext = filename.lastIndexOf(".");
  return ext > 0 ? filename.slice(0, ext) : filename || "__fallback";
}

console.log("地图".padEnd(24) + "标记数".padStart(8) + "atlas".padStart(8) + "命中".padStart(8) + "缺失".padStart(8) + "  状态");
console.log("-".repeat(78));

let totMarkers = 0, totMiss = 0, allOk = true;

for (const m of mapData.maps ?? []) {
  const markers = mapData.markersByMap?.[m.name] ?? [];
  if (!markers.length) {
    console.log(m.slug.padEnd(24) + String(0).padStart(8) + "-".padStart(8) + "-".padStart(8) + "-".padStart(8) + "  (无标记，跳过)");
    continue;
  }

  // 拉取该地图的 atlas
  let ids;
  try {
    const res = await fetch(`${BASE}/sprites/maps/${m.slug}.json`, { signal: AbortSignal.timeout(60000) });
    if (!res.ok) throw new Error(`atlas HTTP ${res.status}`);
    ids = new Set(Object.keys(await res.json()));
  } catch (err) {
    console.log(m.slug.padEnd(24) + String(markers.length).padStart(8) + "-".padStart(8) + "-".padStart(8) + "-".padStart(8) + `  ❌ atlas 加载失败: ${err.message}`);
    allOk = false;
    continue;
  }

  let hit = 0, miss = 0;
  for (const mk of markers) {
    const url = mk.iconUrl || mk.darkIconUrl || "";
    if (!url) continue;
    const id = spriteId(url);
    if (ids.has(id) || globalIds.has(id)) hit++; else miss++;
  }

  totMarkers += markers.length;
  totMiss += miss;
  if (miss > 0) allOk = false;

  const status = miss === 0 ? "✅ 全覆盖" : `❌ 缺 ${miss}`;
  console.log(
    m.slug.padEnd(24) +
    String(markers.length).padStart(8) +
    String(ids.size).padStart(8) +
    String(hit).padStart(8) +
    String(miss).padStart(8) +
    "  " + status
  );
}

console.log("-".repeat(78));
console.log(`合计标记 ${totMarkers}，缺失 ${totMiss} → ${allOk ? "✅ 全部图标可解析" : "❌ 存在缺失"}`);
