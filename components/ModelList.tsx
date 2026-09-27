"use client";

import Link from "next/link";
import { useState } from "react";
import { formatINR } from "@/lib/shop";
import { Icon } from "./Icon";
import { inputCls } from "./booking";
import { BRAND_TINT, DeviceImage } from "./DeviceImage";

export interface ModelLink {
  href: string;
  name: string;
  brand: string;
  maxPrice: number;
  year: number;
  brandSlug: string;
  imageUrl?: string | null;
}

export function ModelList({ models, placeholder = "Search your model, e.g. iPhone 13, Galaxy A55…", priceLabel = "Sell up to" }: { models: ModelLink[]; placeholder?: string; priceLabel?: string }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle ? models.filter((m) => `${m.brand} ${m.name}`.toLowerCase().includes(needle)) : models;
  return (
    <div className="space-y-4">
      <label className="relative block">
        <span className="sr-only">Search model</span>
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input className={`${inputCls} pl-10 py-3 bg-white`} value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
      </label>
      {shown.length === 0 ? (
        <p className="text-body-md text-on-surface-variant">
          Can&apos;t find your model? Message us on WhatsApp and we&apos;ll quote it manually.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {shown.map((m) => (
            <Link key={m.href} href={m.href} className="group flex flex-col rounded-xl bg-white border border-hairline p-3 transition hover:shadow-lift hover:border-transparent">
              <div className="grid place-items-center rounded-lg bg-canvas h-32 sm:h-36 p-2">
                <DeviceImage src={m.imageUrl} alt={`${m.brand} ${m.name}`} tint={BRAND_TINT[m.brandSlug]} cameras={m.brandSlug === "apple" ? 2 : 3} className="h-full w-full" />
              </div>
              <div className="pt-3 text-label-lg text-on-surface">{m.name}</div>
              <div className="text-body-sm text-muted">{m.brand} · {m.year}</div>
              <div className="mt-auto pt-2 text-body-sm text-on-surface tnum">{priceLabel} <strong>{formatINR(m.maxPrice)}</strong></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
