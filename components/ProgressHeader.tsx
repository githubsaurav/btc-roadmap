"use client";

import type { Profile } from "@/lib/progress/types";
import { earnedBadges, levelForPercent, nextLevel } from "@/lib/gamification";
import { allTasks, totalPoints } from "@/lib/roadmap-data";

export function ProgressHeader({
  profile,
  completed,
  backend,
}: {
  profile: Profile;
  completed: Set<string>;
  backend: "local" | "supabase";
}) {
  const percent = Math.round((completed.size / allTasks.length) * 100);
  const level = levelForPercent(percent);
  const next = nextLevel(percent);
  const badges = earnedBadges(completed);
  const points = [...completed].reduce((sum, id) => {
    const task = allTasks.find((t) => t.id === id);
    return sum + (task?.points ?? 0);
  }, 0);

  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-md)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-soft,_#eef2ff)] text-2xl">
            {profile.avatarEmoji}
          </span>
          <div>
            <p className="text-sm text-[var(--color-slate)]">Welcome back,</p>
            <p className="text-lg font-bold text-[var(--color-ink)]">{profile.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1.5">
          <span className="text-xl leading-none">{level.emoji}</span>
          <span className="text-sm font-semibold text-[var(--color-ink)]">{level.name}</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-[var(--color-ink)]">Overall progress</span>
          <span className="text-[var(--color-slate)]">
            {completed.size}/{allTasks.length} tasks · {points}/{totalPoints} pts
          </span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="gradient-bar h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        {next ? (
          <p className="mt-1.5 text-xs text-[var(--color-slate)]">
            {next.minPercent - percent}% to <span className="font-medium">{next.emoji} {next.name}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-xs font-medium text-[var(--color-ink)]">
            🎉 Full roadmap complete — you&apos;re interview ready.
          </p>
        )}
      </div>

      {badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-black/5 pt-4">
          {badges.map((b) => (
            <span
              key={b.id}
              className="flex items-center gap-1 rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]"
              title={b.label}
            >
              <span>{b.emoji}</span>
              {b.label}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-[11px] text-[var(--color-slate)]">
        {backend === "supabase" ? "🔄 Synced to your account" : "💾 Saved on this device"}
      </p>
    </div>
  );
}
