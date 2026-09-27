import { PhoneArt } from "./PhoneArt";

/** Real photo when the image slot is filled, otherwise the device render. */
export function DeviceImage({
  src,
  alt,
  tint,
  cameras,
  className = "",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  tint?: string;
  cameras?: 2 | 3;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-contain ${className}`} loading={priority ? "eager" : "lazy"} decoding="async" />;
  }
  return <PhoneArt tint={tint} cameras={cameras} className={className} />;
}

export const BRAND_TINT: Record<string, string> = {
  apple: "#2c2c2e",
  samsung: "#3b4252",
  oneplus: "#1f2a24",
  vivo: "#3d4a6b",
  oppo: "#2f4a3a",
  xiaomi: "#454b55",
  realme: "#8a6a3b",
  motorola: "#3a4a5a",
  iqoo: "#2a2a35",
  poco: "#4a4f24",
};
