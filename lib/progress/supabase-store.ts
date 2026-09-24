import { createClient } from "@/lib/supabase/client";
import type { Profile, ProgressStore } from "@/lib/progress/types";

/**
 * Shared, cross-device progress backed by Supabase. Identity uses anonymous
 * auth (`supabase.auth.signInAnonymously`) so there's no login screen to
 * build yet — each browser gets a stable `auth.uid()` that doubles as
 * `profiles.id`. Swap to a real login later (magic link, OAuth) and this
 * store keeps working unchanged, since Supabase can upgrade an anonymous
 * session to a permanent one in place.
 *
 * Only becomes active once NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY are set —
 * see lib/progress/index.ts — and requires supabase/schema.sql to have been
 * run against the project first.
 */
export class SupabaseProgressStore implements ProgressStore {
  readonly backend = "supabase" as const;
  private client = createClient();

  private async ensureSession() {
    const { data } = await this.client.auth.getSession();
    if (data.session) return data.session;
    const { data: signInData, error } = await this.client.auth.signInAnonymously();
    if (error) throw error;
    return signInData.session;
  }

  async getProfile(): Promise<Profile | null> {
    const session = await this.ensureSession();
    if (!session) return null;
    const { data } = await this.client
      .from("profiles")
      .select("id, name, avatar_emoji")
      .eq("id", session.user.id)
      .maybeSingle();
    if (!data) return null;
    return { id: data.id, name: data.name, avatarEmoji: data.avatar_emoji };
  }

  async createProfile(name: string, avatarEmoji: string): Promise<Profile> {
    const session = await this.ensureSession();
    if (!session) throw new Error("Could not start a Supabase session");
    const { error } = await this.client
      .from("profiles")
      .upsert({ id: session.user.id, name, avatar_emoji: avatarEmoji });
    if (error) throw error;
    return { id: session.user.id, name, avatarEmoji };
  }

  async getCompletedTaskIds(profileId: string): Promise<Set<string>> {
    const { data, error } = await this.client
      .from("task_completions")
      .select("task_id")
      .eq("profile_id", profileId);
    if (error) throw error;
    return new Set((data ?? []).map((row) => row.task_id));
  }

  async setTaskCompleted(profileId: string, taskId: string, completed: boolean): Promise<void> {
    if (completed) {
      const { error } = await this.client
        .from("task_completions")
        .upsert({ profile_id: profileId, task_id: taskId });
      if (error) throw error;
    } else {
      const { error } = await this.client
        .from("task_completions")
        .delete()
        .eq("profile_id", profileId)
        .eq("task_id", taskId);
      if (error) throw error;
    }
  }

  async listProgress() {
    const { data, error } = await this.client
      .from("profile_progress")
      .select("profile_id, name, avatar_emoji, tasks_completed")
      .order("tasks_completed", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => ({
      profile: { id: row.profile_id, name: row.name, avatarEmoji: row.avatar_emoji },
      completedCount: row.tasks_completed,
    }));
  }
}
