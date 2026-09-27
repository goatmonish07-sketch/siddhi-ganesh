import type { Metadata } from "next";
import { BuyListing } from "@/components/BuyListing";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Container, SectionHeading } from "@/components/Section";
import { GRADE_INFO } from "@/lib/catalog";
import { getBrands, getProducts } from "@/lib/data";
import { SHOP } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";
import type { Grade } from "@/lib/types";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Buy Second-Hand & Refurbished Phones in Cheyyar",
  description: "Certified pre-owned iPhones, Samsung, OnePlus, Vivo and more with 32-point inspection, bill and up to 6-month shop warranty. Test before you pay in Cheyyar.",
};

const PERKS = [
  { icon: "fact_check", title: "32-point quality inspected", sub: "Display, logic board & camera tested" },
  { icon: "shield", title: "Up to 6-month shop warranty", sub: "Printed bill with warranty stamp" },
  { icon: "autorenew", title: "7-day replacement", sub: "Hardware issue? We swap it" },
  { icon: "currency_exchange", title: "Exchange your old phone", sub: "Get its value off your new one" },
];

export default async function BuyPage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="py-8 lg:py-12 space-y-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-center">
            <div className="space-y-4">
              <p className="text-label-md text-muted">Buy · {SHOP.name}, {SHOP.city}</p>
              <h1 className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] font-bold tracking-tight text-on-surface">Certified second-hand phones, like new</h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">Every phone is 32-point checked and comes with a bill and shop warranty. Test it in person at {SHOP.street} before you pay.</p>
            </div>
            <div className="relative hidden sm:block overflow-hidden rounded-3xl bg-canvas aspect-[16/10]">
              <Photo name="refurbished-iphones" priority className="absolute inset-0 h-full w-full object-cover object-[50%_60%]" />
              <div className="absolute left-4 bottom-4 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lift">
                <div className="text-label-lg text-on-surface">In-store demo &amp; hold</div>
                <div className="text-body-sm text-on-surface-variant">{SHOP.hours}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-xl border border-hairline p-3 sm:p-4 flex gap-3 items-start">
                <Icon name={p.icon} className="text-on-surface" />
                <div>
                  <div className="text-label-md text-on-surface">{p.title}</div>
                  <div className="text-body-sm text-on-surface-variant">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <BuyListing products={products} brands={brands} />
      </Container>

      <section className="py-12 lg:py-16 bg-surface-container-low border-y border-hairline">
        <Container>
          <SectionHeading eyebrow="Our quality protocol" title="Understanding our grades" sub="Every phone passes a 32-point diagnostic check before it's listed." />
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(GRADE_INFO) as Grade[]).map((g) => (
              <div key={g} className="rounded-2xl border border-hairline bg-white p-5">
                <div className="text-label-sm uppercase text-secondary">{GRADE_INFO[g].label}</div>
                <h3 className="text-headline-sm text-primary mt-1">{GRADE_INFO[g].title}</h3>
                <ul className="mt-3 space-y-1.5 text-body-md text-on-surface-variant">
                  {GRADE_INFO[g].points.map((p) => (
                    <li key={p} className="flex gap-2"><Icon name="check" className="text-[18px] text-success" />{p}</li>
                  ))}
                </ul>
                <div className="mt-3 text-label-md text-primary">{GRADE_INFO[g].warranty}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="rounded-3xl bg-on-surface text-white p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-[24px] sm:text-headline-lg font-bold">Test in person before paying a single rupee</h2>
            <p className="text-body-md text-white/70 mt-2 max-w-2xl">
              Visit {SHOP.street}, {SHOP.city}. Insert your own SIM, test the cameras, check the battery and verify the IMEI at our counter before you pay.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={waLink("Hi, I'd like to schedule a visit to see second-hand phones.")} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white text-on-surface px-5 py-3 text-label-lg text-center">
              Schedule shop visit
            </a>
            <a href={`tel:+91${SHOP.phone}`} className="rounded-xl border border-white/25 px-5 py-3 text-label-lg text-center">Call {SHOP.owner}</a>
          </div>
        </div>
      </Container>
    </>
  );
}
