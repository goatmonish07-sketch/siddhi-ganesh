import Link from "next/link";
import type { Brand } from "@/lib/types";
import { formatINR } from "@/lib/shop";

export function BrandGrid({ brands, maxPrices, hrefBase = "/sell" }: { brands: Brand[]; maxPrices: Record<string, number>; hrefBase?: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {brands.map((b) => (
        <Link
          key={b.slug}
          href={`${hrefBase}/${b.slug}`}
          className="group flex flex-col items-center gap-2 rounded-xl bg-white border border-hairline p-4 shadow-card hover:shadow-lift hover:ring-2 hover:ring-primary-container transition"
        >
          <span className="grid place-items-center w-12 h-12 rounded-full bg-surface-container text-primary font-display font-extrabold text-headline-sm group-hover:bg-primary-container group-hover:text-gold transition-colors">
            {b.name.charAt(0)}
          </span>
          <span className="text-label-lg text-primary text-center">{b.name}</span>
          {maxPrices[b.slug] ? (
            <span className="text-body-sm text-on-surface-variant tnum">Sell up to {formatINR(maxPrices[b.slug])}</span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
