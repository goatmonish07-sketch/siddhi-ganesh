import type { Metadata } from "next";
import { Container } from "@/components/Section";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Container className="py-10 max-w-3xl space-y-4 text-body-lg text-on-surface-variant">
      <h1 className="text-headline-lg text-primary">Privacy Policy</h1>
      <p>When you book a sale, repair or reservation we collect your name, mobile number, device details and (for pickups) your address. We use this only to contact you about that request.</p>
      <p>We never sell or share your details with third parties. Booking messages are sent to us through WhatsApp, which is subject to WhatsApp&apos;s own privacy policy.</p>
      <p>Phones we buy are factory-reset and wiped in front of you. We recommend you back up and sign out of all accounts (Google / iCloud) before handing over a phone.</p>
      <p>To have your details deleted, message {SHOP.owner} at {SHOP.phoneDisplay}.</p>
    </Container>
  );
}
