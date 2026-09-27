import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
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
      <section className="bg-gradient-to-br from-primary-container to-primary text-white py-10">
        <Container className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-label-sm uppercase">
              <Icon name="build" className="text-[14px]" /> Service workshop · {SHOP.city}
            </span>
            <h1 className="text-[30px] leading-[38px] sm:text-headline-xl font-extrabold tracking-tight">Expert chip-level &amp; component mobile repair in Cheyyar</h1>
            <p className="text-body-lg text-primary-fixed-dim">
              Express screen &amp; battery replacement. Genuine parts. 90 to 180 days warranty. Direct service by {SHOP.owner} &amp; certified technicians.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 flex items-center gap-3 max-w-sm">
            <span className="grid place-items-center w-12 h-12 rounded-lg bg-secondary-container text-on-secondary-fixed font-display font-extrabold">30m</span>
            <div>
              <div className="text-label-lg">Express counter turnaround</div>
              <div className="text-body-sm text-primary-fixed-dim">Wait at the shop while we fix it</div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <RepairBooking brands={brands} models={models} services={services} />
      </Container>

      <section className="bg-primary-container text-white py-12 lg:py-16">
        <Container>
          <div className="text-label-sm uppercase tracking-widest text-gold">The Cheyyar customer shield</div>
          <h2 className="text-[24px] sm:text-headline-lg font-bold mb-6">Warranties on every service</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {WARRANTIES.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-secondary-container text-on-secondary-fixed mb-3">
                  <Icon name={w.icon} />
                </span>
                <h3 className="text-headline-sm">{w.title}</h3>
                <p className="text-body-md text-primary-fixed-dim mt-1">{w.body}</p>
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
                <div className="font-display text-headline-md text-secondary">0{i + 1}</div>
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
