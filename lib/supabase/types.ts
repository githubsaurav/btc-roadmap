/**
 * Hand-written to match supabase/schema.sql. Once a real Supabase project
 * exists, regenerate with `supabase gen types typescript` and this file can
 * be replaced wholesale — nothing else imports table shapes directly.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string; avatar_emoji: string; created_at: string };
        Insert: { id: string; name: string; avatar_emoji?: string };
        Update: { name?: string; avatar_emoji?: string };
        Relationships: [];
      };
      roadmap_tasks: {
        Row: { id: string; week_number: number; title: string; sort_order: number; points: number };
        Insert: { id: string; week_number: number; title: string; sort_order: number; points?: number };
        Update: { week_number?: number; title?: string; sort_order?: number; points?: number };
        Relationships: [];
      };
      task_completions: {
        Row: { profile_id: string; task_id: string; completed_at: string };
        Insert: { profile_id: string; task_id: string };
        Update: { profile_id?: string; task_id?: string };
        Relationships: [];
      };
    };
    Views: {
      profile_progress: {
        Row: {
          profile_id: string;
          name: string;
          avatar_emoji: string;
          tasks_completed: number;
          tasks_total: number;
          points_earned: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
  };
}
