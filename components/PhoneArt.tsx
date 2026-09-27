/** Illustrated phone used until a real photo is uploaded for a listing. */
export function PhoneArt({ tint, cameras = 3, className = "" }: { tint: string; cameras?: 2 | 3; className?: string }) {
  const gid = `phone-${tint.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 120 160" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tint} stopOpacity="0.95" />
          <stop offset="1" stopColor={tint} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* back phone */}
      <rect x="18" y="14" width="56" height="116" rx="11" fill={`url(#${gid})`} stroke="#0d1f17" strokeOpacity="0.15" />
      <rect x="24" y="20" width="26" height={cameras === 3 ? 34 : 24} rx="7" fill="#0d1f17" fillOpacity="0.35" />
      <circle cx="31" cy="27" r="4.5" fill="#0d1f17" stroke="#fff" strokeOpacity="0.3" />
      <circle cx="43" cy="27" r="4.5" fill="#0d1f17" stroke="#fff" strokeOpacity="0.3" />
      {cameras === 3 && <circle cx="31" cy="39" r="4.5" fill="#0d1f17" stroke="#fff" strokeOpacity="0.3" />}
      {/* front phone */}
      <rect x="46" y="28" width="56" height="116" rx="11" fill="#0d1f17" />
      <rect x="49" y="31" width="50" height="110" rx="9" fill="#163a24" />
      <path d="M49 95 C65 80 80 110 99 88 L99 132 Q99 141 90 141 L58 141 Q49 141 49 132 Z" fill={tint} fillOpacity="0.55" />
      <path d="M49 70 C62 60 78 78 99 62" stroke="#d4af37" strokeOpacity="0.6" strokeWidth="2" fill="none" />
      <circle cx="74" cy="37" r="2" fill="#0d1f17" />
    </svg>
  );
}
