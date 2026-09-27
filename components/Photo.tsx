export const PHOTOS = {
  "refurbished-iphones": "Certified refurbished iPhones with boxes",
  oneplus: "OnePlus phones in green and black",
  "xiaomi-redmi": "Xiaomi and Redmi phones side by side",
  "realme-vivo": "Realme and Vivo phones with leather backs",
  "samsung-ultra": "Samsung Galaxy Ultra in titanium",
} as const;
export type PhotoName = keyof typeof PHOTOS;

/** Brand → banner photo used on brand pages. */
export const BRAND_PHOTO: Partial<Record<string, PhotoName>> = {
  apple: "refurbished-iphones",
  samsung: "samsung-ultra",
  oneplus: "oneplus",
  xiaomi: "xiaomi-redmi",
  poco: "xiaomi-redmi",
  realme: "realme-vivo",
  vivo: "realme-vivo",
  iqoo: "realme-vivo",
};

/** Square product photo from public/images, served at 640/1024px. */
export function Photo({ name, className = "", priority = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: { name: PhotoName; className?: string; priority?: boolean; sizes?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}.webp 1024w`}
      sizes={sizes}
      width={1024}
      height={1024}
      alt={PHOTOS[name]}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
