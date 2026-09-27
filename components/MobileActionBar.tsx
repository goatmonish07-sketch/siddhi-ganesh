"use client";

import { Icon } from "./Icon";

/**
 * Fixed price + CTA bar for the Sell/Repair flows on < lg, sitting just above the tab bar.
 * Keeps the running total visible while the customer answers questions far from the summary card.
 */
export function MobileActionBar({ label, value, cta, target }: { label: string; value: string; cta: string; target: string }) {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-hairline bg-white/95 backdrop-blur shadow-float">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="min-w-0" aria-live="polite">
          <div className="text-label-sm uppercase text-secondary truncate">{label}</div>
          <div className="font-display text-headline-md text-primary tnum">{value}</div>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary-container px-5 text-white text-label-lg active:scale-[0.98] transition-transform"
        >
          {cta} <Icon name="arrow_downward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
