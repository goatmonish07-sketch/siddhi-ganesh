import type { Metadata } from "next";
import { BrandGrid } from "@/components/BrandGrid";
import { ModelList } from "@/components/ModelList";
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
    maxPrice: Math.max(...m.variants.map((v) => v.basePrice)),
  }));
  return (
    <Container className="py-10 space-y-12">
      <div>
        <SectionHeading eyebrow="Sell old phone · Step 1" title="Which brand is your phone?" sub="Pick your brand to see models, or search directly below." />
        <BrandGrid brands={brands} maxPrices={maxPrices} />
      </div>
      <div>
        <SectionHeading eyebrow="Or search" title="Find your model" />
        <ModelList models={links} />
      </div>
    </Container>
  );
}
