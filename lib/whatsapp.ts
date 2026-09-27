import { SHOP, formatINR } from "./shop";

export function waLink(text?: string): string {
  const base = `https://wa.me/${SHOP.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

interface Contact {
  name: string;
  phone: string;
  mode: "shop" | "pickup";
  address?: string;
  day?: string;
  slot?: string;
}

function visitLine(c: Contact): string {
  const when = [c.day, c.slot].filter(Boolean).join(", ");
  const where = c.mode === "pickup" ? `Doorstep pickup${c.address ? ` at ${c.address}` : ""}` : "Shop visit";
  return `${where}${when ? ` (${when})` : ""}`;
}

export function sellMessage(p: Contact & { id: string; device: string; quote: number; condition: string[] }): string {
  return [
    `Hi ${SHOP.owner}, I want to sell my ${p.device}.`,
    `Estimated quote: ${formatINR(p.quote)}`,
    p.condition.length ? `Condition: ${p.condition.join(", ")}` : null,
    visitLine(p),
    `Name: ${p.name} · Phone: ${p.phone}`,
    `Request ID: ${p.id}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function repairMessage(p: Contact & { id: string; device: string; services: string[]; estimate: number | null }): string {
  return [
    `Hi ${SHOP.owner}, I want to book a repair for my ${p.device}.`,
    `Issues: ${p.services.join(", ")}`,
    p.estimate ? `Estimated: ${formatINR(p.estimate)}` : "Estimate: after inspection",
    visitLine(p),
    `Name: ${p.name} · Phone: ${p.phone}`,
    `Request ID: ${p.id}`,
  ].join("\n");
}

export function buyMessage(p: { id: string; product: string; price: number; name: string; phone: string; note?: string }): string {
  return [
    `Hi ${SHOP.owner}, I'd like to reserve the ${p.product} listed at ${formatINR(p.price)}.`,
    p.note ? `Note: ${p.note}` : null,
    `Name: ${p.name} · Phone: ${p.phone}`,
    `Request ID: ${p.id}`,
  ]
    .filter(Boolean)
    .join("\n");
}
