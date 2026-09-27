import Link from "next/link";
import type { Brand } from "@/lib/types";
import { formatINR } from "@/lib/shop";
import { BrandLogo } from "./BrandLogo";

export function BrandGrid({ brands, maxPrices, hrefBase = "/sell" }: { brands: Brand[]; maxPrices: Record<string, number>; hrefBase?: string }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
      {brands.map((b) => (
        <Link
          key={b.slug}
          href={`${hrefBase}/${b.slug}`}
          className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-hairline bg-white px-2 py-4 sm:py-5 text-on-surface transition hover:border-on-surface/20 hover:shadow-lift"
        >
          <span className="grid h-10 place-items-center text-on-surface/85 group-hover:text-on-surface transition-colors">
            <BrandLogo slug={b.slug} name={b.name} className="h-7 sm:h-8" />
          </span>
          <span className="text-body-sm sm:text-label-md text-on-surface-variant text-center">{b.name}</span>
          {maxPrices[b.slug] ? (
            <span className="hidden sm:block text-body-sm text-muted tnum">Up to {formatINR(maxPrices[b.slug])}</span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
