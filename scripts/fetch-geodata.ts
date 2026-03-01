/**
 * Natural Earth の admin-1 データから北海道・南樺太・千島列島を含む
 * GeoJSON / TopoJSON を生成するスクリプト
 *
 * 使い方:
 *   npx tsx scripts/fetch-geodata.ts
 *
 * 出力:
 *   public/geodata.geojson
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

// Natural Earth 10m admin-1 (states/provinces) GeoJSON
// https://github.com/nvkelso/natural-earth-vector
// 10m = 1:10,000,000スケール。Webで北海道・サハリンを表示するのに十分な解像度
const NATURAL_EARTH_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson";

// 抽出するフィーチャーの条件（code_hasc フィールドで照合）
const TARGET_HASC_CODES = [
  "JP.HK", // 北海道
  "RU.SL", // サハリン州（南樺太・千島列島を含む）
];

interface GeoJSONFeature {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: unknown;
}

interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

function fetchJson(url: string): Promise<GeoJSONCollection> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetchJson(res.headers.location!).then(resolve).catch(reject);
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("Natural Earth データを取得中...");
  const geojson = await fetchJson(NATURAL_EARTH_URL);

  const filtered: GeoJSONCollection = {
    type: "FeatureCollection",
    features: geojson.features.filter((f) => {
      const code = f.properties["code_hasc"] as string;
      return TARGET_HASC_CODES.includes(code);
    }),
  };

  console.log(
    `抽出されたフィーチャー数: ${filtered.features.length}`,
    filtered.features.map((f) => ({
      name: f.properties["name"],
      adm1_code: f.properties["adm1_code"],
    }))
  );

  const outPath = path.join(
    import.meta.dirname,
    "../public/geodata.geojson"
  );
  fs.writeFileSync(outPath, JSON.stringify(filtered, null, 2), "utf-8");
  console.log(`保存完了: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
