import { BRAND_LOGOS } from "@/lib/brand-logos";

/**
 * Monochrome brand mark (inherits text colour). Wide wordmarks (Samsung, Vivo, Oppo) are sized by
 * width so they read at the same visual weight as square marks. Brands without a mark get a wordmark.
 */
export function BrandLogo({ slug, name, className = "h-8" }: { slug: string; name: string; className?: string }) {
  const logo = BRAND_LOGOS[slug];
  if (!logo) {
    return (
      <span className={`inline-flex items-center font-display font-bold tracking-tight text-[20px] leading-none ${className}`} aria-label={name}>
        {name.split(" / ")[0]}
      </span>
    );
  }
  const [, , w, h] = logo.viewBox.split(" ").map(Number);
  const wide = w / h > 2.5;
  return (
    <svg
      viewBox={logo.viewBox}
      className={wide ? "w-[88px] sm:w-[104px] h-auto" : `${className} w-auto`}
      role="img"
      aria-label={name}
      fill="currentColor"
    >
      <path d={logo.path} />
    </svg>
  );
}
