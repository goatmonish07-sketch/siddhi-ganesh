# Design System — Sri Siddhi Ganesh Mobiles (MASTER)

Source of truth for all pages. Page files in `design-system/pages/` override this only where they say so.
Visual origin: Stitch export "Heritage Emerald Tech" (`design/stitch/`). Tokens live in `app/globals.css` (`@theme`).

## 1. Pattern
**Trust & Authority + Conversion-Optimized.** A local shop competing with Cashify must prove *credibility* (real address, owner name, warranties, genuine parts) and make the three money actions (Sell · Repair · Buy) one tap away on every screen.
- Mobile: bottom tab bar (Home · Sell · Repair · Buy · WhatsApp) + sticky price/Book bar inside the Sell and Repair flows.
- Desktop: top nav + sticky summary sidebar in flows.

## 2. Style
**Premium minimal, Cashify-inspired (v2).** White canvas, light-grey (#F5F5F7) photo backdrops, hairline borders, near-black type and a *single* emerald accent for primary buttons and selected states. Real product photography (`public/images/`, `components/Photo.tsx`) and monochrome brand logos (`components/BrandLogo.tsx`). No mint tints, yellow chips, gradients or decorative blobs. Gold appears only in the logo and the Grade Superb badge.

## 3. Colours (all text pairs verified ≥ 4.5:1)
| Role | Token | Hex | On |
|---|---|---|---|
| Brand / primary CTA | `primary-container` | #163A24 | white text 12.6:1 |
| Deepest green (hover) | `primary` | #002410 | |
| Canvas | `surface` | #FFFFFF | alt sections `surface-container-low` #F7F7F8 |
| Card | `surface-container-lowest` | #FFFFFF | border `hairline` #E5DFD5 |
| Body text / headings | `on-surface` (= `primary`) | #111827 | |
| Photo backdrop | `canvas` | #F5F5F7 | |
| Secondary text | `on-surface-variant` | #4B5563 | 7.6:1 on white |
| Muted / struck MRP | `muted` | #6B7280 | 4.8:1 on white |
| Accent text / links | `secondary` | #1F5135 | 9.6:1 |
| Gold on dark | `gold` | #D4AF37 | 6.0:1 on brand green |
| Gold icons on light | `gold-ink` | #8A6D00 | 4.9:1 |
| Light text on dark green | `primary-fixed-dim` | #A8D0B1 | 7.4:1 |
| Positive (bonus, ticks) | `success` | #0F7A3D | ≥ 5:1 on white & #F1F6F3 |
| Negative (deductions, errors) | `error` | #BA1A1A | 6.5:1 |
| WhatsApp | `whatsapp` | #25D366 | **dark text** `on-surface` (white fails at 2.0:1) |

## 4. Typography
Plus Jakarta Sans (headings 600–800) + Inter (body 400, labels 600), self-hosted via `next/font`.
Scale: 11 (label-sm, minimum) · 12 · 14 · 16 · 18 · 22 · 32 · 40. Headlines: 30px mobile / 40px desktop for h1, 24/32 for h2.
Form inputs are **16px on mobile** (prevents iOS zoom), 14px from `sm`. Prices always `tnum`.

## 5. Effects
- Radius: 8px inputs/buttons, 12px tiles, 16px cards, full for chips.
- Shadows: `shadow-card` (rest) → `shadow-lift` (hover/summary) → `shadow-float` (fixed bars, FAB).
- Motion: 150–200ms `ease-out` on colour/shadow/transform only; `prefers-reduced-motion` disables all.
- Focus: 2px `primary-container` ring + 2px offset on every interactive element (`:focus-visible`).

## 6. Layout
Breakpoints: 375 base · 640 `sm` · 768 `md` · 1024 `lg` · 1280 `xl`. Max content width 1280 (`max-w-7xl`), gutters 16px mobile → 32px `lg`.
Touch targets ≥ 44px; 8px min gap. Spacing on a 4/8 rhythm; sections `py-12` mobile, `py-16` desktop.
Fixed elements: mobile tab bar 64px + safe-area inset; body reserves that space. Anchor targets use `scroll-mt-28`.

## 7. Anti-patterns (don't)
- Emoji or icon fonts for icons (use `components/Icon.tsx` → Lucide SVG).
- White text on WhatsApp green; bright green (#00B352) text on light backgrounds.
- Fake ratings/review counts or stock photos of people presented as the shop.
- Hover-only affordances; placeholder-only labels; text under 11px.
- Flashy gradients / purple AI palettes — this is a trusted local repair shop.

## Pre-delivery checklist
- [ ] SVG icons only, one family (Lucide), stroke 1.75
- [ ] Contrast pairs from the table above only
- [ ] Touch targets ≥ 44px, cursor-pointer on clickables
- [ ] Visible focus rings; skip link; labels on all inputs
- [ ] No horizontal scroll at 375 / 768 / 1024 / 1440
- [ ] Fixed bars never cover content (body padding / scroll-margin)
- [ ] Reduced motion respected

## Images
- Banner photos: `public/images/<name>.webp` (+ `-640` variant), rendered by `<Photo name=…>` with srcset. Source: Stitch exports.
- Phone model photos: drop `public/phones/<model-slug>.webp`; listing photos: `public/products/<id>.webp`. Picked up automatically at build (`lib/images.ts`); otherwise `PhoneArt` renders a device.
- Never use a stock/banner photo as the photo of a specific second-hand listing.
