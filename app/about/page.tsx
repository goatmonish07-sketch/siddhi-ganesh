import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Container, SectionHeading } from "@/components/Section";
import { VisitShop } from "@/components/VisitShop";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  title: "About & Contact",
  description: `${SHOP.legalName} — mobile sales & service at 46 Loganadhan Street, Cheyyar. Proprietor ${SHOP.owner}, ${SHOP.phoneDisplay}.`,
};

const SERVICES = [
  "Display replacement", "Battery replacement", "Charging port repair", "Camera repair", "Water damage repair",
  "Speaker & mic repair", "Fingerprint repair", "Software problems & updates", "Data backup & recovery", "Second-hand mobiles",
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <SectionHeading eyebrow="About us" title={SHOP.legalName} sub={SHOP.tagline} />
          <div className="space-y-3 text-body-lg text-on-surface-variant">
            <p>
              Run by <strong className="text-primary">{SHOP.owner}</strong>, we&apos;re a neighbourhood mobile shop on {SHOP.street}, {SHOP.city} offering all kinds of mobile services under one roof.
            </p>
            <p>
              We buy used phones at fair, transparent prices, repair phones of every brand with genuine parts, and sell carefully inspected second-hand mobiles with a shop warranty.
            </p>
            <p className="flex flex-wrap gap-2 pt-2">
              {["Quality service", "Genuine parts", "Customer satisfaction"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-gold text-label-md">
                  <Icon name="verified" className="text-[14px]" /> {t}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-hairline p-6 shadow-card">
          <h2 className="text-headline-sm text-primary mb-3">All kinds of mobile services</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <li key={s} className="flex gap-2 text-body-md text-on-surface">
                <Icon name="check_circle" className="text-[18px] text-on-tertiary-container" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <VisitShop />
    </>
  );
}
