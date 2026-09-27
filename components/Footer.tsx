import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { SHOP, fullAddress } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";

const COLS = [
  {
    title: "Quick Services",
    links: [
      ["Sell Old Phone", "/sell"],
      ["Screen Replacement", "/repair?service=display"],
      ["Battery Replacement", "/repair?service=battery"],
      ["Water Damage Fix", "/repair?service=water_damage"],
      ["Data Backup & Recovery", "/repair?service=data_recovery"],
    ],
  },
  {
    title: "Store & Support",
    links: [
      ["Certified Used Phones", "/buy"],
      ["Track Request Status", "/track"],
      ["Store Location & Hours", "/about"],
      ["Privacy Policy", "/privacy"],
      ["Terms & Warranty", "/terms"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-3">
          <Logo />
          <p className="text-body-md text-on-surface-variant">
            Cheyyar&apos;s centre for fast mobile repairs, certified refurbished smartphones and the best value for your old phone.
          </p>
          <p className="text-body-sm text-on-surface-variant">
            <strong className="text-on-surface">Proprietor: {SHOP.owner}</strong>
            <br />
            {fullAddress}
            <br />
            Phone: <a className="underline" href={`tel:+91${SHOP.phone}`}>{SHOP.phoneDisplay}</a>
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h3 className="text-headline-sm text-primary mb-3">{c.title}</h3>
            <ul className="space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-body-md text-on-surface-variant hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-headline-sm text-primary mb-3">Direct Contact</h3>
          <div className="rounded-xl bg-surface-container p-4 space-y-3">
            <div className="text-label-lg text-primary">Need immediate assistance?</div>
            <p className="text-body-sm text-on-surface-variant">Message our technician on WhatsApp for a real-time cost estimate.</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-container text-white py-2.5 text-label-lg hover:bg-primary"
            >
              <Icon name="chat" /> Chat with {SHOP.owner}
            </a>
            <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
              <Icon name="schedule" className="text-[16px]" /> {SHOP.hours}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row justify-between gap-2 text-body-sm text-on-surface-variant">
          <span>© {new Date().getFullYear()} {SHOP.legalName}, Cheyyar. All rights reserved.</span>
          <span>Serving {SHOP.serviceArea.join(" · ")}</span>
        </div>
      </div>
    </footer>
  );
}
