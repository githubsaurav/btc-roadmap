"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@/lib/progress/use-progress";
import { ProfileOnboarding } from "@/components/ProfileOnboarding";
import { ProgressHeader } from "@/components/ProgressHeader";
import { WeekCard } from "@/components/WeekCard";
import { Confetti } from "@/components/Confetti";
import { weeks, allTasks } from "@/lib/roadmap-data";

export function RoadmapApp() {
  const { profile, completed, loading, createProfile, toggleTask, backend } = useProgress();
  const [confettiKey, setConfettiKey] = useState(0);
  const wasComplete = useRef(false);

  useEffect(() => {
    const isComplete = completed.size === allTasks.length && completed.size > 0;
    if (isComplete && !wasComplete.current) {
      setConfettiKey((k) => k + 1);
    }
    wasComplete.current = isComplete;
  }, [completed]);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-black/[0.04]" />;
  }

  if (!profile) {
    return <ProfileOnboarding onCreate={createProfile} />;
  }

  return (
    <div className="space-y-6">
      <Confetti burstKey={confettiKey} />
      <ProgressHeader profile={profile} completed={completed} backend={backend} />
      <div className="grid gap-5">
        {weeks.map((week) => (
          <WeekCard key={week.id} week={week} completed={completed} onToggle={toggleTask} />
        ))}
      </div>
    </div>
  );
}
