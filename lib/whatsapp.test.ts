import { describe, expect, it } from "vitest";
import { buyMessage, repairMessage, sellMessage, waLink } from "./whatsapp";

describe("whatsapp", () => {
  it("builds a wa.me link with encoded text", () => {
    expect(waLink()).toBe("https://wa.me/919677048747");
    expect(waLink("Hi & bye")).toBe("https://wa.me/919677048747?text=Hi%20%26%20bye");
  });

  it("includes quote, visit and request id in the sell message", () => {
    const msg = sellMessage({ id: "SSG-SELL-ABCDE", device: "Apple iPhone 13 (128 GB)", quote: 25500, condition: ["Minor scratches"], name: "Selva", phone: "9840123456", mode: "pickup", address: "12 Gandhi Rd", day: "Today", slot: "2 PM – 5 PM" });
    expect(msg).toContain("iPhone 13 (128 GB)");
    expect(msg).toContain("₹25,500");
    expect(msg).toContain("Doorstep pickup at 12 Gandhi Rd (Today, 2 PM – 5 PM)");
    expect(msg).toContain("SSG-SELL-ABCDE");
  });

  it("marks repairs that need inspection", () => {
    const msg = repairMessage({ id: "SSG-REP-ABCDE", device: "Vivo V29", services: ["Dead phone / motherboard"], estimate: null, name: "A", phone: "9", mode: "shop" });
    expect(msg).toContain("after inspection");
    expect(msg).toContain("Shop visit");
  });

  it("builds the reservation message", () => {
    expect(buyMessage({ id: "SSG-BUY-ABCDE", product: "Poco F6", price: 17000, name: "A", phone: "9" })).toContain("₹17,000");
  });
});
