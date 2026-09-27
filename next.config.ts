import type { NextConfig } from "next";

// STATIC_EXPORT=1 (npm run build:static) produces a plain HTML site in out/
// for static hosts such as Cloudflare Pages. Bookings then go straight to
// WhatsApp, since there is no server to save them.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : undefined,
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "" },
  images: {
    unoptimized: isStatic,
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
