import { Icon } from "./Icon";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((f) => (
        <details key={f.q} className="group rounded-xl bg-white border border-hairline shadow-card">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-label-lg text-primary [&::-webkit-details-marker]:hidden">
            {f.q}
            <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-4 pb-4 text-body-md text-on-surface-variant">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
