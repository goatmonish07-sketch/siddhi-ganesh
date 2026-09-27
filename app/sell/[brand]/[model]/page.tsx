import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Container } from "@/components/Section";
import { SellQuote } from "@/components/SellQuote";
import { getBrands, getConditionQuestions, getModel } from "@/lib/data";
import { formatINR } from "@/lib/shop";

export const revalidate = 300;

type Props = { params: Promise<{ brand: string; model: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, model } = await params;
  const m = await getModel(brand, model);
  if (!m) return { title: "Sell Old Phone" };
  const max = Math.max(...m.variants.map((v) => v.basePrice));
  return {
    title: `Sell ${m.name} – Get up to ${formatINR(max)}`,
    description: `Instant price for your used ${m.name} in Cheyyar. Answer a few questions and get paid by cash or UPI.`,
  };
}

const WHY = [
  { icon: "payments", title: "Instant UPI & spot cash", body: "GPay, PhonePe, Paytm or bank transfer within minutes of a quick check." },
  { icon: "delete_sweep", title: "Certified data wipe", body: "We factory-reset and wipe storage in front of you. Your photos and chats stay private." },
  { icon: "storefront", title: "Local Cheyyar integrity", body: "A real shop at 46 Loganadhan Street — walk in any time to talk to us." },
];

export default async function SellModelPage({ params }: Props) {
  const { brand, model } = await params;
  const [m, brands, questions] = await Promise.all([getModel(brand, model), getBrands(), getConditionQuestions()]);
  if (!m) notFound();
  const brandName = brands.find((b) => b.slug === brand)?.name ?? brand;

  return (
    <>
      <Container className="py-8">
        <nav className="text-body-sm text-on-surface-variant mb-4">
          <Link href="/sell" className="inline-flex items-center min-h-11 underline underline-offset-2">Sell phone</Link> / <Link href={`/sell/${brand}`} className="inline-flex items-center min-h-11 underline underline-offset-2">{brandName}</Link> / {m.name}
        </nav>
        <SellQuote brandName={brandName} model={m} questions={questions} />
      </Container>
      <section className="bg-surface-container-low py-12 mt-6">
        <Container>
          <h2 className="text-[24px] sm:text-headline-lg font-bold text-primary text-center mb-6">Why Cheyyar sells with Sri Siddhi Ganesh Mobiles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
                <Icon name={w.icon} className="text-primary text-[28px]" />
                <h3 className="text-headline-sm text-primary mt-2">{w.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-1">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
