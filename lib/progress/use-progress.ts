"use client";

import { useCallback, useEffect, useState } from "react";
import { getProgressStore, type Profile } from "@/lib/progress";

export function useProgress() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const store = getProgressStore();
      const existing = await store.getProfile();
      if (cancelled) return;
      setProfile(existing);
      if (existing) {
        const ids = await store.getCompletedTaskIds(existing.id);
        if (!cancelled) setCompleted(ids);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const createProfile = useCallback(async (name: string, avatarEmoji: string) => {
    const store = getProgressStore();
    const created = await store.createProfile(name.trim(), avatarEmoji);
    setProfile(created);
    setCompleted(new Set());
    return created;
  }, []);

  const toggleTask = useCallback(
    async (taskId: string, next: boolean) => {
      if (!profile) return;
      setCompleted((prev) => {
        const updated = new Set(prev);
        if (next) updated.add(taskId);
        else updated.delete(taskId);
        return updated;
      });
      try {
        await getProgressStore().setTaskCompleted(profile.id, taskId, next);
      } catch {
        // Revert on failure (e.g. Supabase offline) so the UI never lies about saved state.
        setCompleted((prev) => {
          const reverted = new Set(prev);
          if (next) reverted.delete(taskId);
          else reverted.add(taskId);
          return reverted;
        });
      }
    },
    [profile]
  );

  return { profile, completed, loading, createProfile, toggleTask, backend: getProgressStore().backend };
}
