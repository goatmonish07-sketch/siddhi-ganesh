import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { ModelList } from "@/components/ModelList";
import { BRAND_PHOTO, Photo } from "@/components/Photo";
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
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-canvas">
        {BRAND_PHOTO[b.slug] && <Photo name={BRAND_PHOTO[b.slug]!} priority className="absolute inset-0 h-full w-full object-cover object-[50%_60%]" />}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative p-6 sm:p-10 space-y-3 max-w-md">
          <BrandLogo slug={b.slug} name={b.name} className="h-9 text-on-surface" />
          <h1 className="text-[26px] leading-9 sm:text-[36px] sm:leading-[44px] font-bold tracking-tight text-on-surface">Sell your {b.name} phone</h1>
          <p className="text-body-md text-on-surface-variant">{models.length} models · instant quote · paid on the spot</p>
        </div>
      </div>
      <SectionHeading eyebrow="Step 2" title={`Select your ${b.name} model`} />
      <ModelList
        placeholder={`Search ${b.name} models…`}
        models={models.map((m) => ({
          href: `/sell/${m.brandSlug}/${m.slug}`,
          name: m.name,
          brand: b.name,
          year: m.year,
          brandSlug: m.brandSlug,
          imageUrl: m.imageUrl,
          maxPrice: Math.max(...m.variants.map((v) => v.basePrice)),
        }))}
      />
    </Container>
  );
}
