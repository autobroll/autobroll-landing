import { useId } from "react";

// Twelve soft lobes reproduce the seal around the Autobroll lens.
// Cubic curves keep the outline smooth at every display size.
const outline = Array.from({ length: 24 }, (_, index) => {
  const angle = -Math.PI / 2 + index * Math.PI / 12;
  const nextAngle = angle + Math.PI / 12;
  const radius = index % 2 === 0 ? 98 : 90;
  const nextRadius = index % 2 === 0 ? 90 : 98;
  const tangent = Math.PI / 36;
  const x = 120 + radius * Math.cos(angle);
  const y = 120 + radius * Math.sin(angle);
  const nextX = 120 + nextRadius * Math.cos(nextAngle);
  const nextY = 120 + nextRadius * Math.sin(nextAngle);
  const point = (a, b) => `${a.toFixed(2)} ${b.toFixed(2)}`;

  return `${index === 0 ? `M${point(x, y)}` : ""}C${point(x - radius * Math.sin(angle) * tangent, y + radius * Math.cos(angle) * tangent)} ${point(nextX + nextRadius * Math.sin(nextAngle) * tangent, nextY - nextRadius * Math.cos(nextAngle) * tangent)} ${point(nextX, nextY)}`;
}).join(" ") + "Z";

export default function LuminousLogo() {
  const id = useId();
  const gold = `${id}-gold`;
  const glow = `${id}-glow`;

  return (
    <svg className="luminous-logo" viewBox="0 0 240 240" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gold} x1="35" y1="25" x2="205" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff3cb" />
          <stop offset=".35" stopColor="#f5d184" />
          <stop offset=".65" stopColor="#dba94f" />
          <stop offset="1" stopColor="#fff0bf" />
        </linearGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3.2" result="light" />
          <feMerge><feMergeNode in="light" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke={`url(#${gold})`} strokeWidth="2" strokeLinecap="round" filter={`url(#${glow})`}>
        <path d={outline} />
        <circle cx="120" cy="120" r="84" strokeWidth="1.2" opacity=".65" />
        <circle cx="120" cy="120" r="53" strokeWidth="2.4" />
        <circle cx="120" cy="120" r="46" strokeWidth="1" opacity=".55" />
        <circle cx="120" cy="120" r="32" strokeWidth="1.8" />
        <circle cx="133" cy="107" r="8" stroke="#fff4d2" strokeWidth="1.6" />
      </g>
      <g stroke="#fff6d9" strokeLinecap="round" filter={`url(#${glow})`}>
        <path className="luminous-logo__trace" d={outline} pathLength="100" strokeWidth="2.8" strokeDasharray="10 90" />
        <circle className="luminous-logo__trace luminous-logo__trace--inner" cx="120" cy="120" r="53" pathLength="100" strokeWidth="2.8" strokeDasharray="12 88" />
      </g>
    </svg>
  );
}
