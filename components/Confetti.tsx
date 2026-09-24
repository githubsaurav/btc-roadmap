"use client";

const COLORS = ["var(--color-week-1)", "var(--color-week-2)", "var(--color-week-3)", "var(--color-week-4)", "var(--color-week-5)", "var(--color-week-6)"];

/** Fires once when `burstKey` changes — mount a fresh set of pieces keyed on it. */
export function Confetti({ burstKey }: { burstKey: number }) {
  if (burstKey === 0) return null;
  const pieces = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-56 overflow-hidden" aria-hidden key={burstKey}>
      {pieces.map((i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 97) % 100}%`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${(i % 6) * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}
