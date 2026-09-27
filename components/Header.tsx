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
      <div className="bg-primary-container text-on-primary-container py-1 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-label-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:+91${SHOP.phone}`} className="flex items-center gap-1 text-white tracking-wider">
              <Icon name="call" className="text-[14px] text-secondary-container" />
              {SHOP.phone}
            </a>
            <span className="hidden sm:flex items-center gap-1">
              <Icon name="location_on" className="text-[14px] text-secondary-container" />
              {SHOP.street}, {SHOP.city} {SHOP.pincode}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block bg-primary px-2 py-0.5 rounded-full text-secondary-fixed uppercase tracking-wider">
              Cheyyar&apos;s most trusted mobile hub
            </span>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-secondary-fixed hover:text-white">
              <Icon name="chat" className="text-[14px]" />
              Direct WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-surface/90 backdrop-blur-xl">
        <div className="h-18 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg text-label-lg transition-colors ${
                  isActive(item.href) ? "bg-primary-container text-white" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/repair" className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-surface-container-low text-primary text-label-lg hover:bg-secondary-fixed transition-colors">
              Book Repair
            </Link>
            <Link href="/sell" className="inline-flex px-4 py-2 rounded-lg bg-primary-container text-white text-label-lg hover:bg-primary hover:text-secondary-fixed transition-colors shadow-[0_2px_8px_rgba(22,58,36,0.12)] whitespace-nowrap">
              Sell<span className="hidden sm:inline">&nbsp;Old Phone</span>
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
          <nav id="mobile-nav" className="xl:hidden border-t border-hairline px-4 py-2 bg-white" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-3 rounded-lg text-label-lg ${isActive(item.href) ? "bg-surface-container text-primary" : "text-on-surface-variant"}`}
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
