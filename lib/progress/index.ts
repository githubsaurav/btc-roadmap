import { isSupabaseConfigured } from "@/lib/supabase/client";
import { LocalProgressStore } from "@/lib/progress/local-store";
import { SupabaseProgressStore } from "@/lib/progress/supabase-store";
import type { ProgressStore } from "@/lib/progress/types";

let store: ProgressStore | null = null;

/**
 * The one place that decides local vs. Supabase. Everything else in the app
 * calls `getProgressStore()` and never imports either implementation
 * directly, so flipping the backend is just setting env vars.
 */
export function getProgressStore(): ProgressStore {
  if (!store) {
    store = isSupabaseConfigured ? new SupabaseProgressStore() : new LocalProgressStore();
  }
  return store;
}

export type { Profile, ProgressStore } from "@/lib/progress/types";
