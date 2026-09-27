"use client";

import { useState } from "react";
import { newRequestId, requestSchema, type RequestInput } from "@/lib/requests";
import { TIME_SLOTS } from "@/lib/shop";
import { Icon } from "./Icon";

export interface ContactState {
  name: string;
  phone: string;
  mode: "shop" | "pickup";
  address: string;
  day: string;
  slot: string;
}

export const emptyContact: ContactState = { name: "", phone: "", mode: "shop", address: "", day: "Today", slot: TIME_SLOTS[1] };

const DAYS = ["Today", "Tomorrow", "Day after tomorrow"];

export const inputCls =
  "w-full rounded-lg border border-hairline bg-surface-container-low px-3 py-2.5 text-body-md text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-container";
export const labelCls = "block text-label-md text-on-surface-variant mb-1";

export function ContactFields({
  value,
  onChange,
  pickupLabel = "Free doorstep pickup",
  withVisit = true,
}: {
  value: ContactState;
  onChange: (v: ContactState) => void;
  pickupLabel?: string;
  withVisit?: boolean;
}) {
  const set = <K extends keyof ContactState>(k: K, v: ContactState[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls} htmlFor="c-name">Your full name <span aria-hidden="true" className="text-error">*</span></label>
        <input id="c-name" className={inputCls} value={value.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Selva Kumar" autoComplete="name" required />
      </div>
      <div>
        <label className={labelCls} htmlFor="c-phone">Mobile number (WhatsApp) <span aria-hidden="true" className="text-error">*</span></label>
        <div className="flex">
          <span className="grid place-items-center rounded-l-lg border border-r-0 border-hairline bg-surface-container px-3 text-base sm:text-body-md text-on-surface-variant">+91</span>
          <input
            id="c-phone"
            className={`${inputCls} rounded-l-none`}
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="98765 43210"
            inputMode="numeric"
            autoComplete="tel-national"
            required
          />
        </div>
      </div>
      {withVisit && (
        <>
          <div>
            <span className={labelCls}>How would you like to come?</span>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface-container p-1" role="radiogroup">
              {(["shop", "pickup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={value.mode === m}
                  onClick={() => set("mode", m)}
                  className={`min-h-11 rounded-md px-2 py-2 text-label-md transition-colors ${value.mode === m ? "bg-primary-container text-white" : "text-primary hover:bg-surface-container-high"}`}
                >
                  {m === "shop" ? "Shop visit" : pickupLabel}
                </button>
              ))}
            </div>
          </div>
          {value.mode === "pickup" && (
            <div>
              <label className={labelCls} htmlFor="c-address">Pickup address <span aria-hidden="true" className="text-error">*</span></label>
              <textarea id="c-address" rows={2} className={inputCls} value={value.address} onChange={(e) => set("address", e.target.value)} placeholder="Door no, street, area, Cheyyar" required />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelCls} htmlFor="c-day">Preferred day</label>
              <select id="c-day" className={inputCls} value={value.day} onChange={(e) => set("day", e.target.value)}>
                {DAYS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="c-slot">Time slot</label>
              <select id="c-slot" className={inputCls} value={value.slot} onChange={(e) => set("slot", e.target.value)}>
                {TIME_SLOTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Client-side check mirroring the server schema so we can fail fast. */
export function contactError(c: ContactState, withVisit = true): string | null {
  if (c.name.trim().length < 2) return "Please enter your name";
  const digits = c.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) return "Please enter a valid 10-digit mobile number";
  if (withVisit && c.mode === "pickup" && c.address.trim().length < 5) return "Please enter your pickup address";
  return null;
}

export function contactPayload(c: ContactState) {
  return {
    name: c.name.trim(),
    phone: c.phone,
    mode: c.mode,
    address: c.mode === "pickup" ? c.address.trim() : undefined,
    day: c.day,
    slot: c.slot,
  };
}

export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export function useSubmitRequest() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; saved: boolean } | null>(null);

  async function submit(payload: RequestInput) {
    setPending(true);
    setError(null);
    try {
      if (isStaticSite) {
        // Static hosting: no server to save to, so validate here and hand off to WhatsApp.
        const parsed = requestSchema.safeParse(payload);
        if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check your details");
        const data = { id: newRequestId(parsed.data.kind), saved: false };
        setResult(data);
        return data;
      }
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not submit, please try again");
      setResult(data);
      return data as { id: string; saved: boolean };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit, please try again");
      return null;
    } finally {
      setPending(false);
    }
  }

  return { submit, pending, error, setError, result };
}

export function Spinner() {
  return <Icon name="progress" className="text-[18px] animate-spin" />;
}

export function SuccessPanel({ id, whatsappUrl, title }: { id: string; whatsappUrl: string; title: string }) {
  return (
    <div className="rounded-xl bg-surface-container p-4 space-y-3 text-center" role="status">
      <Icon name="task_alt" className="text-[40px] text-success" />
      <div className="font-display text-headline-sm text-primary">{title}</div>
      <p className="text-body-sm text-on-surface-variant">
        Your request ID is <strong className="text-primary tnum">{id}</strong>. Tap below to send the details to us on WhatsApp so we can confirm right away.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-on-surface text-label-lg hover:brightness-95"
      >
        <Icon name="chat" fill /> Send on WhatsApp
      </a>
      <p className="text-body-sm text-on-surface-variant">Save your ID to track status on the Track Order page.</p>
    </div>
  );
}
