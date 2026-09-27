# Design System — Sri Siddhi Ganesh Mobiles (MASTER)

Source of truth for all pages. Page files in `design-system/pages/` override this only where they say so.
Visual origin: Stitch export "Heritage Emerald Tech" (`design/stitch/`). Tokens live in `app/globals.css` (`@theme`).

## 1. Pattern
**Trust & Authority + Conversion-Optimized.** A local shop competing with Cashify must prove *credibility* (real address, owner name, warranties, genuine parts) and make the three money actions (Sell · Repair · Buy) one tap away on every screen.
- Mobile: bottom tab bar (Home · Sell · Repair · Buy · WhatsApp) + sticky price/Book bar inside the Sell and Repair flows.
- Desktop: top nav + sticky summary sidebar in flows.

## 2. Style
**Warm Modernism / Soft UI.** White cards on a mint canvas, hairline borders, low olive-tinted shadows, 16px card radius, pill chips. No glassmorphism, no neon, no gradients except the dark-green hero bands.

## 3. Colours (all text pairs verified ≥ 4.5:1)
| Role | Token | Hex | On |
|---|---|---|---|
| Brand / primary CTA | `primary-container` | #163A24 | white text 12.6:1 |
| Deepest green (hover) | `primary` | #002410 | |
| Canvas | `surface` | #E9FEF1 | |
| Card | `surface-container-lowest` | #FFFFFF | border `hairline` #E5DFD5 |
| Body text | `on-surface` | #0D1F17 | |
| Secondary text | `on-surface-variant` | #424842 | 9.4:1 on white |
| Muted / struck MRP | `muted` | #5C635C | ≥ 5.9:1 on white |
| Eyebrow / accent text | `secondary` | #775A00 | 6.5:1 |
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
