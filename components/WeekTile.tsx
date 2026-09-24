import Link from "next/link";
import type { Week } from "@/lib/roadmap-data";

export function WeekTile({ week, doneCount }: { week: Week; doneCount: number }) {
  const color = `var(--color-week-${week.colorSlot})`;
  const bg = `var(--color-week-${week.colorSlot}-bg)`;
  const percent = Math.round((doneCount / week.tasks.length) * 100);
  const isComplete = doneCount === week.tasks.length;

  return (
    <Link
      href={`/week/${week.weekNumber}`}
      className="group flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
      style={{ borderTopWidth: 4, borderTopColor: color }}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: bg }}>
          {week.emoji}
        </span>
        {isComplete && <span className="text-lg">✅</span>}
      </div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide" style={{ color }}>
        Week {week.weekNumber}
      </p>
      <h3 className="text-sm font-bold leading-snug text-[var(--color-ink)] group-hover:underline">
        {week.title}
      </h3>
      <p className="mt-auto pt-3 text-[11px] font-medium text-[var(--color-slate)]">{week.hours}</p>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <div className="h-full rounded-full" style={{ width: `${percent}%`, background: color }} />
      </div>
      <p className="mt-1 text-[11px] font-semibold" style={{ color }}>
        {doneCount}/{week.tasks.length}
      </p>
    </Link>
  );
}
