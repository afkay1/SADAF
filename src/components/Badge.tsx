/** Rotating circular text badge. */
export default function Badge({ text = "SADAF RESIDENCES · RED SEA · BEACHFRONT LIVING · ", size = 130 }: { text?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative text-white" aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text fill="currentColor" fontSize="15" letterSpacing="4" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#badge-circle">{text.repeat(1)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="h-script text-4xl">S</span>
      </div>
    </div>
  );
}
