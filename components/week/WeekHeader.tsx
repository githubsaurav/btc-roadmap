import type { Week } from "@/lib/roadmap-data";

export function WeekHeader({ week, doneCount }: { week: Week; doneCount: number }) {
  const color = `var(--color-week-${week.colorSlot})`;
  const bg = `var(--color-week-${week.colorSlot}-bg)`;
  const percent = Math.round((doneCount / week.tasks.length) * 100);

  return (
    <div
      className="rounded-3xl border border-black/5 p-6 shadow-[var(--shadow-md)] sm:p-8"
      style={{ background: `linear-gradient(135deg, ${bg}, var(--color-surface) 70%)` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm"
            style={{ background: color }}
            aria-hidden
          >
            {week.emoji}
          </span>
          <div>
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white"
              style={{ background: color }}
            >
              Week {week.weekNumber}
            </span>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-[var(--color-ink)] sm:text-3xl">
              {week.title}
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-[var(--color-slate)] sm:text-base">{week.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-[var(--color-ink)]">{week.hours}</span>
          <span className="shrink-0 whitespace-nowrap font-bold" style={{ color }}>
            {doneCount}/{week.tasks.length} tasks
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}
