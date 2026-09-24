"use client";

import { useEffect, useRef, useState } from "react";
import { useProgressContext } from "@/lib/progress/ProgressProvider";
import { ProfileOnboarding } from "@/components/ProfileOnboarding";
import { ProgressHeader } from "@/components/ProgressHeader";
import { WeekTimeline } from "@/components/WeekTimeline";
import { Confetti } from "@/components/Confetti";
import { allTasks } from "@/lib/roadmap-data";

export function RoadmapApp() {
  const { profile, completed, loading, createProfile, backend } = useProgressContext();
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
      <WeekTimeline completed={completed} />
    </div>
  );
}
