"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { formatINR } from "@/lib/shop";
import { Icon } from "./Icon";

export interface SearchItem {
  href: string;
  label: string;
  maxPrice: number;
}

/** Cashify-style "search your phone" box with a live suggestion list. */
export function HeroSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const listId = useId();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const needle = q.trim().toLowerCase();
  const results = needle ? items.filter((i) => i.label.toLowerCase().includes(needle)).slice(0, 6) : [];
  const open = results.length > 0;

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const hit = results[active] ?? results[0];
          router.push(hit ? hit.href : "/sell");
        }}
        className="flex items-center gap-2 rounded-2xl border border-hairline bg-white p-1.5 pl-4 shadow-lift focus-within:border-on-surface/30"
      >
        <Icon name="search" className="text-muted" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
          }}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-on-surface placeholder:text-muted focus:outline-none"
          placeholder="Search your phone, e.g. iPhone 13"
          aria-label="Search your phone model"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
        />
        <button className="min-h-11 rounded-xl bg-primary-container px-4 sm:px-5 text-white text-label-lg hover:bg-primary transition-colors">
          Get price
        </button>
      </form>
      {open && (
        <ul id={listId} role="listbox" className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-hairline bg-white shadow-float">
          {results.map((r, i) => (
            <li key={r.href} role="option" aria-selected={i === active}>
              <Link
                href={r.href}
                className={`flex min-h-12 items-center justify-between gap-3 px-4 text-body-md ${i === active ? "bg-surface-container-low" : ""} hover:bg-surface-container-low`}
              >
                <span className="text-on-surface">{r.label}</span>
                <span className="text-body-sm text-muted tnum">up to {formatINR(r.maxPrice)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
