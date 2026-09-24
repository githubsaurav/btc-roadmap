import type { ApproachStep } from "@/lib/roadmap-data";

export function ApproachOutput({ steps, output }: { steps: ApproachStep[]; output: string[] }) {
  return (
    <div>
      <ol className="space-y-2.5 text-sm text-[var(--color-ink)]">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-role-violet)] text-[10px] font-bold text-white">
              {i + 1}
            </span>
            <span>
              <span className="font-semibold">{step.label.replace(/^\d+\.\s*/, "")}</span>{" "}
              <span className="text-[var(--color-slate)]">— {step.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      {output.length > 0 && (
        <div className="mt-4 border-t border-black/10 pt-3">
          <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-role-violet)]">
            Output expected
          </h4>
          <ul className="mt-1.5 space-y-1.5 text-sm text-[var(--color-ink)]">
            {output.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-role-violet)]" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
