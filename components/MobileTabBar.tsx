"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { waLink } from "@/lib/whatsapp";

const TABS = [
  { href: "/", label: "Home", icon: "storefront" },
  { href: "/sell", label: "Sell", icon: "currency_rupee" },
  { href: "/repair", label: "Repair", icon: "build" },
  { href: "/buy", label: "Buy", icon: "shopping_bag" },
];

/** Bottom navigation for phones/tablets (< lg). Body reserves its height via `pb-tabbar`. */
export function MobileTabBar() {
  const pathname = usePathname();
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <nav aria-label="Quick navigation" className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-hairline shadow-float pb-safe">
      <ul className="grid grid-cols-5 h-16">
        {TABS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              aria-current={active(t.href) ? "page" : undefined}
              className={`h-full flex flex-col items-center justify-center gap-0.5 text-label-md transition-colors ${
                active(t.href) ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              <span className={`grid place-items-center h-7 w-12 rounded-full transition-colors ${active(t.href) ? "bg-surface-container" : ""}`}>
                <Icon name={t.icon} className="text-[20px]" />
              </span>
              {t.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href={waLink("Hi, I have a query about my mobile.")}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full flex flex-col items-center justify-center gap-0.5 text-label-md text-success"
          >
            <span className="grid place-items-center h-7 w-12 rounded-full bg-whatsapp text-on-surface">
              <Icon name="chat" className="text-[18px]" />
            </span>
            WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  );
}
