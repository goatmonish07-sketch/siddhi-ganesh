"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ConditionQuestion, PhoneModel } from "@/lib/types";
import { computeQuote, optionImpact, type Answers } from "@/lib/pricing";
import { formatINR } from "@/lib/shop";
import { sellMessage, waLink } from "@/lib/whatsapp";
import { ContactFields, SuccessPanel, contactError, contactPayload, emptyContact, Spinner, useSubmitRequest } from "./booking";
import { Icon } from "./Icon";
import { MobileActionBar } from "./MobileActionBar";
import { PhoneArt } from "./PhoneArt";

function Impact({ value }: { value: number }) {
  if (value === 0) return <span className="text-label-md text-on-surface-variant tnum">₹0</span>;
  return (
    <span className={`text-label-md tnum ${value < 0 ? "text-error" : "text-success"}`}>
      {value < 0 ? "−" : "+"}
      {formatINR(Math.abs(value))}
    </span>
  );
}

export function SellQuote({ brandName, model, questions }: { brandName: string; model: PhoneModel; questions: ConditionQuestion[] }) {
  const [variantIdx, setVariantIdx] = useState<number | null>(model.variants.length === 1 ? 0 : null);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState(emptyContact);
  const { submit, pending, error, setError, result } = useSubmitRequest();

  const variant = variantIdx === null ? null : model.variants[variantIdx];
  const maxPrice = Math.max(...model.variants.map((v) => v.basePrice));
  const quote = useMemo(() => (variant ? computeQuote(variant.basePrice, questions, answers) : null), [variant, questions, answers]);
  const answeredCount = questions.filter((q) => q.kind === "multi" || answers[q.key]?.length).length;
  const device = `${brandName} ${model.name}${variant ? ` (${variant.label})` : ""}`;

  const conditionSummary = questions.flatMap((q) =>
    q.options.filter((o) => answers[q.key]?.includes(o.key)).map((o) => o.label),
  );

  function pick(q: ConditionQuestion, key: string) {
    setAnswers((prev) => {
      const cur = prev[q.key] ?? [];
      if (q.kind === "single") return { ...prev, [q.key]: [key] };
      return { ...prev, [q.key]: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key] };
    });
  }

  const [waUrl, setWaUrl] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!variant || !quote) return setError("Please choose your storage variant");
    if (!quote.complete) return setError("Please answer all the condition questions");
    const cErr = contactError(contact);
    if (cErr) return setError(cErr);
    const c = contactPayload(contact);
    const res = await submit({
      kind: "sell",
      ...c,
      brand: brandName,
      model: model.name,
      variant: variant.label,
      answers,
      quote: quote.total,
    });
    if (res) {
      setWaUrl(waLink(sellMessage({ ...c, id: res.id, device, quote: quote.total, condition: conditionSummary })));
    }
  }

  const steps = [
    { label: "Brand", short: "Brand", value: brandName, done: true },
    { label: "Model", short: "Model", value: model.name, done: true },
    { label: "Variant", short: "Storage", value: variant?.label ?? "Choose", done: !!variant },
    { label: "Condition quiz", short: "Quiz", value: `${answeredCount}/${questions.length}`, done: !!quote?.complete },
    { label: "Cash & payout", short: "Book", value: result ? "Booked" : "Pending", done: !!result },
  ];
  const progress = steps.filter((s) => s.done).length / steps.length;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {!result && (
        <MobileActionBar
          label={quote?.complete ? "Your buyback value" : variant ? `Estimate · ${answeredCount}/${questions.length} answered` : "Sell up to"}
          value={formatINR(quote?.total ?? maxPrice)}
          cta={quote?.complete ? "Book" : "Summary"}
          target="booking"
        />
      )}
      {/* Stepper */}
      <div className="rounded-2xl bg-white border border-hairline p-3 shadow-card">
        <ol className="grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((s, i) => (
            <li key={s.label} aria-current={!s.done && steps.slice(0, i).every((x) => x.done) ? "step" : undefined} className={`rounded-lg p-1.5 sm:p-2 ${s.done ? "bg-surface-container" : "bg-surface-container-low"}`}>
              <div className="flex items-center gap-1.5">
                <span className={`grid place-items-center w-5 h-5 rounded-full text-label-sm shrink-0 ${s.done ? "bg-primary-container text-white" : "bg-white text-on-surface-variant border border-hairline"}`}>
                  {s.done ? <Icon name="check" className="text-[14px]" /> : i + 1}
                </span>
                <span className="hidden sm:block text-label-sm uppercase text-on-surface-variant">Step {i + 1}</span>
              </div>
              <div className="text-label-md text-primary mt-1 truncate"><span className="sm:hidden">{s.short}</span><span className="hidden sm:inline">{s.label}</span></div>
              <div className="hidden sm:block text-body-sm text-on-surface-variant truncate">{s.value}</div>
            </li>
          ))}
        </ol>
        <div className="h-1.5 mt-3 rounded-full bg-surface-container overflow-hidden">
          <div className="h-full bg-primary-container transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-4">
          {/* Device + variant */}
          <section className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
            <div className="flex gap-4 items-start">
              <div className="w-20 h-24 shrink-0 rounded-xl bg-[#f9f7f4] grid place-items-center">
                <PhoneArt tint="#163a24" className="h-20" cameras={model.brandSlug === "apple" ? 2 : 3} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h1 className="text-headline-md text-primary">{brandName} {model.name}</h1>
                    <p className="text-body-sm text-on-surface-variant">Launched {model.year}</p>
                  </div>
                  <Link href={`/sell/${model.brandSlug}`} className="inline-flex items-center min-h-11 gap-1 rounded-lg bg-surface-container px-3 text-label-md text-primary">
                    <Icon name="swap_horiz" className="text-[16px]" /> Change model
                  </Link>
                </div>
                <div className="mt-2 text-label-sm uppercase text-secondary">
                  Highest buyback: <span className="text-primary text-label-lg tnum">{formatINR(variant?.basePrice ?? maxPrice)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-label-lg text-primary mb-2">Choose storage variant</div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Variant">
                {model.variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    role="radio"
                    aria-checked={variantIdx === i}
                    onClick={() => setVariantIdx(i)}
                    className={`min-h-12 rounded-full px-4 py-2 text-label-lg border transition ${
                      variantIdx === i ? "bg-primary-container text-white border-primary-container" : "bg-white border-hairline text-primary hover:border-primary-container"
                    }`}
                  >
                    {v.label}
                    <span className={`ml-2 text-body-sm tnum ${variantIdx === i ? "text-gold" : "text-on-surface-variant"}`}>up to {formatINR(v.basePrice)}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Quiz */}
          <fieldset disabled={!variant} className={`space-y-4 ${variant ? "" : "opacity-50"}`}>
            {questions.map((q, qi) => (
              <section key={q.key} className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h2 className="flex items-center gap-2 text-headline-sm text-primary">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-primary-container text-white text-label-md">{qi + 1}</span>
                    {q.title}
                  </h2>
                  {q.badge && <span className="px-2 py-0.5 rounded-full bg-surface-container text-label-sm text-primary">{q.badge}</span>}
                </div>
                <p className="text-body-sm text-on-surface-variant mb-3">{q.subtitle}</p>
                <div className={`grid gap-2 ${q.options.length > 3 ? "sm:grid-cols-2" : q.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {q.options.map((o) => {
                    const active = answers[q.key]?.includes(o.key) ?? false;
                    return (
                      <button
                        key={o.key}
                        type="button"
                        role={q.kind === "single" ? "radio" : "checkbox"}
                        aria-checked={active}
                        onClick={() => pick(q, o.key)}
                        className={`min-h-14 text-left rounded-xl border p-3 flex items-start gap-3 transition-colors duration-150 ${
                          active ? "border-primary-container ring-2 ring-primary-container bg-[#f1f6f3]" : "border-hairline hover:bg-surface-container-low"
                        }`}
                      >
                        {o.icon && <Icon name={o.icon} className={`text-[20px] ${active ? "text-primary" : "text-on-surface-variant"}`} />}
                        <span className="flex-1 min-w-0">
                          <span className="block text-label-lg text-primary">{o.label}</span>
                          {o.hint && <span className="block text-body-sm text-on-surface-variant">{o.hint}</span>}
                        </span>
                        {variant && <Impact value={optionImpact(variant.basePrice, o)} />}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </fieldset>
        </div>

        {/* Summary + booking */}
        <aside className="lg:sticky lg:top-32 space-y-4">
          <form id="booking" onSubmit={onSubmit} className="rounded-2xl bg-white border border-hairline p-5 shadow-lift space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-label-sm uppercase tracking-widest text-secondary">{quote?.complete ? "Your buyback value" : "Estimated value"}</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-label-sm text-on-secondary-fixed">7-day price lock</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[40px] leading-none font-extrabold text-primary tnum">{formatINR(quote?.total ?? maxPrice)}</span>
              <span className="text-body-sm text-on-surface-variant">{quote ? "cash / UPI" : "max"}</span>
            </div>
            {quote && (
              <dl className="rounded-xl bg-surface-container-low p-3 space-y-1.5 text-body-sm tnum">
                <div className="flex justify-between"><dt>Base value ({variant?.label})</dt><dd>{formatINR(quote.base)}</dd></div>
                {quote.lines.map((l) => (
                  <div key={l.label} className="flex justify-between gap-2">
                    <dt className="text-on-surface-variant">{l.label}</dt>
                    <dd className={l.amount < 0 ? "text-error" : "text-success"}>{l.amount < 0 ? "−" : "+"}{formatINR(Math.abs(l.amount))}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-hairline pt-1.5 text-label-lg text-primary"><dt>Offer (rounded)</dt><dd>{formatINR(quote.total)}</dd></div>
              </dl>
            )}
            {!quote?.complete && (
              <p className="text-body-sm text-on-surface-variant flex gap-1">
                <Icon name="info" className="text-[16px]" />
                {variant ? "Answer all condition questions to lock your quote." : "Choose your storage variant to start."}
              </p>
            )}

            {result && waUrl ? (
              <SuccessPanel id={result.id} whatsappUrl={waUrl} title="Quote locked!" />
            ) : (
              <>
                <div className="text-headline-sm text-primary">Schedule pickup / shop visit</div>
                <ContactFields value={contact} onChange={setContact} />
                {error && <p className="text-body-sm text-error" role="alert">{error}</p>}
                <button
                  disabled={pending || !quote?.complete}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-container py-3 text-white text-label-lg hover:bg-primary disabled:opacity-50"
                >
                  {pending ? <Spinner /> : <Icon name="lock" className="text-[18px]" />}
                  {pending ? "Locking…" : "Lock quote & book"}
                </button>
                <p className="text-body-sm text-on-surface-variant text-center">Final price confirmed after a 5-minute check at pickup/shop.</p>
              </>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}
