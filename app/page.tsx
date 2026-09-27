import Link from "next/link";
import { BrandGrid } from "@/components/BrandGrid";
import { HeroSearch } from "@/components/HeroSearch";
import { Icon } from "@/components/Icon";
import { Photo, type PhotoName } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { Container, SectionHeading } from "@/components/Section";
import { VisitShop } from "@/components/VisitShop";
import { getBrandMaxPrices, getBrands, getModels, getProducts, getRepairServices } from "@/lib/data";
import { startingPrice } from "@/lib/repair";
import { SHOP, formatINR } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";

export const revalidate = 300;

const SERVICES = [
  { href: "/sell", icon: "currency_rupee", label: "Sell Phone" },
  { href: "/buy", icon: "smartphone", label: "Buy Phone" },
  { href: "/repair", icon: "build", label: "Repair Phone" },
  { href: "/repair?service=battery", icon: "battery_charging_full", label: "Battery" },
  { href: "/repair?service=display", icon: "smartphone", label: "Screen" },
  { href: "/track", icon: "local_shipping", label: "Track Order" },
];

const PROMISES = ["Instant cash / UPI", "Free doorstep pickup", "Genuine parts", "Up to 6-month warranty"];

const STEPS = [
  { title: "Check price", body: "Pick your model and answer a few questions. Get an instant, fair quote.", icon: "bolt" },
  { title: "Schedule pickup", body: "Visit our shop near the bus stand or book a free pickup in Cheyyar.", icon: "local_shipping" },
  { title: "Get paid", body: "Quick 5-minute check and you're paid by cash or UPI on the spot.", icon: "payments" },
];

const ACTION_CARDS: { href: string; eyebrow: string; title: string; cta: string; photo: PhotoName }[] = [
  { href: "/sell", eyebrow: "Sell", title: "Get the best price for your old phone", cta: "Sell now", photo: "oneplus" },
  { href: "/repair", eyebrow: "Repair", title: "Screen & battery replaced in 30 minutes", cta: "Book repair", photo: "xiaomi-redmi" },
  { href: "/buy", eyebrow: "Buy", title: "Certified second-hand phones with warranty", cta: "Shop phones", photo: "refurbished-iphones" },
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
  const searchItems = models.map((m) => ({
    href: `/sell/${m.brandSlug}/${m.slug}`,
    label: `${brandName[m.brandSlug] ?? ""} ${m.name}`.trim(),
    maxPrice: Math.max(...m.variants.map((v) => v.basePrice)),
  }));
  const heroModel = models.find((m) => m.slug === "galaxy-s25-ultra") ?? models[0];
  const heroMax = heroModel ? Math.max(...heroModel.variants.map((v) => v.basePrice)) : 0;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline">
        <Container className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center py-8 sm:py-12 lg:py-16">
          <div className="min-w-0 space-y-5">
            <p className="text-label-md text-muted">
              {SHOP.name} · {SHOP.city}
            </p>
            <h1 className="text-[32px] leading-[40px] sm:text-[44px] sm:leading-[52px] font-bold tracking-tight text-on-surface">
              Sell, repair or buy phones.
              <br />
              <span className="text-secondary">The trusted way, in Cheyyar.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Instant price for your old phone, expert repairs with genuine parts, and certified second-hand phones — from {SHOP.owner}&apos;s shop at {SHOP.street}.
            </p>
            <HeroSearch items={searchItems} />
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-on-surface-variant">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Icon name="check" className="text-[16px] text-success" /> {p}
                </li>
              ))}
            </ul>
          </div>

          {heroModel && (
            <Link
              href={`/sell/${heroModel.brandSlug}/${heroModel.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-canvas aspect-[4/3] lg:aspect-square"
              aria-label={`Sell your ${brandName[heroModel.brandSlug]} ${heroModel.name}`}
            >
              <Photo name="samsung-ultra" priority className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6 flex items-center justify-between gap-4 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lift">
                <div>
                  <div className="text-label-sm uppercase tracking-widest text-muted">Trending trade-in</div>
                  <div className="text-label-lg text-on-surface">
                    {brandName[heroModel.brandSlug]} {heroModel.name}
                  </div>
                  <div className="text-body-sm text-on-surface-variant">
                    Get up to <strong className="text-on-surface tnum">{formatINR(heroMax)}</strong>
                  </div>
                </div>
                <span className="grid place-items-center w-10 h-10 rounded-full bg-on-surface text-white transition-transform group-hover:translate-x-0.5">
                  <Icon name="arrow_forward" className="text-[18px]" />
                </span>
              </div>
            </Link>
          )}
        </Container>
      </section>

      {/* Services row */}
      <section className="py-8 sm:py-10">
        <Container>
          <h2 className="text-headline-sm sm:text-headline-md text-on-surface mb-4">Our services</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.label} href={s.href} className="group flex flex-col items-center gap-2 text-center">
                <span className="grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface-container-low border border-hairline text-on-surface transition group-hover:bg-white group-hover:shadow-lift">
                  <Icon name={s.icon} className="text-[26px]" />
                </span>
                <span className="text-label-md text-on-surface">{s.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Action banners */}
      <section className="pb-4">
        <Container className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {ACTION_CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="group flex flex-col overflow-hidden rounded-2xl bg-canvas transition hover:shadow-lift">
              <div className="p-5 pb-3 space-y-1.5">
                <div className="text-label-sm uppercase tracking-widest text-muted">{c.eyebrow}</div>
                <div className="text-headline-sm text-on-surface">{c.title}</div>
                <span className="inline-flex items-center gap-1 pt-1 text-label-lg text-secondary group-hover:gap-2 transition-all">
                  {c.cta} <Icon name="arrow_forward" className="text-[16px]" />
                </span>
              </div>
              <div className="mt-auto overflow-hidden aspect-[16/9]">
                <Photo name={c.photo} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
            </Link>
          ))}
        </Container>
      </section>

      {/* Brands */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading eyebrow="Sell your phone" title="Select your brand" sub="Tap your brand for an instant quote on your used phone." />
            <Link href="/sell" className="mb-6 inline-flex items-center min-h-11 text-label-lg text-on-surface hover:text-secondary">
              View all {models.length} models →
            </Link>
          </div>
          <BrandGrid brands={brands} maxPrices={maxPrices} />
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 lg:py-16 bg-surface-container-low border-y border-hairline">
        <Container>
          <SectionHeading center eyebrow="How it works" title="Sell your phone in 3 simple steps" />
          <ol className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white border border-hairline p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-surface-container text-on-surface">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-display text-[32px] font-bold text-on-surface/10">0{i + 1}</span>
                </div>
                <h3 className="text-headline-sm text-on-surface">{s.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-1">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Deals */}
      {products.length > 0 && (
        <section className="py-12 lg:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <SectionHeading eyebrow="Buy certified" title="Second-hand phones, like new" sub="32-point checked, with bill and shop warranty." />
              <Link href="/buy" className="mb-6 inline-flex items-center min-h-11 text-label-lg text-on-surface hover:text-secondary">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Repairs */}
      <section className="py-12 lg:py-16 bg-surface-container-low border-y border-hairline">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading eyebrow="Repair" title="Expert repairs, genuine parts" sub="Most repairs done while you wait. Free diagnosis." />
            <Link href="/repair" className="mb-6 inline-flex items-center min-h-11 text-label-lg text-on-surface hover:text-secondary">
              Book a repair →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map((s) => {
              const from = startingPrice(s);
              return (
                <Link key={s.key} href={`/repair?service=${s.key}`} className="group flex flex-col gap-3 rounded-xl border border-hairline bg-white p-4 transition hover:shadow-lift hover:border-transparent">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-surface-container text-on-surface">
                    <Icon name={s.icon} />
                  </span>
                  <span className="text-label-lg text-on-surface">{s.name}</span>
                  <span className="mt-auto text-body-sm text-muted tnum">{from ? `From ${formatINR(from)}` : "After diagnosis"}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Trust band */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-center rounded-3xl bg-on-surface text-white p-8 lg:p-12">
            <div className="space-y-2">
              <h2 className="text-[26px] leading-9 sm:text-headline-lg font-bold">Not sure what your phone is worth?</h2>
              <p className="text-body-lg text-white/70 max-w-2xl">Send a photo on WhatsApp and {SHOP.owner} will reply with a price in minutes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waLink("Hi, I want to know the price of my phone.")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-on-surface text-label-lg">
                <Icon name="chat" /> Ask on WhatsApp
              </a>
              <a href={`tel:+91${SHOP.phone}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 text-label-lg">
                <Icon name="call" /> {SHOP.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <VisitShop />
    </>
  );
}
