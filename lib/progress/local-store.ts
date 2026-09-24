import type { Profile, ProgressStore } from "@/lib/progress/types";

const PROFILE_KEY = "btc-roadmap:profile";
const completionsKey = (profileId: string) => `btc-roadmap:completions:${profileId}`;

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage disabled (private mode, quota) — progress just won't persist.
  }
}

/**
 * Per-device progress, no backend required. Ships as the default so the
 * roadmap works the moment it's deployed; swap in `supabase-store.ts` later
 * for shared, cross-device progress without touching any UI code.
 */
export class LocalProgressStore implements ProgressStore {
  readonly backend = "local" as const;

  async getProfile(): Promise<Profile | null> {
    return readJSON<Profile>(PROFILE_KEY);
  }

  async createProfile(name: string, avatarEmoji: string): Promise<Profile> {
    const profile: Profile = { id: crypto.randomUUID(), name, avatarEmoji };
    writeJSON(PROFILE_KEY, profile);
    return profile;
  }

  async getCompletedTaskIds(profileId: string): Promise<Set<string>> {
    const ids = readJSON<string[]>(completionsKey(profileId)) ?? [];
    return new Set(ids);
  }

  async setTaskCompleted(profileId: string, taskId: string, completed: boolean): Promise<void> {
    const current = await this.getCompletedTaskIds(profileId);
    if (completed) current.add(taskId);
    else current.delete(taskId);
    writeJSON(completionsKey(profileId), [...current]);
  }

  async listProgress() {
    const profile = await this.getProfile();
    if (!profile) return [];
    const completed = await this.getCompletedTaskIds(profile.id);
    return [{ profile, completedCount: completed.size }];
  }
}
