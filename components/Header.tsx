"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { SHOP } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/sell", label: "Sell Phone" },
  { href: "/repair", label: "Repair" },
  { href: "/buy", label: "Buy Refurbished" },
  { href: "/track", label: "Track Order" },
  { href: "/about", label: "About & Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="hidden sm:block bg-surface-container-low border-b border-hairline text-on-surface-variant py-1.5 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-label-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:+91${SHOP.phone}`} className="flex items-center gap-1 text-on-surface">
              <Icon name="call" className="text-[14px] text-muted" />
              {SHOP.phone}
            </a>
            <span className="hidden md:flex items-center gap-1">
              <Icon name="location_on" className="text-[14px] text-muted" />
              {SHOP.street}, {SHOP.city} {SHOP.pincode}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-block">Open daily · 9:30 AM – 9:30 PM</span>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 whitespace-nowrap text-on-surface hover:text-secondary">
              <Icon name="chat" className="text-[14px]" />
              Direct WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border-b border-hairline">
        <div className="h-16 sm:h-18 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-3">
          <Logo />
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex items-center min-h-11 px-3 rounded-lg text-label-lg transition-colors ${
                  isActive(item.href) ? "text-on-surface bg-surface-container" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/repair" className="hidden md:inline-flex items-center min-h-11 px-4 rounded-lg border border-hairline text-on-surface text-label-lg hover:bg-surface-container-low transition-colors">
              Book Repair
            </Link>
            <a
              href={`tel:+91${SHOP.phone}`}
              aria-label={`Call ${SHOP.phoneDisplay}`}
              className="sm:hidden w-11 h-11 grid place-items-center rounded-lg bg-surface-container text-primary"
            >
              <Icon name="call" />
            </a>
            <Link href="/sell" className="hidden sm:inline-flex items-center min-h-11 px-4 rounded-lg bg-primary-container text-white text-label-lg hover:bg-primary transition-colors whitespace-nowrap">
              Sell Old Phone
            </Link>
            <button
              type="button"
              className="xl:hidden w-11 h-11 grid place-items-center rounded-lg text-primary hover:bg-surface-container"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="xl:hidden border-t border-hairline px-4 py-2 bg-white max-h-[calc(100dvh-4rem)] overflow-y-auto" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center min-h-12 px-3 rounded-lg text-label-lg ${isActive(item.href) ? "bg-surface-container text-primary" : "text-on-surface-variant"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
