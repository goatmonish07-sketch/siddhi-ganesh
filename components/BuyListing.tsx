"use client";

import { useMemo, useState } from "react";
import type { Brand, Grade, Product } from "@/lib/types";
import { GRADE_INFO } from "@/lib/catalog";
import { Icon } from "./Icon";
import { ProductCard, discountPct } from "./ProductCard";
import { inputCls } from "./booking";

const BUDGETS = [
  { key: "any", label: "Any price", min: 0, max: Infinity },
  { key: "u10", label: "Under ₹10k", min: 0, max: 10000 },
  { key: "10-20", label: "₹10k – ₹20k", min: 10000, max: 20000 },
  { key: "20-40", label: "₹20k – ₹40k", min: 20000, max: 40000 },
  { key: "40+", label: "Above ₹40k", min: 40000, max: Infinity },
];

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  low: { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  discount: { label: "Biggest discount", fn: (a: Product, b: Product) => discountPct(b) - discountPct(a) },
} as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 py-2 text-label-md border transition ${
        active ? "bg-primary-container text-white border-primary-container" : "bg-white border-hairline text-primary hover:border-primary-container"
      }`}
    >
      {children}
    </button>
  );
}

export function BuyListing({ products, brands }: { products: Product[]; brands: Brand[] }) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("all");
  const [budget, setBudget] = useState("any");
  const [grade, setGrade] = useState<Grade | "all">("all");
  const [sort, setSort] = useState<keyof typeof SORTS>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const activeFilters = [brand !== "all", budget !== "any", grade !== "all"].filter(Boolean).length;

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of products) c[p.brandSlug] = (c[p.brandSlug] ?? 0) + 1;
    return c;
  }, [products]);

  const shown = useMemo(() => {
    const b = BUDGETS.find((x) => x.key === budget)!;
    const needle = q.trim().toLowerCase();
    return products
      .filter((p) => brand === "all" || p.brandSlug === brand)
      .filter((p) => grade === "all" || p.grade === grade)
      .filter((p) => p.price >= b.min && p.price < b.max)
      .filter((p) => !needle || `${p.name} ${p.variant} ${p.color} ${p.highlights.join(" ")}`.toLowerCase().includes(needle))
      .sort(SORTS[sort].fn);
  }, [products, brand, grade, budget, q, sort]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-hairline p-4 shadow-card space-y-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
          <label className="relative block">
            <span className="sr-only">Search phones</span>
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input className={`${inputCls} pl-10`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search model, storage, colour…" />
          </label>
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
              Sort
              <select className={`${inputCls} w-auto py-2`} value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)}>
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>
            <span className="text-body-sm text-on-surface-variant whitespace-nowrap">{shown.length} phones</span>
          </div>
        </div>
        <button
          type="button"
          className="lg:hidden w-full min-h-11 flex items-center justify-between rounded-lg bg-surface-container px-3 text-label-lg text-primary"
          aria-expanded={showFilters}
          aria-controls="buy-filters"
          onClick={() => setShowFilters((v) => !v)}
        >
          <span>Filters{activeFilters ? ` (${activeFilters} active)` : ""}</span>
          <Icon name="expand_more" className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
        <div id="buy-filters" className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full sm:w-16 text-label-sm uppercase text-on-surface-variant">Brands</span>
          <Chip active={brand === "all"} onClick={() => setBrand("all")}>All brands</Chip>
          {brands.filter((b) => counts[b.slug]).map((b) => (
            <Chip key={b.slug} active={brand === b.slug} onClick={() => setBrand(b.slug)}>
              {b.name} ({counts[b.slug]})
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full sm:w-16 text-label-sm uppercase text-on-surface-variant">Budget</span>
          {BUDGETS.map((b) => (
            <Chip key={b.key} active={budget === b.key} onClick={() => setBudget(b.key)}>{b.label}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full sm:w-16 text-label-sm uppercase text-on-surface-variant">Grade</span>
          <Chip active={grade === "all"} onClick={() => setGrade("all")}>All grades</Chip>
          {(Object.keys(GRADE_INFO) as Grade[]).map((g) => (
            <Chip key={g} active={grade === g} onClick={() => setGrade(g)}>{GRADE_INFO[g].label}</Chip>
          ))}
        </div>
        </div>
      </div>

      {shown.length ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-hairline p-8 text-center text-on-surface-variant">
          No phones match these filters right now. New stock arrives every week — tell us what you want on WhatsApp and we&apos;ll keep one aside.
        </div>
      )}
    </div>
  );
}
