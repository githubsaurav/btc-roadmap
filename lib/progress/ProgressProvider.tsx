"use client";

import { createContext, useContext } from "react";
import { useProgress } from "@/lib/progress/use-progress";

type ProgressContextValue = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Single instance of useProgress for the whole app, shared via context, so
 * the top nav's mini progress badge and whichever page is mounted (overview
 * or a week screen) always agree — ticking a task on /week/2 is reflected
 * immediately in the nav without a route change.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const value = useProgress();
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgressContext must be used within ProgressProvider");
  return ctx;
}
