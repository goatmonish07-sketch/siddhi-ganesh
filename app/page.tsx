import Link from "next/link";
import { BrandGrid } from "@/components/BrandGrid";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { QuickQuote } from "@/components/QuickQuote";
import { Container, SectionHeading } from "@/components/Section";
import { VisitShop } from "@/components/VisitShop";
import { getBrandMaxPrices, getBrands, getModels, getProducts, getRepairServices } from "@/lib/data";
import { startingPrice } from "@/lib/repair";
import { SHOP, formatINR } from "@/lib/shop";

export const revalidate = 300;

const ACTIONS = [
  {
    href: "/sell",
    icon: "currency_rupee",
    tag: "Best price guaranteed",
    title: "Sell Old Phone",
    body: "Get an instant fair valuation in 60 seconds. Walk in or book a free doorstep pickup across Cheyyar and get paid by cash or UPI on the spot.",
    points: ["Zero hidden deductions", "Data safe-wipe assistance"],
    cta: "Check value & sell",
  },
  {
    href: "/repair",
    icon: "build",
    tag: "Express 30-min service",
    title: "Repair Mobile",
    body: "Display, battery, charging port, camera, water damage, speaker & mic, fingerprint, software and chip-level repairs with genuine parts.",
    points: ["Genuine tested components", "Up to 6 months warranty"],
    cta: "Book repair now",
  },
  {
    href: "/buy",
    icon: "smartphone",
    tag: "Certified pre-owned",
    title: "Buy Second-Hand",
    body: "Hand-picked used phones inspected through our 32-point check, with bill, charger and shop warranty. Test it in person before you pay.",
    points: ["Up to 6-month shop warranty", "7-day replacement guarantee"],
    cta: "Browse phones",
  },
];

const STEPS = [
  { title: "Check price & condition", body: "Pick your model, storage and answer a few quick questions. Get a guaranteed quote instantly.", foot: "Real-time valuation", icon: "bolt" },
  { title: "Pickup or shop visit", body: `Drop by at ${SHOP.street} (near bus stand) or book a free doorstep pickup within Cheyyar.`, foot: "Flexible time slots", icon: "local_shipping" },
  { title: "Get paid instantly", body: "We verify the phone in 5 minutes and pay you by cash, GPay, PhonePe or bank transfer before you leave.", foot: "Receipt & data wipe", icon: "payments" },
];

export default async function Home() {
  const [brands, maxPrices, models, services, products] = await Promise.all([
    getBrands(),
    getBrandMaxPrices(),
    getModels(),
    getRepairServices(),
    getProducts(),
  ]);
  const brandName = Object.fromEntries(brands.map((b) => [b.slug, b.name]));
  const quickModels = models.map((m) => ({ href: `/sell/${m.brandSlug}/${m.slug}`, label: `${brandName[m.brandSlug] ?? ""} ${m.name}`.trim() }));
  const cheapest = products.length ? Math.min(...products.map((p) => p.price)) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-white py-10">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-fixed/30 rounded-full blur-3xl" />
        <Container className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-secondary-fixed text-label-sm uppercase">
              <Icon name="verified" className="text-[16px]" /> Cheyyar&apos;s doorstep &amp; in-store mobile hub
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/60 text-on-secondary-fixed text-label-sm">
              <Icon name="storefront" className="text-[14px]" /> {SHOP.hours}
            </span>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 items-end mb-8">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-[30px] leading-[38px] sm:text-headline-xl font-extrabold tracking-tight text-primary max-w-4xl">
                Sell Old Phone for Instant Cash, Quick Repairs &amp; Certified Used Mobiles
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-2xl">
                Proprietor <strong className="text-on-surface">{SHOP.owner}</strong> · Serving {SHOP.serviceArea.join(", ")} with transparent pricing, genuine parts &amp; spot UPI payments.
              </p>
            </div>
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon name="verified_user" className="text-primary" />
                  <div>
                    <div className="text-label-md text-primary">Free 32-point diagnosis</div>
                    <div className="text-body-sm text-on-surface-variant">{SHOP.landmark}, {SHOP.city}</div>
                  </div>
                </div>
                <a className="inline-flex items-center min-h-11 px-4 rounded-lg bg-primary text-white text-label-md" href={`tel:+91${SHOP.phone}`}>Call shop</a>
              </div>
              <div className="p-3 bg-surface-container-high rounded-xl flex items-center gap-2">
                <Icon name="electric_bolt" className="text-secondary" />
                <div>
                  <div className="text-label-md text-primary">30-min fast repairs</div>
                  <div className="text-body-sm text-on-surface-variant">Screens &amp; batteries in stock</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:hidden">
            {ACTIONS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex flex-col items-center text-center gap-2 rounded-2xl bg-white p-3 shadow-lift active:scale-[0.98] transition-transform"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary-container/50 text-primary">
                  <Icon name={a.icon} className="text-[26px]" />
                </span>
                <span className="text-label-lg text-primary leading-tight">{a.title}</span>
                <span className="text-label-sm text-secondary leading-tight">{a.href === "/buy" && cheapest ? `From ${formatINR(cheapest)}` : a.tag}</span>
              </Link>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {ACTIONS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-lift hover:shadow-float transition-shadow"
              >
                <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 bg-secondary-fixed/40 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary-container/40 text-primary">
                      <Icon name={a.icon} className="text-[28px]" />
                    </span>
                    <span className="hidden lg:inline-block px-2.5 py-1 rounded-full bg-secondary-fixed text-label-sm text-on-secondary-fixed">
                      {a.href === "/buy" && cheapest ? `From ${formatINR(cheapest)}` : a.tag}
                    </span>
                  </div>
                  <h2 className="text-headline-md text-primary mb-1">{a.title}</h2>
                  <p className="text-body-md text-on-surface-variant mb-3">{a.body}</p>
                  <ul className="space-y-1.5 mb-4 text-body-sm">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Icon name="check_circle" className="text-[16px] text-success" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="relative flex items-center justify-between rounded-lg bg-primary-container px-4 py-3 text-white text-label-lg group-hover:bg-primary">
                  {a.cta} <Icon name="arrow_forward" className="text-[20px] group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="py-12 lg:py-16 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading eyebrow="Instant trade-in valuation" title="Select your phone brand" sub="Tap your brand to get an instant quote for your used phone." />
            <Link href="/sell" className="mb-6 inline-flex items-center min-h-11 text-label-lg text-primary underline underline-offset-4">All {models.length}+ models →</Link>
          </div>
          <BrandGrid brands={brands} maxPrices={maxPrices} />
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 lg:py-16">
        <Container>
          <SectionHeading center eyebrow="Simple · Safe · Fast" title="How selling works in Cheyyar" sub="Skip unreliable classifieds. Sell directly to us with verified spot payout." />
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow-card border border-hairline">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-primary-container text-gold font-display font-extrabold mb-3">{i + 1}</span>
                <h3 className="text-headline-sm text-primary mb-1">{s.title}</h3>
                <p className="text-body-md text-on-surface-variant mb-3">{s.body}</p>
                <div className="flex items-center gap-1 text-label-md text-secondary">
                  <Icon name={s.icon} className="text-[16px]" /> {s.foot}
                </div>
              </div>
            ))}
          </div>
          <QuickQuote models={quickModels} />
        </Container>
      </section>

      {/* Repairs */}
      <section className="py-12 lg:py-16 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading eyebrow="Cheyyar's master tech bench" title="Full-spectrum mobile repair" sub="From screen replacements to chip-level motherboard work." />
            <span className="mb-6 px-3 py-1 rounded-full bg-secondary-fixed text-label-sm text-on-secondary-fixed">Up to 6-month warranty on displays</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((s) => {
              const from = startingPrice(s);
              return (
                <Link key={s.key} href={`/repair?service=${s.key}`} className="group flex flex-col rounded-2xl border border-hairline bg-surface-container-lowest p-4 sm:p-5 shadow-card hover:shadow-lift transition-shadow">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-surface-container text-primary mb-3">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="text-label-lg sm:text-headline-sm text-primary">{s.name}</h3>
                  <div className="text-label-sm uppercase text-secondary mt-0.5">{s.badge}</div>
                  <p className="hidden sm:block text-body-md text-on-surface-variant mt-2">{s.description}</p>
                  <div className="flex flex-wrap items-center justify-between gap-1 mt-auto pt-3 text-label-md sm:text-label-lg">
                    <span className="text-primary tnum">{from ? `From ${formatINR(from)}` : "Price after diagnosis"}</span>
                    <span className="hidden sm:inline text-on-surface-variant group-hover:text-primary">Book →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Deals */}
      {products.length > 0 && (
        <section className="py-12 lg:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <SectionHeading eyebrow="Certified & store inspected" title="Today's second-hand deals" sub="Every handset passes our 32-point inspection and comes with a shop warranty." />
              <Link href="/buy" className="mb-6 inline-flex items-center min-h-11 text-label-lg text-primary underline underline-offset-4">View all phones →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <VisitShop />
    </>
  );
}
