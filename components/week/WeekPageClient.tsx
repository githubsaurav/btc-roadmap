"use client";

import type { Week } from "@/lib/roadmap-data";
import { useProgressContext } from "@/lib/progress/ProgressProvider";
import { ProfileOnboarding } from "@/components/ProfileOnboarding";
import { WeekScreen } from "@/components/week/WeekScreen";

export function WeekPageClient({ week }: { week: Week }) {
  const { profile, completed, loading, createProfile, toggleTask } = useProgressContext();

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-black/[0.04]" />;
  }

  if (!profile) {
    return <ProfileOnboarding onCreate={createProfile} />;
  }

  return <WeekScreen week={week} completed={completed} onToggle={toggleTask} />;
}
