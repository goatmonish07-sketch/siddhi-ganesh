import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/Section";
import { TrackForm } from "@/components/TrackForm";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Track Your Request" };

export default function TrackPage() {
  return (
    <Container className="py-10 max-w-3xl">
      <SectionHeading eyebrow="Track order" title="Check your sell, repair or reservation status" sub="Enter the request ID you received after booking and the mobile number you used." />
      <TrackForm />
      <p className="text-body-md text-on-surface-variant mt-6">
        Lost your ID?{" "}
        <a className="inline-flex items-center min-h-11 underline text-primary" href={waLink("Hi, I need the status of my request.")} target="_blank" rel="noopener noreferrer">
          Ask us on WhatsApp
        </a>
        .
      </p>
    </Container>
  );
}
