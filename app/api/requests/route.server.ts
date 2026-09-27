import { NextResponse } from "next/server";
import { kindFromId, newRequestId, requestSchema, type RequestPayload } from "@/lib/requests";
import { serviceClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/shop";

function summarize(p: RequestPayload): { summary: string; amount: number | null } {
  switch (p.kind) {
    case "sell":
      return { summary: `Sell ${p.model} (${p.variant}) — quote ${formatINR(p.quote)}`, amount: p.quote };
    case "repair":
      return { summary: `Repair ${p.model}: ${p.services.join(", ")}`, amount: p.estimate };
    case "buy":
      return { summary: `Reserve ${p.product} at ${formatINR(p.price)}`, amount: p.price };
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const payload = parsed.data;
  const id = newRequestId(payload.kind);
  const { summary, amount } = summarize(payload);

  const db = serviceClient();
  if (!db) {
    // No database yet: the booking still reaches the shop over WhatsApp.
    return NextResponse.json({ id, saved: false });
  }

  const { error } = await db.from("requests").insert({
    id,
    kind: payload.kind,
    name: payload.name,
    phone: payload.phone,
    amount,
    summary,
    payload,
  });
  if (error) {
    console.error("[requests] insert failed", error);
    return NextResponse.json({ id, saved: false });
  }
  return NextResponse.json({ id, saved: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = (url.searchParams.get("id") ?? "").trim().toUpperCase();
  const phone = (url.searchParams.get("phone") ?? "").replace(/\D/g, "").slice(-10);

  if (!kindFromId(id) || phone.length !== 10) {
    return NextResponse.json({ error: "Enter your request ID (e.g. SSG-SELL-4K2QZ) and 10-digit mobile number" }, { status: 400 });
  }

  const db = serviceClient();
  if (!db) {
    return NextResponse.json({ error: "Online tracking isn't available yet — please check with us on WhatsApp." }, { status: 503 });
  }

  const { data, error } = await db
    .from("requests")
    .select("id, kind, status, summary, created_at")
    .eq("id", id)
    .eq("phone", phone)
    .maybeSingle();
  if (error) {
    console.error("[requests] lookup failed", error);
    return NextResponse.json({ error: "Something went wrong, please try again" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "No request found for this ID and mobile number" }, { status: 404 });
  }
  return NextResponse.json({ id: data.id, kind: data.kind, status: data.status, summary: data.summary, createdAt: data.created_at });
}
