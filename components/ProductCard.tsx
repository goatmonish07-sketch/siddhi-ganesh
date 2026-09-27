import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/shop";
import { GradeBadge } from "./Grade";
import { Icon } from "./Icon";
import { DeviceImage } from "./DeviceImage";

export function discountPct(p: Pick<Product, "price" | "mrp">): number {
  return p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
}

export function ProductImage({ product, className = "h-36 sm:h-44" }: { product: Product; className?: string }) {
  return (
    <div className={`relative rounded-xl bg-canvas grid place-items-center overflow-hidden p-3 ${className}`}>
      <DeviceImage
        src={product.imageUrl}
        alt={`${product.name} ${product.variant}`}
        tint={product.tint}
        cameras={product.brandSlug === "apple" ? 2 : 3}
        className="h-full w-full"
      />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPct(product);
  return (
    <article className="group relative flex flex-col rounded-2xl bg-white border border-hairline p-2.5 sm:p-3 transition hover:shadow-lift hover:border-transparent">
      <div className="relative">
        <ProductImage product={product} />
        <div className="absolute top-2 left-2 right-2 flex flex-wrap justify-between items-start gap-1">
          <GradeBadge grade={product.grade} />
          <span className="px-2 py-0.5 rounded-full bg-white text-label-sm text-on-surface-variant flex items-center gap-1 shadow-card">
            <Icon name="battery_full" className="text-[12px]" /> {product.batteryHealth}%<span className="hidden sm:inline">&nbsp;health</span>
          </span>
        </div>
        {off > 0 && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-white text-label-sm text-secondary shadow-card">{off}% off</span>
        )}
        {product.status === "reserved" && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary text-white text-label-sm">RESERVED</span>
        )}
      </div>
      <div className="flex-1 pt-3 space-y-1">
        <div className="text-body-sm text-on-surface-variant line-clamp-1">{product.variant}<span className="hidden sm:inline"> · {product.color}</span></div>
        <h3 className="text-label-lg sm:text-[16px] sm:leading-6 font-semibold text-on-surface">
          <Link href={`/buy/${product.id}`} className="after:absolute after:inset-0 after:z-10">
            {product.name}
          </Link>
        </h3>
        <div className="hidden sm:flex flex-wrap gap-1 pt-1">
          <span className="text-label-sm px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant">{product.warrantyMonths}M warranty</span>
          {product.highlights.slice(0, 1).map((h) => (
            <span key={h} className="text-label-sm px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant">{h}</span>
          ))}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 pt-2 tnum">
          <span className="font-display text-headline-sm sm:text-headline-md font-bold text-on-surface">{formatINR(product.price)}</span>
          <span className="text-body-sm text-muted line-through">{formatINR(product.mrp)}</span>
        </div>
      </div>
      <span className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-on-surface/15 text-on-surface text-label-md sm:text-label-lg group-hover:bg-on-surface group-hover:text-white group-hover:border-on-surface transition-colors">
        <Icon name="shopping_bag" className="text-[18px]" /> <span className="sm:hidden">View</span><span className="hidden sm:inline">View & reserve</span>
      </span>
    </article>
  );
}
