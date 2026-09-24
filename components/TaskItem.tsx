"use client";

import type { RoadmapTask } from "@/lib/roadmap-data";

export function TaskItem({
  task,
  checked,
  colorVar,
  onToggle,
}: {
  task: RoadmapTask;
  checked: boolean;
  colorVar: string;
  onToggle: (id: string, next: boolean) => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onToggle(task.id, !checked)}
        className="group flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-black/[0.03]"
      >
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
          style={{
            borderColor: checked ? colorVar : "color-mix(in srgb, var(--color-ink) 25%, transparent)",
            background: checked ? colorVar : "transparent",
          }}
        >
          {checked && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-white stroke-[2.5]">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span
          className={`text-sm leading-snug ${checked ? "text-[var(--color-slate)] line-through" : "text-[var(--color-ink)]"}`}
        >
          {task.title}
        </span>
      </button>
    </li>
  );
}
