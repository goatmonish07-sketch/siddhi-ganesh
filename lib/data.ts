import "server-only";
import { cache } from "react";
import { BRANDS, CONDITION_QUESTIONS, MODELS, PRODUCTS, REPAIR_SERVICES } from "./catalog";
import { publicClient } from "./supabase/server";
import type { Brand, ConditionQuestion, PhoneModel, Product, RepairService } from "./types";

// Each loader reads from Supabase when configured and falls back to the bundled
// catalog when it isn't (or when the query fails), so the site always renders.
async function load<T>(label: string, fallback: T, query: (db: NonNullable<ReturnType<typeof publicClient>>) => Promise<T>): Promise<T> {
  const db = publicClient();
  if (!db) return fallback;
  try {
    return await query(db);
  } catch (err) {
    console.error(`[data] ${label} failed, using bundled catalog`, err);
    return fallback;
  }
}

function must<T>(res: { data: T | null; error: unknown }): T {
  if (res.error) throw res.error;
  return res.data as T;
}

export const getBrands = cache(
  (): Promise<Brand[]> =>
    load("brands", BRANDS, async (db) =>
      must(await db.from("brands").select("slug, name, sort").order("sort")),
    ),
);

interface ModelRow {
  slug: string;
  brand_slug: string;
  name: string;
  year: number;
  tier: PhoneModel["tier"];
  variants: { label: string; base_price: number; sort: number }[];
}

export const getModels = cache(
  (): Promise<PhoneModel[]> =>
    load("models", MODELS, async (db) => {
      const rows = must<ModelRow[]>(
        await db
          .from("models")
          .select("slug, brand_slug, name, year, tier, variants(label, base_price, sort)")
          .eq("is_active", true)
          .order("year", { ascending: false }),
      );
      return rows.map((r) => ({
        slug: r.slug,
        brandSlug: r.brand_slug,
        name: r.name,
        year: r.year,
        tier: r.tier,
        variants: [...r.variants].sort((a, b) => a.sort - b.sort).map((v) => ({ label: v.label, basePrice: v.base_price })),
      }));
    }),
);

export async function getModelsForBrand(brandSlug: string): Promise<PhoneModel[]> {
  return (await getModels()).filter((m) => m.brandSlug === brandSlug);
}

export async function getModel(brandSlug: string, slug: string): Promise<PhoneModel | undefined> {
  return (await getModels()).find((m) => m.brandSlug === brandSlug && m.slug === slug);
}

export const getConditionQuestions = cache(
  (): Promise<ConditionQuestion[]> =>
    load("condition_questions", CONDITION_QUESTIONS, async (db) => {
      const rows = must<
        {
          key: string;
          title: string;
          subtitle: string;
          badge: string | null;
          kind: "single" | "multi";
          condition_options: { key: string; label: string; hint: string | null; icon: string | null; pct: number | null; multiplier: number | null; sort: number }[];
        }[]
      >(await db.from("condition_questions").select("key, title, subtitle, badge, kind, condition_options(*)").order("sort"));
      return rows.map((q) => ({
        key: q.key,
        title: q.title,
        subtitle: q.subtitle,
        badge: q.badge ?? undefined,
        kind: q.kind,
        options: [...q.condition_options]
          .sort((a, b) => a.sort - b.sort)
          .map((o) => ({
            key: o.key,
            label: o.label,
            hint: o.hint ?? undefined,
            icon: o.icon ?? undefined,
            pct: o.pct === null ? undefined : Number(o.pct),
            multiplier: o.multiplier === null ? undefined : Number(o.multiplier),
          })),
      }));
    }),
);

export const getRepairServices = cache(
  (): Promise<RepairService[]> =>
    load("repair_services", REPAIR_SERVICES, async (db) => {
      const rows = must<
        {
          key: string;
          name: string;
          description: string;
          icon: string;
          badge: string;
          warranty_days: number;
          minutes: number;
          price_budget: number | null;
          price_mid: number | null;
          price_flagship: number | null;
          price_premium: number | null;
        }[]
      >(await db.from("repair_services").select("*").order("sort"));
      return rows.map((r) => ({
        key: r.key,
        name: r.name,
        description: r.description,
        icon: r.icon,
        badge: r.badge,
        warrantyDays: r.warranty_days,
        minutes: r.minutes,
        prices: { budget: r.price_budget, mid: r.price_mid, flagship: r.price_flagship, premium: r.price_premium },
      }));
    }),
);

interface ProductRow {
  id: string;
  brand_slug: string;
  name: string;
  variant: string;
  color: string;
  grade: Product["grade"];
  battery_health: number;
  price: number;
  mrp: number;
  warranty_months: number;
  highlights: string[];
  description: string;
  in_box: string[];
  image_url: string | null;
  tint: string;
  status: Product["status"];
}

export const getProducts = cache(
  (): Promise<Product[]> =>
    load("products", PRODUCTS, async (db) => {
      const rows = must<ProductRow[]>(
        await db.from("products").select("*").neq("status", "sold").order("created_at", { ascending: false }),
      );
      return rows.map((r) => ({
        id: r.id,
        brandSlug: r.brand_slug,
        name: r.name,
        variant: r.variant,
        color: r.color,
        grade: r.grade,
        batteryHealth: r.battery_health,
        price: r.price,
        mrp: r.mrp,
        warrantyMonths: r.warranty_months,
        highlights: r.highlights ?? [],
        description: r.description,
        inBox: r.in_box ?? [],
        imageUrl: r.image_url,
        tint: r.tint,
        status: r.status,
      }));
    }),
);

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.id === id);
}

/** Highest variant price per brand, for "Sell up to ₹X" on brand tiles. */
export async function getBrandMaxPrices(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const m of await getModels()) {
    for (const v of m.variants) out[m.brandSlug] = Math.max(out[m.brandSlug] ?? 0, v.basePrice);
  }
  return out;
}
