import type { Metadata } from "next";
import { BrandGrid } from "@/components/BrandGrid";
import { ModelList } from "@/components/ModelList";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Container, SectionHeading } from "@/components/Section";
import { getBrandMaxPrices, getBrands, getModels } from "@/lib/data";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Sell Old Phone for Instant Cash",
  description: "Get an instant price for your old mobile in Cheyyar. Free doorstep pickup or shop visit, paid by cash or UPI on the spot.",
};

export default async function SellPage() {
  const [brands, maxPrices, models] = await Promise.all([getBrands(), getBrandMaxPrices(), getModels()]);
  const brandName = Object.fromEntries(brands.map((b) => [b.slug, b.name]));
  const links = models.map((m) => ({
    href: `/sell/${m.brandSlug}/${m.slug}`,
    name: m.name,
    brand: brandName[m.brandSlug] ?? m.brandSlug,
    year: m.year,
    brandSlug: m.brandSlug,
    imageUrl: m.imageUrl,
    maxPrice: Math.max(...m.variants.map((v) => v.basePrice)),
  }));
  return (
    <Container className="py-8 lg:py-10 space-y-12">
      <div className="relative overflow-hidden rounded-3xl bg-canvas">
        <Photo name="realme-vivo" priority className="absolute inset-0 h-full w-full object-cover object-[50%_65%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />
        <div className="relative max-w-lg p-6 sm:p-10 space-y-3">
          <p className="text-label-md text-muted">Sell old phone</p>
          <h1 className="text-[28px] leading-9 sm:text-[40px] sm:leading-[48px] font-bold tracking-tight text-on-surface">Get the best price for your phone, today</h1>
          <ul className="space-y-1.5 text-body-md text-on-surface-variant">
            {["Instant quote in 60 seconds", "Free pickup or walk in", "Paid by cash / UPI on the spot"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Icon name="check" className="text-[16px] text-success" /> {t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <SectionHeading eyebrow="Step 1" title="Which brand is your phone?" sub="Pick your brand to see models, or search directly below." />
        <BrandGrid brands={brands} maxPrices={maxPrices} />
      </div>
      <div>
        <SectionHeading eyebrow="Or search" title="Find your model" />
        <ModelList models={links} />
      </div>
    </Container>
  );
}
