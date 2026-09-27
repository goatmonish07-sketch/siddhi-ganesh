import type { RepairService, Tier } from "./types";

export function repairPrice(service: RepairService, tier: Tier): number | null {
  return service.prices[tier];
}

/** Lowest price across tiers, for "From ₹X" labels. Null if every tier needs inspection. */
export function startingPrice(service: RepairService): number | null {
  const prices = Object.values(service.prices).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

/** Total estimate for the picked services; null when any of them needs inspection first. */
export function repairEstimate(services: RepairService[], tier: Tier): { total: number; needsInspection: boolean } {
  let total = 0;
  let needsInspection = false;
  for (const s of services) {
    const p = repairPrice(s, tier);
    if (p === null) needsInspection = true;
    else total += p;
  }
  return { total, needsInspection };
}

export function formatDuration(minutes: number): string {
  if (minutes >= 1440) return `${Math.round(minutes / 1440)} day${minutes >= 2880 ? "s" : ""}`;
  if (minutes >= 60) return `${Math.round((minutes / 60) * 10) / 10} hr`;
  return `${minutes} min`;
}
