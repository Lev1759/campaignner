import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://campaignner.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    // { url: `${base}/candidates`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/candidate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/candidate/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}