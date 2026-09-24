import Link from "next/link";
import { weeks, type Week } from "@/lib/roadmap-data";

export function WeekFooter({ week }: { week: Week }) {
  const color = `var(--color-week-${week.colorSlot})`;
  const bg = `var(--color-week-${week.colorSlot}-bg)`;
  const prev = weeks.find((w) => w.weekNumber === week.weekNumber - 1);
  const next = weeks.find((w) => w.weekNumber === week.weekNumber + 1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-black/5 p-4" style={{ background: bg }}>
        {week.footerTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold shadow-sm"
            style={{ color }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/week/${prev.weekNumber}`}
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-black/20"
          >
            ← {prev.emoji} Week {prev.weekNumber}
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-black/20"
          >
            ← Roadmap overview
          </Link>
        )}

        {next ? (
          <Link
            href={`/week/${next.weekNumber}`}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: `var(--color-week-${next.colorSlot})` }}
          >
            Week {next.weekNumber} {next.emoji} →
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            🏁 Back to overview
          </Link>
        )}
      </div>
    </div>
  );
}
