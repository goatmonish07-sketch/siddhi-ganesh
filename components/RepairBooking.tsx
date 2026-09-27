"use client";

import { useEffect, useMemo, useState } from "react";
import type { Brand, PhoneModel, RepairService } from "@/lib/types";
import { formatDuration, repairEstimate, repairPrice, startingPrice } from "@/lib/repair";
import { formatINR } from "@/lib/shop";
import { repairMessage, waLink } from "@/lib/whatsapp";
import { ContactFields, SuccessPanel, contactError, contactPayload, emptyContact, inputCls, labelCls, Spinner, useSubmitRequest } from "./booking";
import { Icon } from "./Icon";
import { MobileActionBar } from "./MobileActionBar";

const OTHER = "__other";

export function RepairBooking({
  brands,
  models,
  services,
}: {
  brands: Brand[];
  models: PhoneModel[];
  services: RepairService[];
}) {
  const [brandSlug, setBrandSlug] = useState(brands[0]?.slug ?? "");
  const brandModels = models.filter((m) => m.brandSlug === brandSlug);
  const [modelSlug, setModelSlug] = useState(brandModels[0]?.slug ?? OTHER);
  const [otherModel, setOtherModel] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  // Preselect the issue from links like /repair?service=display (read client-side so the page stays static).
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("service");
    if (key && services.some((s) => s.key === key)) setPicked((p) => (p.includes(key) ? p : [...p, key]));
  }, [services]);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState(emptyContact);
  const [waUrl, setWaUrl] = useState("");
  const { submit, pending, error, setError, result } = useSubmitRequest();

  const model = models.find((m) => m.brandSlug === brandSlug && m.slug === modelSlug);
  const brandName = brands.find((b) => b.slug === brandSlug)?.name ?? "";
  const deviceName = model ? `${brandName} ${model.name}` : `${brandName} ${otherModel}`.trim();
  const pickedServices = services.filter((s) => picked.includes(s.key));
  const estimate = useMemo(() => (model ? repairEstimate(pickedServices, model.tier) : null), [model, pickedServices]);
  const minutes = pickedServices.reduce((a, s) => Math.max(a, s.minutes), 0);

  function chooseBrand(slug: string) {
    setBrandSlug(slug);
    setModelSlug(models.find((m) => m.brandSlug === slug)?.slug ?? OTHER);
  }

  function toggle(key: string) {
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));
  }

  const estimateTotal = estimate && !estimate.needsInspection && estimate.total > 0 ? estimate.total : null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!model && otherModel.trim().length < 2) return setError("Please type your phone model");
    if (!pickedServices.length) return setError("Please select at least one issue");
    const cErr = contactError(contact);
    if (cErr) return setError(cErr);
    const c = contactPayload(contact);
    const res = await submit({
      kind: "repair",
      ...c,
      brand: brandName,
      model: model?.name ?? otherModel.trim(),
      services: pickedServices.map((s) => s.name),
      estimate: estimateTotal,
      notes: notes.trim() || undefined,
    });
    if (res) {
      setWaUrl(
        waLink(
          repairMessage({ ...c, id: res.id, device: deviceName, services: pickedServices.map((s) => s.name), estimate: estimateTotal }) +
            (notes.trim() ? `\nNote: ${notes.trim()}` : ""),
        ),
      );
    }
  }

  const barValue = estimateTotal
    ? formatINR(estimateTotal)
    : pickedServices.length
      ? estimate?.total
        ? `${formatINR(estimate.total)}+`
        : "On inspection"
      : "₹0";

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start pb-20 lg:pb-0">
      {!result && (
        <MobileActionBar
          label={pickedServices.length ? `${pickedServices.length} issue${pickedServices.length > 1 ? "s" : ""} · pay after repair` : "Select an issue"}
          value={barValue}
          cta="Book"
          target="booking"
        />
      )}
      <div className="space-y-6">
        <section className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-headline-sm text-primary mb-3">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-primary-container text-white text-label-md">1</span>
            Select your device
          </h2>
          <div className="flex flex-wrap gap-2 mb-4" role="radiogroup" aria-label="Brand">
            {brands.map((b) => (
              <button
                key={b.slug}
                type="button"
                role="radio"
                aria-checked={brandSlug === b.slug}
                onClick={() => chooseBrand(b.slug)}
                className={`min-h-11 rounded-full px-4 py-2 text-label-md border transition-colors ${
                  brandSlug === b.slug ? "bg-primary-container text-white border-primary-container" : "bg-white border-hairline text-primary hover:border-primary-container"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="r-model">Model</label>
              <select id="r-model" className={inputCls} value={modelSlug} onChange={(e) => setModelSlug(e.target.value)}>
                {brandModels.map((m) => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
                <option value={OTHER}>My model isn&apos;t listed</option>
              </select>
            </div>
            {modelSlug === OTHER && (
              <div>
                <label className={labelCls} htmlFor="r-other">Type your model</label>
                <input id="r-other" className={inputCls} value={otherModel} onChange={(e) => setOtherModel(e.target.value)} placeholder="e.g. Galaxy A14" />
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-hairline p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="flex items-center gap-2 text-headline-sm text-primary">
              <span className="grid place-items-center w-6 h-6 rounded-full bg-primary-container text-white text-label-md">2</span>
              Select service or issue
            </h2>
            <span className="text-body-sm text-on-surface-variant">Tap all that apply</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => {
              const active = picked.includes(s.key);
              const price = model ? repairPrice(s, model.tier) : startingPrice(s);
              return (
                <button
                  key={s.key}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  onClick={() => toggle(s.key)}
                  className={`text-left rounded-xl border p-4 transition-colors duration-150 flex flex-col gap-2 ${
                    active ? "border-primary-container ring-2 ring-primary-container bg-[#f1f6f3]" : "border-hairline hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center w-9 h-9 rounded-lg bg-surface-container text-primary shrink-0">
                      <Icon name={s.icon} className="text-[20px]" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-label-lg text-primary">{s.name}</span>
                      <span className="block text-body-sm text-on-surface-variant">{s.description}</span>
                    </span>
                    <Icon name={active ? "check_circle" : "radio_button_unchecked"} fill={active} className={active ? "text-primary" : "text-outline-variant"} />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-label-sm text-on-surface-variant">{s.badge}</span>
                    <span className="text-right">
                      <span className="block text-body-sm text-on-surface-variant">{price === null ? "Diagnosis" : model ? "Estimated" : "From"}</span>
                      <span className="text-label-lg text-primary tnum">{price === null ? "After inspection" : formatINR(price)}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <label className={labelCls} htmlFor="r-notes">Describe the problem (optional)</label>
            <textarea id="r-notes" rows={2} className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. fell in water yesterday, screen flickers" />
          </div>
          <div className="mt-4 rounded-xl bg-surface-container p-3 flex gap-2 text-body-sm text-primary">
            <Icon name="verified_user" className="text-secondary" />
            <span>
              <strong>Free initial diagnosis.</strong> We inspect your phone in front of you. If you choose not to repair, you pay nothing.
            </span>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-32">
        <form id="booking" onSubmit={onSubmit} className="rounded-2xl bg-white border border-hairline p-5 shadow-lift space-y-4">
          <div>
            <div className="text-label-sm uppercase tracking-widest text-secondary">Direct shop valuation</div>
            <div className="text-headline-sm text-primary">Booking summary</div>
          </div>
          <div className="rounded-xl bg-surface-container-low p-3 flex items-center gap-3">
            <Icon name="smartphone" className="text-primary" />
            <div>
              <div className="text-body-sm text-on-surface-variant">Device</div>
              <div className="text-label-lg text-primary">{deviceName || "Choose model"}</div>
            </div>
          </div>
          {pickedServices.length > 0 ? (
            <ul className="space-y-1.5 text-body-sm tnum">
              {pickedServices.map((s) => {
                const p = model ? repairPrice(s, model.tier) : null;
                return (
                  <li key={s.key} className="flex justify-between gap-2">
                    <span className="flex items-center gap-1"><Icon name="check_circle" className="text-[14px] text-success" /> {s.name}</span>
                    <span>{p === null ? "On inspection" : formatINR(p)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-body-sm text-on-surface-variant">No issue selected yet.</p>
          )}
          <div className="rounded-xl bg-surface-container-low border border-hairline p-4 flex items-center justify-between">
            <div>
              <div className="text-body-sm text-muted">Estimated time</div>
              <div className="text-label-lg">{minutes ? formatDuration(minutes) : "—"}</div>
            </div>
            <div className="text-right">
              <div className="text-body-sm text-muted">Pay after repair</div>
              <div className="font-display text-headline-md tnum">
                {barValue}
              </div>
            </div>
          </div>

          {result && waUrl ? (
            <SuccessPanel id={result.id} whatsappUrl={waUrl} title="Repair booked!" />
          ) : (
            <>
              <ContactFields value={contact} onChange={setContact} />
              {error && <p className="text-body-sm text-error" role="alert">{error}</p>}
              <button disabled={pending} className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-container py-3 text-white text-label-lg hover:bg-primary disabled:opacity-50">
                {pending ? <Spinner /> : <Icon name="build" className="text-[18px]" />} {pending ? "Booking…" : "Book repair"}
              </button>
              <p className="text-body-sm text-on-surface-variant text-center">Zero advance. Pay by cash or UPI after the repair.</p>
            </>
          )}
        </form>
      </aside>
    </div>
  );
}
