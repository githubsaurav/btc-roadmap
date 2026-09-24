export function WorkedExample({
  steps,
  weekColor,
}: {
  steps: { step: string; questions: string[] }[];
  weekColor: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <h3 className="text-sm font-bold text-[var(--color-ink)]">🍽️ Worked example — Swiggy user flow</h3>
      <p className="mt-1 text-xs text-[var(--color-slate)]">
        A simple way to build product sense: break down one real journey step by step.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.step} className="rounded-xl p-3.5" style={{ background: "color-mix(in srgb, var(--color-ink) 4%, var(--color-surface))" }}>
            <div className="text-sm font-bold" style={{ color: weekColor }}>
              {s.step}
            </div>
            <ul className="mt-1.5 space-y-1 text-xs text-[var(--color-slate)]">
              {s.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
