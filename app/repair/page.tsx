import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { RepairBooking } from "@/components/RepairBooking";
import { Container, SectionHeading } from "@/components/Section";
import { getBrands, getModels, getRepairServices } from "@/lib/data";
import { SHOP, fullAddress } from "@/lib/shop";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Mobile Repair in Cheyyar – Display, Battery, Charging Port & More",
  description:
    "Book a mobile repair at Sri Siddhi Ganesh Mobiles, Cheyyar: display & battery replacement, charging port, camera, water damage, speaker & mic, fingerprint, software and data recovery. Genuine parts with warranty.",
};

const WARRANTIES = [
  { icon: "smartphone", title: "180-day display coverage", body: "Touch lag, ghost touches or dead pixels on a screen we fitted? We replace it free within 6 months." },
  { icon: "battery_charging_full", title: "90-day battery shield", body: "Certified cells. Sudden drops, swelling or overheating are covered with an immediate swap." },
  { icon: "handshake", title: "No fix, no fee", body: "If we can't revive a dead or water-damaged phone, you don't pay the repair charge." },
];

const WORKFLOW = [
  { title: "Check-in & spot testing", body: "We log and test touch, mic, battery and cameras before opening the phone." },
  { title: "Bench repair", body: "Parts are fitted on anti-static mats with calibrated tools — you can watch." },
  { title: "QC & delivery", body: "We re-test charging, display and calls and hand over a printed bill with warranty." },
];

const FAQ = [
  { q: "Will my photos, WhatsApp chats and data stay safe?", a: "Yes. Most repairs don't touch your storage. For software work we back up your data first on request, and you can stay with the phone during the repair." },
  { q: "How fast can you replace a screen or battery?", a: "Screens and batteries for popular models are usually in stock and replaced in 30–45 minutes. Rare parts are ordered and typically arrive in 1–2 days." },
  { q: "My phone fell in water and won't turn on. Can you fix it?", a: "Bring it in as soon as possible and don't charge it. We do an ultrasonic clean and board-level diagnosis; if we can't revive it, you don't pay the repair charge." },
  { q: "How does the warranty work?", a: "Every repair comes with a printed bill. Displays carry 180 days, batteries and most parts 90 days against manufacturing defects (physical or water damage isn't covered)." },
  { q: "Do you offer pickup within Cheyyar?", a: "Yes, choose 'Free doorstep pickup' while booking and we'll collect and return your phone within Cheyyar town." },
];

export default async function RepairPage() {
  const [brands, models, services] = await Promise.all([getBrands(), getModels(), getRepairServices()]);
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-center py-8 lg:py-12">
          <div className="space-y-4">
            <p className="text-label-md text-muted">Repair · {SHOP.name}, {SHOP.city}</p>
            <h1 className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] font-bold tracking-tight text-on-surface">Phone repair you can watch, with genuine parts</h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Screen and battery replaced in about 30 minutes. 90 to 180 days warranty. Done by {SHOP.owner} &amp; certified technicians at {SHOP.street}.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-on-surface-variant">
              {["Free diagnosis", "Pay after repair", "Up to 180-day warranty"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Icon name="check" className="text-[16px] text-success" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="relative hidden sm:block overflow-hidden rounded-3xl bg-canvas aspect-[16/10]">
            <Photo name="xiaomi-redmi" priority className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute left-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lift">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-on-surface text-white font-display font-bold">30m</span>
              <div>
                <div className="text-label-lg text-on-surface">Express counter repair</div>
                <div className="text-body-sm text-on-surface-variant">Wait at the shop while we fix it</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <RepairBooking brands={brands} models={models} services={services} />
      </Container>

      <section className="bg-surface-container-low border-y border-hairline py-12 lg:py-16">
        <Container>
          <SectionHeading eyebrow="Our promise" title="Warranties on every service" />
          <div className="grid md:grid-cols-3 gap-4">
            {WARRANTIES.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white border border-hairline p-5">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-surface-container text-on-surface mb-3">
                  <Icon name={w.icon} />
                </span>
                <h3 className="text-headline-sm text-on-surface">{w.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-1">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <SectionHeading eyebrow="Fast turnaround workflow" title="How your phone gets fixed" />
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {WORKFLOW.map((w, i) => (
              <div key={w.title} className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
                <div className="font-display text-headline-md text-on-surface/20">0{i + 1}</div>
                <h3 className="text-headline-sm text-primary mt-1">{w.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-1">{w.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-surface-container p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="storefront" />
              <span><strong>{SHOP.name}</strong> · {fullAddress}</span>
            </div>
            <a href={`tel:+91${SHOP.phone}`} className="inline-flex items-center min-h-11 rounded-lg bg-primary-container px-4 text-white text-label-lg">Call shop</a>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <Container className="max-w-3xl">
          <SectionHeading center eyebrow="Frequently asked" title="Mobile repair answers" />
          <Faq items={FAQ} />
        </Container>
      </section>
    </>
  );
}
