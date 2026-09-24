/**
 * Storage-agnostic contract for reading/writing roadmap progress. Two
 * implementations exist: `local-store.ts` (localStorage, the default) and
 * `supabase-store.ts` (shared, cross-device). `index.ts` picks one at
 * runtime based on whether Supabase env vars are set — nothing else in the
 * app needs to know which is active.
 */
export interface Profile {
  id: string;
  name: string;
  avatarEmoji: string;
}

export interface ProgressStore {
  /** Backend label, surfaced in the UI footer so it's obvious which mode is active. */
  readonly backend: "local" | "supabase";

  getProfile(): Promise<Profile | null>;
  createProfile(name: string, avatarEmoji: string): Promise<Profile>;

  getCompletedTaskIds(profileId: string): Promise<Set<string>>;
  setTaskCompleted(profileId: string, taskId: string, completed: boolean): Promise<void>;

  /** All profiles with a completed-task count, for the leaderboard. Supabase-only
   * capability — the local store returns just the current device's profile. */
  listProgress(): Promise<{ profile: Profile; completedCount: number }[]>;
}
