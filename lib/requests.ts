import { z } from "zod";
import type { RequestKind } from "./types";

const phone = z
  .string()
  .transform((v) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"));

const contact = {
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
};

const visit = {
  mode: z.enum(["shop", "pickup"]),
  address: z.string().trim().max(300).optional(),
  day: z.string().max(40).optional(),
  slot: z.string().max(40).optional(),
};

export const sellRequestSchema = z.object({
  kind: z.literal("sell"),
  ...contact,
  ...visit,
  brand: z.string().max(60),
  model: z.string().max(100),
  variant: z.string().max(60),
  answers: z.record(z.string(), z.array(z.string())),
  quote: z.number().int().nonnegative(),
});

export const repairRequestSchema = z.object({
  kind: z.literal("repair"),
  ...contact,
  ...visit,
  brand: z.string().max(60),
  model: z.string().max(100),
  services: z.array(z.string().max(40)).min(1, "Pick at least one issue"),
  estimate: z.number().int().nonnegative().nullable(),
  notes: z.string().max(500).optional(),
});

export const buyRequestSchema = z.object({
  kind: z.literal("buy"),
  ...contact,
  productId: z.string().max(40),
  product: z.string().max(120),
  price: z.number().int().nonnegative(),
  note: z.string().max(300).optional(),
});

export const requestSchema = z.discriminatedUnion("kind", [sellRequestSchema, repairRequestSchema, buyRequestSchema]);
export type RequestInput = z.input<typeof requestSchema>;
export type RequestPayload = z.output<typeof requestSchema>;

const PREFIX: Record<RequestKind, string> = { sell: "SELL", repair: "REP", buy: "BUY" };

export function newRequestId(kind: RequestKind): string {
  const n = Math.floor(Math.random() * 36 ** 5)
    .toString(36)
    .toUpperCase()
    .padStart(5, "0");
  return `SSG-${PREFIX[kind]}-${n}`;
}

export function kindFromId(id: string): RequestKind | null {
  const m = /^SSG-(SELL|REP|BUY)-[0-9A-Z]{5}$/.exec(id.trim().toUpperCase());
  if (!m) return null;
  return m[1] === "SELL" ? "sell" : m[1] === "REP" ? "repair" : "buy";
}
