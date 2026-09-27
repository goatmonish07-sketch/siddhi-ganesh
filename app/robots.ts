import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { siteUrl } from "@/lib/shop";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
