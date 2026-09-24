"use client";

import { useState } from "react";
import type { Week } from "@/lib/roadmap-data";
import { TaskItem } from "@/components/TaskItem";

export function WeekCard({
  week,
  completed,
  onToggle,
}: {
  week: Week;
  completed: Set<string>;
  onToggle: (id: string, next: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const color = `var(--color-week-${week.colorSlot})`;
  const colorBg = `var(--color-week-${week.colorSlot}-bg)`;
  const doneCount = week.tasks.filter((t) => completed.has(t.id)).length;
  const percent = Math.round((doneCount / week.tasks.length) * 100);
  const isComplete = doneCount === week.tasks.length;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] shadow-[var(--shadow-sm)]"
      style={{ borderTopWidth: 4, borderTopColor: color }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: colorBg }}
              aria-hidden
            >
              {week.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                Week {week.weekNumber}
                {isComplete && <span aria-hidden>✓</span>}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink)]">{week.title}</h3>
              <p className="mt-0.5 max-w-prose text-sm text-[var(--color-slate)]">{week.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 pl-14 sm:pl-0">
            <span className="text-xs font-medium text-[var(--color-slate)]">{week.hours}</span>
            <span className="text-sm font-bold" style={{ color }}>
              {doneCount}/{week.tasks.length}
            </span>
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%`, background: color }}
          />
        </div>

        <ul className="mt-4 divide-y divide-black/[0.04]">
          {week.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              checked={completed.has(task.id)}
              colorVar={color}
              onToggle={onToggle}
            />
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)]"
        >
          <svg
            viewBox="0 0 16 16"
            className={`h-3 w-3 fill-none stroke-current stroke-2 transition-transform ${open ? "rotate-90" : ""}`}
          >
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {open ? "Hide" : "Show"} framework & reference notes
        </button>

        {open && (
          <div className="mt-4 grid gap-5 border-t border-black/5 pt-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
                What this means
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-ink)]">
                {week.whatThisMeans.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span style={{ color }}>•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {week.approach.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
                  How to approach a case
                </h4>
                <ol className="mt-2 space-y-1.5 text-sm text-[var(--color-ink)]">
                  {week.approach.map((step) => (
                    <li key={step.label}>
                      <span className="font-semibold">{step.label}</span>{" "}
                      <span className="text-[var(--color-slate)]">— {step.detail}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
                Output expected
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-ink)]">
                {week.outputExpected.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span style={{ color }}>•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {week.suggestedIndustries && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
                  Suggested industries & products
                </h4>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {week.suggestedIndustries.map((row) => (
                        <tr key={row.industry} className="border-b border-black/[0.04] last:border-0">
                          <td className="py-1 pr-3 font-medium text-[var(--color-ink)]">{row.industry}</td>
                          <td className="py-1 text-[var(--color-slate)]">{row.products}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {week.workedExample && (
              <div className="sm:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
                  Worked example — Swiggy user flow
                </h4>
                <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {week.workedExample.map((step) => (
                    <div key={step.step} className="rounded-lg p-3 text-xs" style={{ background: colorBg }}>
                      <div className="font-bold text-[var(--color-ink)]">{step.step}</div>
                      <ul className="mt-1 space-y-1 text-[var(--color-slate)]">
                        {step.questions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {week.footerTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--color-ink)]"
              style={{ background: colorBg }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
