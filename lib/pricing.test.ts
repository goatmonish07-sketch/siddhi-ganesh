import { describe, expect, it } from "vitest";
import { CONDITION_QUESTIONS } from "./catalog";
import { MIN_QUOTE, computeQuote, isComplete, optionImpact, roundDown50 } from "./pricing";

const perfect = { power: ["working"], screen: ["flawless"], body: ["like_new"], faults: [], accessories: [], age: ["3_to_11"] };

describe("computeQuote", () => {
  it("returns the full base price for a flawless phone", () => {
    const q = computeQuote(38500, CONDITION_QUESTIONS, perfect);
    expect(q.total).toBe(38500);
    expect(q.lines).toEqual([]);
    expect(q.complete).toBe(true);
  });

  it("applies percentage deductions and bonuses from the base price", () => {
    const q = computeQuote(20000, CONDITION_QUESTIONS, { ...perfect, screen: ["scratches"], accessories: ["box", "bill"] });
    // -3% (600) +1.5% (300) +1.5% (300)
    expect(q.total).toBe(20000);
    expect(q.lines.map((l) => l.amount)).toEqual([-600, 300, 300]);
  });

  it("stacks multiple faults", () => {
    const q = computeQuote(10000, CONDITION_QUESTIONS, { ...perfect, faults: ["camera", "battery"] });
    expect(q.total).toBe(9300);
  });

  it("applies the dead-phone multiplier after deductions", () => {
    const q = computeQuote(10000, CONDITION_QUESTIONS, { ...perfect, power: ["dead"], screen: ["cracked"] });
    // (10000 - 1600) * 0.4 = 3360 → 3350
    expect(q.total).toBe(3350);
    expect(q.lines.at(-1)).toEqual({ label: "Device not working", amount: -5040 });
  });

  it("rounds down to ₹50 and never goes below the minimum", () => {
    expect(roundDown50(3399)).toBe(3350);
    const q = computeQuote(500, CONDITION_QUESTIONS, { ...perfect, power: ["dead"], screen: ["cracked"], body: ["dented"] });
    expect(q.total).toBe(MIN_QUOTE);
  });

  it("is incomplete until every single-choice question is answered", () => {
    expect(isComplete(CONDITION_QUESTIONS, {})).toBe(false);
    expect(isComplete(CONDITION_QUESTIONS, { ...perfect, faults: undefined as unknown as string[] })).toBe(true);
    expect(computeQuote(10000, CONDITION_QUESTIONS, {}).total).toBe(10000);
  });

  it("shows option impact in rupees", () => {
    expect(optionImpact(38500, { multiplier: 0.4 })).toBe(-23100);
    expect(optionImpact(38500, { pct: -0.03 })).toBe(-1155);
    expect(optionImpact(38500, {})).toBe(0);
  });
});
