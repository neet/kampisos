import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kampisos.aynu.io",
      lastModified: new Date(),
    },
    {
      url: "https://kampisos.aynu.io/about",
      lastModified: new Date(),
    },
  ];
}
