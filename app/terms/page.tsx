import type { Metadata } from "next";
import { Container } from "@/components/Section";

export const metadata: Metadata = { title: "Terms & Warranty" };

export default function TermsPage() {
  return (
    <Container className="py-10 max-w-3xl space-y-4 text-body-lg text-on-surface-variant">
      <h1 className="text-headline-lg text-primary">Terms &amp; Warranty</h1>
      <h2 className="text-headline-sm text-primary">Selling your phone</h2>
      <p>Online quotes are estimates based on your answers and are valid for 7 days. The final price is confirmed after a physical check. A valid ID proof is required, and the phone must not be stolen, blacklisted or under finance.</p>
      <h2 className="text-headline-sm text-primary">Repairs</h2>
      <p>Prices shown are starting estimates; the exact price is confirmed after diagnosis and before any work begins. Warranty covers the replaced part against manufacturing defects only — physical, liquid or tampering damage is not covered. Keep your bill for warranty claims.</p>
      <h2 className="text-headline-sm text-primary">Second-hand phones</h2>
      <p>Reservations are held for 24 hours without advance payment. Shop warranty periods are listed on each phone and cover hardware faults not caused by misuse. Hardware issues reported within 7 days are eligible for replacement.</p>
    </Container>
  );
}
