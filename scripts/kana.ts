import fs from "fs/promises";
import path from "path";
import { default as ainu } from "ainu-utils";

const MUSTACHE = /\{(.+?)\}/g;
const SYMBOL = /\$([0-9]+)/g;

function safeConvertToKana(text: string) {
  const counter = 0;
  const registry = new Map<string, string>();

  let safeText = text.replace(MUSTACHE, (match) => {
    const key = `$${counter}`;
    registry.set(key, match);
    return key;
  });
  safeText = safeText.replace(/’/g, "'");

  const kana = ainu.to_kana(safeText);

  return kana.replace(SYMBOL, (match, p1) => {
    return registry.get(`$${p1}`) || match;
  });
}

function convert(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]): [string, unknown] => {
      if (typeof value === "string") {
        return [key, safeConvertToKana(value)];
      }
      return [key, convert(value as Record<string, unknown>)];
    }),
  );
}

const files = [
  {
    source: path.join(import.meta.dirname, "../messages/ain-Latn.json"),
    target: path.join(import.meta.dirname, "../messages/ain-Kana.json"),
  },
];

async function main() {
  for (const file of files) {
    const source = await fs.readFile(file.source, "utf-8");

    if (path.extname(file.source) === ".json") {
      const sourceJson = JSON.parse(source);
      const content = convert(sourceJson);
      const contentJSON = JSON.stringify(content, null, 2) + "\n";
      await fs.writeFile(file.target, contentJSON);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
