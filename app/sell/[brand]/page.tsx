import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelList } from "@/components/ModelList";
import { Container, SectionHeading } from "@/components/Section";
import { getBrands, getModelsForBrand } from "@/lib/data";

export const revalidate = 300;

type Props = { params: Promise<{ brand: string }> };

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const b = (await getBrands()).find((x) => x.slug === brand);
  return { title: b ? `Sell Old ${b.name} Phone` : "Sell Old Phone" };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  const b = (await getBrands()).find((x) => x.slug === brand);
  if (!b) notFound();
  const models = await getModelsForBrand(brand);
  return (
    <Container className="py-10">
      <nav className="text-body-sm text-on-surface-variant mb-4">
        <Link href="/sell" className="inline-flex items-center min-h-11 underline underline-offset-2">Sell phone</Link> / {b.name}
      </nav>
      <SectionHeading eyebrow="Sell old phone · Step 2" title={`Select your ${b.name} model`} sub={`${models.length} models available for instant quote.`} />
      <ModelList
        placeholder={`Search ${b.name} models…`}
        models={models.map((m) => ({
          href: `/sell/${m.brandSlug}/${m.slug}`,
          name: m.name,
          brand: b.name,
          year: m.year,
          maxPrice: Math.max(...m.variants.map((v) => v.basePrice)),
        }))}
      />
    </Container>
  );
}
