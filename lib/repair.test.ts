import { describe, expect, it } from "vitest";
import { REPAIR_SERVICES } from "./catalog";
import { formatDuration, repairEstimate, startingPrice } from "./repair";

const byKey = (k: string) => REPAIR_SERVICES.find((s) => s.key === k)!;

describe("repair pricing", () => {
  it("sums tier prices", () => {
    expect(repairEstimate([byKey("display"), byKey("battery")], "budget")).toEqual({ total: 1499 + 899, needsInspection: false });
  });
  it("flags services that need inspection", () => {
    expect(repairEstimate([byKey("motherboard")], "mid").needsInspection).toBe(true);
    expect(startingPrice(byKey("motherboard"))).toBeNull();
    expect(startingPrice(byKey("display"))).toBe(1499);
  });
  it("formats durations", () => {
    expect(formatDuration(30)).toBe("30 min");
    expect(formatDuration(90)).toBe("1.5 hr");
    expect(formatDuration(1440)).toBe("1 day");
  });
});
