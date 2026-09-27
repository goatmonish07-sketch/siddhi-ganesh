import type { ConditionQuestion } from "./types";

export type Answers = Record<string, string[]>;

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface Quote {
  base: number;
  lines: QuoteLine[];
  total: number;
  complete: boolean;
}

export const MIN_QUOTE = 300;

/** Rounds down to the nearest ₹50 so the offer never overshoots. */
export function roundDown50(value: number): number {
  return Math.floor(value / 50) * 50;
}

export function isComplete(questions: ConditionQuestion[], answers: Answers): boolean {
  return questions.every((q) => q.kind === "multi" || (answers[q.key]?.length ?? 0) > 0);
}

/**
 * quote = (base + Σ pct·base) × Π multipliers, rounded down to ₹50, never below MIN_QUOTE.
 * Unanswered questions have no effect, so the running total starts at the maximum price.
 */
export function computeQuote(base: number, questions: ConditionQuestion[], answers: Answers): Quote {
  const lines: QuoteLine[] = [];
  let subtotal = base;
  let multiplier = 1;

  for (const q of questions) {
    const picked = answers[q.key] ?? [];
    for (const opt of q.options) {
      if (!picked.includes(opt.key)) continue;
      if (opt.pct) {
        const amount = Math.round(base * opt.pct);
        subtotal += amount;
        lines.push({ label: opt.label, amount });
      }
      if (opt.multiplier !== undefined) multiplier *= opt.multiplier;
    }
  }

  if (multiplier !== 1) {
    lines.push({ label: "Device not working", amount: Math.round(subtotal * multiplier - subtotal) });
  }

  const total = Math.max(MIN_QUOTE, roundDown50(subtotal * multiplier));
  return { base, lines, total, complete: isComplete(questions, answers) };
}

/** Rupee impact of a single option, as shown next to each choice in the quiz. */
export function optionImpact(base: number, opt: { pct?: number; multiplier?: number }): number {
  if (opt.multiplier !== undefined) return Math.round(base * (opt.multiplier - 1));
  return Math.round(base * (opt.pct ?? 0));
}
