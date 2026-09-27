"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { inputCls, isStaticSite, labelCls } from "./booking";
import { waLink } from "@/lib/whatsapp";

const STATUS_LABEL: Record<string, string> = {
  new: "Received — we'll confirm shortly",
  confirmed: "Confirmed",
  in_progress: "In progress",
  ready: "Ready for pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};
const STEPS = ["new", "confirmed", "in_progress", "completed"];

interface Found { id: string; status: string; summary: string; createdAt: string }

export function TrackForm() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState<Found | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setFound(null);
    try {
      const res = await fetch(`/api/requests?${new URLSearchParams({ id, phone })}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFound(data);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  if (isStaticSite) {
    return (
      <div className="rounded-2xl bg-white border border-hairline p-5 shadow-card space-y-3">
        <p className="text-body-lg text-on-surface-variant">Send us your request ID on WhatsApp and we&apos;ll reply with the latest status of your sale, repair or reservation.</p>
        <a
          href={waLink("Hi, please share the status of my request. ID: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-whatsapp px-5 text-on-surface text-label-lg"
        >
          <Icon name="chat" /> Check status on WhatsApp
        </a>
      </div>
    );
  }

  const stepIdx = found ? STEPS.indexOf(found.status === "ready" ? "in_progress" : found.status) : -1;

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-hairline p-5 shadow-card grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
        <div>
          <label className={labelCls} htmlFor="t-id">Request ID</label>
          <input id="t-id" className={`${inputCls} uppercase`} value={id} onChange={(e) => setId(e.target.value)} placeholder="SSG-SELL-4K2QZ" required />
        </div>
        <div>
          <label className={labelCls} htmlFor="t-phone">Mobile number</label>
          <input id="t-phone" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" inputMode="numeric" required />
        </div>
        <button disabled={pending} className="rounded-lg bg-primary-container px-5 py-2.5 text-white text-label-lg hover:bg-primary disabled:opacity-50">
          {pending ? "Checking…" : "Track"}
        </button>
      </form>
      {error && <p className="text-body-md text-error" role="alert">{error}</p>}
      {found && (
        <div className="rounded-2xl bg-white border border-hairline p-5 shadow-card space-y-4" role="status">
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <div className="text-label-sm uppercase text-secondary">{found.id}</div>
              <div className="text-headline-sm text-primary">{found.summary}</div>
              <div className="text-body-sm text-on-surface-variant">Booked {new Date(found.createdAt).toLocaleString("en-IN")}</div>
            </div>
            <span className="h-fit px-3 py-1 rounded-full bg-surface-container text-label-md text-primary">{STATUS_LABEL[found.status] ?? found.status}</span>
          </div>
          {found.status !== "cancelled" && (
            <ol className="grid grid-cols-4 gap-2">
              {STEPS.map((s, i) => (
                <li key={s} className="text-center">
                  <div className={`h-1.5 rounded-full ${i <= stepIdx ? "bg-primary-container" : "bg-surface-container"}`} />
                  <div className="mt-1 text-body-sm text-on-surface-variant flex items-center justify-center gap-1">
                    {i <= stepIdx && <Icon name="check" className="text-[14px] text-primary" />}
                    {s === "new" ? "Received" : s === "in_progress" ? "In progress" : s[0].toUpperCase() + s.slice(1)}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
