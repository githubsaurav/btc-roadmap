import type { QuestionCategory } from "@/lib/roadmap-data";

export function QuestionTypes({ categories }: { categories: QuestionCategory[] }) {
  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.category}>
          <p className="text-sm font-bold text-[var(--color-ink)]">{cat.category}</p>
          <p className="text-xs text-[var(--color-slate)]">{cat.description}</p>
          <ul className="mt-1.5 space-y-1 text-sm text-[var(--color-ink)]">
            {cat.examples.map((ex) => (
              <li key={ex} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-role-amber)]" />
                {ex}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
