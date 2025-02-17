import fs from "fs/promises";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ainuWordFile = await fs.readFile("public/words_ain.tsv", "utf-8");
  const ainuWordList = ainuWordFile
    .split("\n")
    .map((line) => line.split("\t")[0]);

  const japaneseWordFile = await fs.readFile("public/words_jpn.tsv", "utf-8");
  const japaneseWordList = japaneseWordFile
    .split("\n")
    .map((line) => line.split("\t")[0]);

  return [
    {
      url: "https://kampisos.aynu.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://kampisos.aynu.io/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },

    ...ainuWordList.map((word) => {
      return {
        url: `https://kampisos.aynu.io/search?q=${encodeURIComponent(word)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
      };
    }),

    ...japaneseWordList.map((word) => {
      return {
        url: `https://kampisos.aynu.io/search?q=${encodeURIComponent(word)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
      };
    }),
  ];
}
