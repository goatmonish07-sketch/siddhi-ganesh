import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GradeBadge } from "@/components/Grade";
import { Icon } from "@/components/Icon";
import { ProductCard, ProductImage, discountPct } from "@/components/ProductCard";
import { ReserveForm } from "@/components/ReserveForm";
import { Container } from "@/components/Section";
import { GRADE_INFO } from "@/lib/catalog";
import { getProduct, getProducts } from "@/lib/data";
import { formatINR, siteUrl } from "@/lib/shop";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).id);
  if (!p) return { title: "Phone not found" };
  return {
    title: `Buy used ${p.name} ${p.variant} – ${formatINR(p.price)}`,
    description: `${GRADE_INFO[p.grade].label} ${p.name} (${p.variant}, ${p.color}) with ${p.batteryHealth}% battery health and ${p.warrantyMonths}-month warranty in Cheyyar.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();
  const off = discountPct(p);
  const similar = (await getProducts()).filter((x) => x.id !== p.id && (x.brandSlug === p.brandSlug || Math.abs(x.price - p.price) < 8000)).slice(0, 4);
  const sold = p.status !== "available";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} ${p.variant}`,
    itemCondition: "https://schema.org/RefurbishedCondition",
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "INR",
      availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStoreOnly",
      url: `${siteUrl}/buy/${p.id}`,
    },
  };

  return (
    <Container className="py-8 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-body-sm text-on-surface-variant">
        <Link href="/buy" className="underline">Buy phones</Link> / {p.name}
      </nav>
      <div className="grid lg:grid-cols-[1fr_1fr_360px] gap-6 items-start">
        <div className="relative">
          <ProductImage product={p} className="h-80 lg:h-[420px]" />
          <div className="absolute top-3 left-3"><GradeBadge grade={p.grade} /></div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-body-sm text-on-surface-variant">{p.variant} · {p.color}</div>
            <h1 className="text-headline-lg text-[28px] sm:text-[32px] font-bold text-primary">{p.name}</h1>
          </div>
          <div className="flex items-baseline gap-3 tnum">
            <span className="font-display text-[36px] font-extrabold text-primary">{formatINR(p.price)}</span>
            <span className="text-body-md text-outline line-through">{formatINR(p.mrp)}</span>
            {off > 0 && <span className="px-2 py-0.5 rounded bg-secondary-container text-label-md text-on-secondary-fixed">{off}% off</span>}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white border border-hairline p-3">
              <Icon name="battery_full" className="text-primary" />
              <div className="text-label-lg text-primary tnum">{p.batteryHealth}%</div>
              <div className="text-body-sm text-on-surface-variant">Battery</div>
            </div>
            <div className="rounded-xl bg-white border border-hairline p-3">
              <Icon name="shield" className="text-primary" />
              <div className="text-label-lg text-primary">{p.warrantyMonths} months</div>
              <div className="text-body-sm text-on-surface-variant">Warranty</div>
            </div>
            <div className="rounded-xl bg-white border border-hairline p-3">
              <Icon name="fact_check" className="text-primary" />
              <div className="text-label-lg text-primary">32-point</div>
              <div className="text-body-sm text-on-surface-variant">Checked</div>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">{p.description}</p>
          <div>
            <h2 className="text-label-lg text-primary mb-1">Highlights</h2>
            <ul className="flex flex-wrap gap-2">
              {p.highlights.map((h) => <li key={h} className="px-2 py-1 rounded bg-surface-container text-label-md text-primary">{h}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-label-lg text-primary mb-1">In the box</h2>
            <p className="text-body-md text-on-surface-variant">{p.inBox.join(" · ")}</p>
          </div>
          <div className="rounded-xl bg-surface-container p-3 text-body-sm text-primary">
            <strong>{GRADE_INFO[p.grade].label}:</strong> {GRADE_INFO[p.grade].points.join(" · ")}
          </div>
        </div>
        <aside className="rounded-2xl bg-white border border-hairline p-5 shadow-lift lg:sticky lg:top-32">
          {sold ? (
            <div className="text-center space-y-2">
              <Icon name="event_busy" className="text-[36px] text-on-surface-variant" />
              <div className="text-headline-sm text-primary">{p.status === "reserved" ? "Reserved by another customer" : "Sold"}</div>
              <Link href="/buy" className="inline-block underline text-primary">See other phones</Link>
            </div>
          ) : (
            <>
              <div className="text-headline-sm text-primary mb-3">Reserve this phone</div>
              <ReserveForm product={p} />
            </>
          )}
        </aside>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="text-headline-md text-primary mb-4">Similar phones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((s) => <ProductCard key={s.id} product={s} />)}
          </div>
        </section>
      )}
    </Container>
  );
}
