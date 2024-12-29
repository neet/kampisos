import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ];
}
