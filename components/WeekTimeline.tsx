import { weeks } from "@/lib/roadmap-data";
import { WeekTile } from "@/components/WeekTile";

export function WeekTimeline({ completed }: { completed: Set<string> }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-bold text-[var(--color-ink)]">Your 6-week roadmap</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {weeks.map((week) => (
          <WeekTile
            key={week.id}
            week={week}
            doneCount={week.tasks.filter((t) => completed.has(t.id)).length}
          />
        ))}
      </div>
    </div>
  );
}
