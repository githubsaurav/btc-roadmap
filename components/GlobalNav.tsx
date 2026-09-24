"use client";

import Link from "next/link";
import { useProgressContext } from "@/lib/progress/ProgressProvider";
import { allTasks } from "@/lib/roadmap-data";
import { levelForPercent } from "@/lib/gamification";

export function GlobalNav() {
  const { profile, completed, loading } = useProgressContext();
  const percent = allTasks.length > 0 ? Math.round((completed.size / allTasks.length) * 100) : 0;
  const level = levelForPercent(percent);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">BTC</span>
          <span className="hidden text-xs text-[var(--color-slate)] sm:inline">Placement Prep Roadmap</span>
        </Link>

        {!loading && profile && (
          <div className="flex items-center gap-2 rounded-full bg-black/[0.04] py-1 pl-1 pr-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm">
              {profile.avatarEmoji}
            </span>
            <span className="text-xs font-semibold text-[var(--color-ink)]">{percent}%</span>
            <span className="hidden text-xs text-[var(--color-slate)] sm:inline">
              {level.emoji} {level.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
