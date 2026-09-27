import type { Metadata } from "next";
import { BuyListing } from "@/components/BuyListing";
import { Icon } from "@/components/Icon";
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
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-10">
        <Container className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-secondary-fixed text-label-sm uppercase">
                <Icon name="verified" className="text-[14px]" /> Cheyyar&apos;s direct phone store
              </span>
              <h1 className="text-[30px] leading-[38px] sm:text-headline-xl font-extrabold tracking-tight text-primary">Certified pre-owned &amp; refurbished mobiles in Cheyyar</h1>
              <p className="text-body-lg text-on-surface-variant">Thoroughly inspected phones. Test before purchase right here at {SHOP.street}.</p>
            </div>
            <div className="rounded-xl bg-white border border-hairline p-3 flex items-center gap-3 shadow-card">
              <Icon name="storefront" className="text-primary" />
              <div>
                <div className="text-label-md text-primary">In-store demo &amp; hold available</div>
                <div className="text-body-sm text-on-surface-variant">{SHOP.hours}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-xl bg-white/70 border border-hairline p-3 flex gap-2 items-start">
                <Icon name={p.icon} className="text-gold-deep" />
                <div>
                  <div className="text-label-md text-primary">{p.title}</div>
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

      <section className="py-12 bg-white">
        <Container>
          <SectionHeading eyebrow="Our quality protocol" title="Understanding our grades" sub="Every phone passes a 32-point diagnostic check before it's listed." />
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(GRADE_INFO) as Grade[]).map((g) => (
              <div key={g} className="rounded-2xl border border-hairline p-5 shadow-card">
                <div className="text-label-sm uppercase text-secondary">{GRADE_INFO[g].label}</div>
                <h3 className="text-headline-sm text-primary mt-1">{GRADE_INFO[g].title}</h3>
                <ul className="mt-3 space-y-1.5 text-body-md text-on-surface-variant">
                  {GRADE_INFO[g].points.map((p) => (
                    <li key={p} className="flex gap-2"><Icon name="check" className="text-[18px] text-on-tertiary-container" />{p}</li>
                  ))}
                </ul>
                <div className="mt-3 text-label-md text-primary">{GRADE_INFO[g].warranty}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="rounded-3xl bg-gradient-to-br from-primary-container to-primary text-white p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-[24px] sm:text-headline-lg font-bold">Test in person before paying a single rupee</h2>
            <p className="text-body-md text-on-primary-container mt-2 max-w-2xl">
              Visit {SHOP.street}, {SHOP.city}. Insert your own SIM, test the cameras, check the battery and verify the IMEI at our counter before you pay.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={waLink("Hi, I'd like to schedule a visit to see second-hand phones.")} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-secondary-container text-on-secondary-fixed px-5 py-3 text-label-lg text-center">
              Schedule shop visit
            </a>
            <a href={`tel:+91${SHOP.phone}`} className="rounded-lg border border-white/30 px-5 py-3 text-label-lg text-center">Call {SHOP.owner}</a>
          </div>
        </div>
      </Container>
    </>
  );
}
