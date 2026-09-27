/**
 * Realistic device render (back + front) used until a real photo is added to the image slot.
 * `tint` is the body colour of the phone.
 */
export function PhoneArt({ tint = "#3a3a3c", cameras = 3, className = "" }: { tint?: string; cameras?: 2 | 3; className?: string }) {
  const id = `pa-${tint.replace(/[^a-zA-Z0-9]/g, "")}-${cameras}`;
  const lens = (cx: number, cy: number, r = 11) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r + 2.5} fill="#0c0c0d" opacity="0.55" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-ring)`} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill={`url(#${id}-glass)`} />
      <circle cx={cx - r * 0.22} cy={cy - r * 0.25} r={r * 0.16} fill="#fff" opacity="0.55" />
    </g>
  );
  return (
    <svg viewBox="0 0 260 300" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tint} />
          <stop offset="0.55" stopColor={tint} stopOpacity="0.92" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-ring`}>
          <stop offset="0.7" stopColor="#1a1a1c" />
          <stop offset="1" stopColor="#6b6b70" />
        </radialGradient>
        <radialGradient id={`${id}-glass`} cx="0.4" cy="0.35">
          <stop offset="0" stopColor="#3b4a6b" />
          <stop offset="0.6" stopColor="#0b0f1a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={tint} stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#1c1c28" />
          <stop offset="1" stopColor="#0a0a10" />
        </linearGradient>
        <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e6e73" />
          <stop offset="0.5" stopColor="#2c2c2e" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="130" cy="288" rx="105" ry="7" fill="#000" opacity="0.08" />

      {/* back of phone */}
      <g transform="translate(22 18) rotate(-6 60 130)">
        <rect x="0" y="0" width="122" height="252" rx="22" fill={`url(#${id}-frame)`} />
        <rect x="2.5" y="2.5" width="117" height="247" rx="20" fill={`url(#${id}-body)`} />
        <rect x="2.5" y="2.5" width="117" height="247" rx="20" fill={`url(#${id}-sheen)`} />
        <rect x="10" y="10" width="56" height={cameras === 3 ? 60 : 56} rx="15" fill="#000" opacity="0.18" />
        {cameras === 3 ? [lens(27, 26), lens(49, 26), lens(27, 52)] : [lens(26, 27), lens(49, 48)]}
        <circle cx="52" cy={cameras === 3 ? 55 : 22} r="3.2" fill="#f5e6c8" opacity="0.8" />
      </g>

      {/* front of phone */}
      <g transform="translate(112 34) rotate(4 60 125)">
        <rect x="0" y="0" width="118" height="246" rx="22" fill={`url(#${id}-frame)`} />
        <rect x="2" y="2" width="114" height="242" rx="20.5" fill="#050505" />
        <rect x="6.5" y="6.5" width="105" height="233" rx="16.5" fill={`url(#${id}-screen)`} />
        <path d="M6.5 150 C40 120 70 185 111.5 140 L111.5 223 Q111.5 239.5 95 239.5 L23 239.5 Q6.5 239.5 6.5 223 Z" fill={tint} opacity="0.28" />
        <rect x="44" y="12" width="30" height="8.5" rx="4.25" fill="#000" />
        <text x="59" y="62" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#fff" opacity="0.92">9:41</text>
        <rect x="6.5" y="6.5" width="105" height="233" rx="16.5" fill={`url(#${id}-sheen)`} opacity="0.6" />
        <rect x="118" y="62" width="2.2" height="30" rx="1" fill="#48484a" />
      </g>
    </svg>
  );
}
