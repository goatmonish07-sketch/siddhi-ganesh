# Sri Siddhi Ganesh Mobiles: website

A Cashify-style website for **Sri Siddhi Ganesh Mobiles and Service**, 46 Loganadhan Street, Cheyyar (proprietor M Vishal Jain, 96770 48747).

- **Sell old phone** (`/sell`): pick brand → model → storage variant, answer a 6-step condition quiz, get an instant quote, then book a shop visit or free doorstep pickup.
- **Repair** (`/repair`): pick device and issues (display, battery, charging port, camera, water damage, speaker/mic, fingerprint, software, data recovery, motherboard). You see prices for that phone's tier and can book a slot.
- **Buy second-hand** (`/buy`): stock listing with search, brand, budget and grade filters. Each phone has a product page where the customer can reserve it and pay at the shop.
- **Track** (`/track`), **About & Contact**, **Privacy**, **Terms**, plus SEO (LocalBusiness JSON-LD, sitemap, robots).

Every booking gets a request ID (e.g. `SSG-SELL-4K2QZ`). It's saved to the database when one is configured, and the customer gets a prefilled WhatsApp message to 96770 48747. Payment happens at the shop (cash / UPI).

The design follows the Stitch export in `design/stitch/` ("Heritage Emerald Tech": emerald + gold, Plus Jakarta Sans / Inter).

## Tech

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Supabase (Postgres) · Zod · Vitest

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (pricing, WhatsApp messages, validation)
npm run build
```

**The site works without a database.** Brands, models, prices, repair rates and stock come from `lib/catalog.ts`. Bookings still go out over WhatsApp, but they aren't saved and the Track page isn't available until Supabase is connected.

## Connect Supabase (to save bookings and edit prices without code)

1. Create a free project at supabase.com.
2. In **SQL Editor**, run `supabase/migrations/001_init.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY`: server-only. Never expose it in the browser.
4. Restart the app. The catalog now comes from the database (refreshed every 1–5 minutes).

### Day-to-day editing in the Supabase Table Editor
| What | Table |
|---|---|
| Buyback prices | `variants.base_price` (max price for a flawless phone) |
| Condition deductions | `condition_options.pct` (e.g. `-0.03` = −3 %), `multiplier` |
| Repair prices | `repair_services.price_budget / price_mid / price_flagship / price_premium` (empty = "after inspection") |
| Add a phone model | `models` + `variants` (set `tier` for repair pricing) |
| Second-hand stock | `products`. Set `status` to `reserved` / `sold`. Upload photos to the `phones` storage bucket and paste the public URL into `image_url` |
| Customer bookings | `requests`. Update `status`: `new → confirmed → in_progress → ready → completed` / `cancelled` (the customer sees it on /track) |

To change the bundled defaults instead, edit `lib/catalog.ts` and run `npm run seed:generate` to regenerate `supabase/seed.sql`.

## Price engine

`quote = (base + Σ pct × base) × Π multipliers`, rounded **down** to ₹50, minimum ₹300 (`lib/pricing.ts`). All catalog prices are sample starting values. Set real ones before launch.

## Deploy (Vercel)

Import the GitHub repo in Vercel, add the environment variables above plus `NEXT_PUBLIC_SITE_URL` (your domain), and deploy.

## Deploy on Cloudflare Pages

**From GitHub (auto-deploys on every push):** Workers & Pages → your project → Settings → Builds:

| Setting | Value |
|---|---|
| Framework preset | `None` (or "Next.js (Static HTML Export)") |
| Build command | `npm run build:static` |
| Build output directory | `out` |
| Production branch | `claude/upbeat-hawking-t6qmu2` (or `main` once merged) |

Cloudflare sets `CF_PAGES=1`, which also switches the build to static export automatically, and `.node-version` pins Node 22. Don't use the plain "Next.js" preset (next-on-pages): this site is exported as static HTML.

**Direct upload:** run `npm run build:static` and upload the `out/` folder.

In static mode there is no server: bookings get their ID in the browser and go straight to WhatsApp, and the Track page asks customers to check status on WhatsApp. Prices come from `lib/catalog.ts` at build time.

## Images
- Phone photos: `public/phones/<model-slug>.webp` (e.g. `iphone-13.webp`) — shown on sell pages automatically.
- Second-hand stock photos: `public/products/<listing-id>.webp` (e.g. `ssg-101.webp`).
- Banner photos live in `public/images/`.

## Phase 2 ideas
Admin panel at `/admin` (edit prices/stock and manage bookings without Supabase), customer OTP login, Razorpay advance payments, Tamil language, automatic WhatsApp Business notifications, reviews, and exchange offers.
