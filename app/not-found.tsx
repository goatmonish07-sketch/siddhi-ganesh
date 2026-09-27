import Link from "next/link";
import { Container } from "@/components/Section";

export default function NotFound() {
  return (
    <Container className="py-20 text-center space-y-3">
      <h1 className="text-headline-lg text-primary">Page not found</h1>
      <p className="text-body-lg text-on-surface-variant">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="inline-block rounded-lg bg-primary-container px-5 py-3 text-white text-label-lg">Back to home</Link>
    </Container>
  );
}
