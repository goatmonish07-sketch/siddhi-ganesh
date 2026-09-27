import type { NextConfig } from "next";

// Static export (plain HTML in out/) for static hosts such as Cloudflare Pages.
// On by default when Cloudflare Pages builds the repo (CF_PAGES=1), or with STATIC_EXPORT=1.
// Without a server, bookings go straight to WhatsApp and are not saved.
const isStatic = process.env.STATIC_EXPORT === "1" || process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : undefined,
  // Server-only files (the bookings API) use the .server.ts extension and are left out of static builds.
  pageExtensions: isStatic ? ["tsx", "ts"] : ["server.ts", "tsx", "ts"],
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "" },
  images: {
    unoptimized: isStatic,
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
