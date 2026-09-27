import Link from "next/link";
import { SHOP } from "@/lib/shop";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icon.svg" alt="" className={className} width={40} height={40} />;
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${SHOP.name} home`}>
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-[15px] sm:text-headline-sm font-extrabold tracking-tight ${light ? "text-white" : "text-primary"}`}>
          {SHOP.name}
        </span>
        <span className={`hidden sm:inline-block w-fit px-2 py-0.5 rounded-full text-label-sm ${light ? "bg-white/10 text-secondary-fixed" : "bg-surface-container text-primary"}`}>
          {SHOP.tagline}
        </span>
      </span>
    </Link>
  );
}
