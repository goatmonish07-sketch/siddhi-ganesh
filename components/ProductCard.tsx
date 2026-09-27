import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/shop";
import { GradeBadge } from "./Grade";
import { Icon } from "./Icon";
import { PhoneArt } from "./PhoneArt";

export function discountPct(p: Pick<Product, "price" | "mrp">): number {
  return p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
}

export function ProductImage({ product, className = "h-40" }: { product: Product; className?: string }) {
  return (
    <div className={`relative rounded-xl bg-[#f9f7f4] grid place-items-center overflow-hidden ${className}`}>
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
      ) : (
        <PhoneArt tint={product.tint} className="h-[85%]" cameras={product.brandSlug === "apple" ? 2 : 3} />
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPct(product);
  return (
    <article className="group relative flex flex-col rounded-2xl bg-white border border-hairline p-3 shadow-card hover:shadow-lift transition-shadow">
      <div className="relative">
        <ProductImage product={product} />
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <GradeBadge grade={product.grade} />
          <span className="px-2 py-0.5 rounded-full bg-white/90 text-label-sm text-primary flex items-center gap-1">
            <Icon name="battery_full" className="text-[12px]" /> {product.batteryHealth}% health
          </span>
        </div>
        {off > 0 && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-label-sm">SAVE {off}%</span>
        )}
        {product.status === "reserved" && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary text-white text-label-sm">RESERVED</span>
        )}
      </div>
      <div className="flex-1 pt-3 space-y-1">
        <div className="text-body-sm text-on-surface-variant">{product.variant} · {product.color}</div>
        <h3 className="text-headline-sm text-primary">
          <Link href={`/buy/${product.id}`} className="after:absolute after:inset-0 after:z-10">
            {product.name}
          </Link>
        </h3>
        <div className="flex flex-wrap gap-1 pt-1">
          <span className="text-label-sm px-2 py-0.5 rounded bg-surface-container text-primary">{product.warrantyMonths}M warranty</span>
          {product.highlights.slice(0, 1).map((h) => (
            <span key={h} className="text-label-sm px-2 py-0.5 rounded bg-surface-container text-primary">{h}</span>
          ))}
        </div>
        <div className="flex items-baseline gap-2 pt-2 tnum">
          <span className="font-display text-headline-md text-primary">{formatINR(product.price)}</span>
          <span className="text-body-sm text-outline line-through">{formatINR(product.mrp)}</span>
        </div>
      </div>
      <span className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary-container text-white py-2.5 text-label-lg group-hover:bg-primary">
        <Icon name="shopping_bag" className="text-[18px]" /> View & reserve
      </span>
    </article>
  );
}
