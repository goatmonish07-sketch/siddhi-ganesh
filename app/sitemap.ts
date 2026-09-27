import type { MetadataRoute } from "next";
import { getBrands, getModels, getProducts } from "@/lib/data";
import { siteUrl } from "@/lib/shop";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, models, products] = await Promise.all([getBrands(), getModels(), getProducts()]);
  const pages = ["", "/sell", "/repair", "/buy", "/track", "/about", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...brands.map((b) => ({ url: `${siteUrl}/sell/${b.slug}`, priority: 0.6 })),
    ...models.map((m) => ({ url: `${siteUrl}/sell/${m.brandSlug}/${m.slug}`, priority: 0.5 })),
    ...products.map((p) => ({ url: `${siteUrl}/buy/${p.id}`, priority: 0.6 })),
  ];
}
