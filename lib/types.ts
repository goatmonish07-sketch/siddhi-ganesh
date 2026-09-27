export type Tier = "budget" | "mid" | "flagship" | "premium";

export interface Brand {
  slug: string;
  name: string;
  sort: number;
}

export interface Variant {
  label: string;
  basePrice: number; // maximum buyback price for a flawless unit
}

export interface PhoneModel {
  slug: string;
  brandSlug: string;
  name: string;
  year: number;
  tier: Tier;
  variants: Variant[];
  imageUrl?: string | null;
}

export interface ConditionOption {
  key: string;
  label: string;
  hint?: string;
  icon?: string;
  /** Adjustment as a fraction of the variant's base price (-0.05 = -5%, +0.015 = +1.5%). */
  pct?: number;
  /** Multiplies the whole quote (e.g. a dead phone is worth 0.4× of a working one). */
  multiplier?: number;
}

export interface ConditionQuestion {
  key: string;
  title: string;
  subtitle: string;
  badge?: string;
  kind: "single" | "multi";
  options: ConditionOption[];
}

export interface RepairService {
  key: string;
  name: string;
  description: string;
  icon: string;
  badge: string;
  warrantyDays: number;
  minutes: number;
  /** Starting price per model tier; null = inspection required. */
  prices: Record<Tier, number | null>;
}

export type Grade = "superb" | "good" | "fair";
export type ProductStatus = "available" | "reserved" | "sold";

export interface Product {
  id: string;
  brandSlug: string;
  name: string;
  variant: string;
  color: string;
  grade: Grade;
  batteryHealth: number;
  price: number;
  mrp: number;
  warrantyMonths: number;
  highlights: string[];
  description: string;
  inBox: string[];
  imageUrl?: string | null;
  tint: string; // accent colour for the illustrated device when there's no photo
  status: ProductStatus;
}

export type RequestKind = "sell" | "repair" | "buy";

export interface RequestStatus {
  id: string;
  kind: RequestKind;
  status: string;
  createdAt: string;
  summary: string;
}
