export function SectionHeading({ eyebrow, title, sub, center = false }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-6 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      <div className="text-label-sm uppercase tracking-widest text-muted">{eyebrow}</div>
      <h2 className="text-[24px] leading-8 sm:text-headline-lg font-bold tracking-tight text-on-surface mt-1">{title}</h2>
      {sub && <p className="text-body-md text-on-surface-variant mt-1">{sub}</p>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 lg:px-8 ${className}`}>{children}</div>;
}
