"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { inputCls } from "./booking";

export function QuickQuote({ models }: { models: { href: string; label: string }[] }) {
  const router = useRouter();
  const [href, setHref] = useState("");
  return (
    <form
      className="grid gap-3 md:grid-cols-[1fr_2fr_auto] items-end rounded-2xl bg-white border border-hairline p-4 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        if (href) router.push(href);
      }}
    >
      <div>
        <div className="text-label-sm uppercase tracking-widest text-secondary">Try instant estimate</div>
        <div className="text-headline-sm text-primary">What phone are you holding?</div>
      </div>
      <label className="block">
        <span className="sr-only">Select model</span>
        <select className={inputCls} value={href} onChange={(e) => setHref(e.target.value)} required>
          <option value="">Select your model…</option>
          {models.map((m) => (
            <option key={m.href} value={m.href}>{m.label}</option>
          ))}
        </select>
      </label>
      <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container px-5 py-3 text-white text-label-lg hover:bg-primary disabled:opacity-60" disabled={!href}>
        Get spot quote <Icon name="arrow_forward" className="text-[18px]" />
      </button>
    </form>
  );
}
