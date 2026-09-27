import { Icon } from "./Icon";

const ITEMS = [
  { icon: "verified", title: "100% Genuine Parts", sub: "Assured certified components" },
  { icon: "shield", title: "6-Month Warranty", sub: "Hassle-free coverage support" },
  { icon: "payments", title: "Instant Cash & UPI", sub: "Direct payout upon spot check" },
  { icon: "home_repair_service", title: "Free Diagnosis", sub: "Comprehensive 32-point inspection" },
];

export function TrustStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {ITEMS.map((i) => (
        <div key={i.title} className="flex items-center gap-3 rounded-xl bg-white border border-hairline p-3 shadow-card">
          <Icon name={i.icon} className="text-gold-deep text-[26px]" />
          <div className="min-w-0">
            <div className="text-label-lg text-primary">{i.title}</div>
            <div className="text-body-sm text-on-surface-variant">{i.sub}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
