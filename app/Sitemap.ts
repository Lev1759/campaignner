import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://campaignner.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/candidates`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/candidate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/candidate/register`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}