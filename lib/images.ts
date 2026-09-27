import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

const EXTS = ["webp", "avif", "png", "jpg", "jpeg"];

/**
 * Image slots: drop a photo at public/<folder>/<slug>.<ext> and it is picked up at build time
 * (e.g. public/phones/iphone-13.webp, public/products/ssg-101.jpg). Returns its public URL, or null.
 */
export function localImage(folder: "phones" | "products" | "brands", slug: string): string | null {
  for (const ext of EXTS) {
    const rel = `/${folder}/${slug}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
