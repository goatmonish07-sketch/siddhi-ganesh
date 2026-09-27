"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { buyMessage, waLink } from "@/lib/whatsapp";
import { ContactFields, SuccessPanel, contactError, emptyContact, inputCls, labelCls, Spinner, useSubmitRequest } from "./booking";
import { Icon } from "./Icon";

export function ReserveForm({ product }: { product: Product }) {
  const [contact, setContact] = useState(emptyContact);
  const [note, setNote] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const { submit, pending, error, setError, result } = useSubmitRequest();

  if (result && waUrl) return <SuccessPanel id={result.id} whatsappUrl={waUrl} title="Reservation requested!" />;

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const cErr = contactError(contact, false);
        if (cErr) return setError(cErr);
        const productName = `${product.name} (${product.variant}, ${product.color})`;
        const res = await submit({
          kind: "buy",
          name: contact.name.trim(),
          phone: contact.phone,
          productId: product.id,
          product: productName,
          price: product.price,
          note: note.trim() || undefined,
        });
        if (res) {
          setWaUrl(waLink(buyMessage({ id: res.id, product: productName, price: product.price, name: contact.name.trim(), phone: contact.phone, note: note.trim() || undefined })));
        }
      }}
    >
      <ContactFields value={contact} onChange={setContact} withVisit={false} />
      <div>
        <label className={labelCls} htmlFor="r-note">Anything to add? (optional)</label>
        <input id="r-note" className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. I'll visit this evening / want to exchange my old phone" />
      </div>
      {error && <p className="text-body-sm text-error" role="alert">{error}</p>}
      <button disabled={pending} className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-container py-3 text-white text-label-lg hover:bg-primary disabled:opacity-50">
        {pending ? <Spinner /> : <Icon name="bookmark_added" className="text-[18px]" />} {pending ? "Reserving…" : "Reserve & pay at shop"}
      </button>
      <p className="text-body-sm text-on-surface-variant text-center">No advance needed. We hold the phone for 24 hours.</p>
    </form>
  );
}
