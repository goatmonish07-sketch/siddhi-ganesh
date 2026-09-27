import { describe, expect, it } from "vitest";
import { kindFromId, newRequestId, requestSchema } from "./requests";

describe("requests", () => {
  it("generates ids that round-trip to their kind", () => {
    for (const kind of ["sell", "repair", "buy"] as const) {
      const id = newRequestId(kind);
      expect(id).toMatch(/^SSG-(SELL|REP|BUY)-[0-9A-Z]{5}$/);
      expect(kindFromId(id)).toBe(kind);
    }
    expect(kindFromId("nope")).toBeNull();
  });

  it("normalises Indian mobile numbers", () => {
    const r = requestSchema.parse({ kind: "buy", name: "Selva", phone: "+91 98401-23456", productId: "x", product: "y", price: 1 });
    expect(r.phone).toBe("9840123456");
  });

  it("rejects bad phone numbers and empty repairs", () => {
    expect(requestSchema.safeParse({ kind: "buy", name: "Selva", phone: "12345", productId: "x", product: "y", price: 1 }).success).toBe(false);
    expect(
      requestSchema.safeParse({ kind: "repair", name: "Selva", phone: "9840123456", mode: "shop", brand: "a", model: "b", services: [], estimate: null }).success,
    ).toBe(false);
  });
});
