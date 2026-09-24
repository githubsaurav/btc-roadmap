# BTC PM Placement Prep Roadmap

An interactive, trackable version of BTC's 6-week Product Management
placement prep roadmap. Each week's checklist items can be ticked off,
progress is gamified with levels and badges, and every individual gets
their own progress bar.

## Stack

Next.js (App Router) + TypeScript + Tailwind v4, matching BTC's other
internal tools. No backend required to run — see **Progress storage** below.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All roadmap content (weeks, tasks, frameworks, the worked Swiggy example)
lives in [lib/roadmap-data.ts](lib/roadmap-data.ts) as plain typed data — edit it there to
change copy, add a week, or add/remove checklist items. Levels and badges
are in [lib/gamification.ts](lib/gamification.ts).

## Progress storage — local today, Supabase-ready

Progress (who's tracking, which tasks are checked off) sits behind one
interface, [lib/progress/types.ts](lib/progress/types.ts), with two implementations:

- **`local-store.ts`** (default, active now) — saves to `localStorage`.
  Zero setup, per-device only, no login.
- **`supabase-store.ts`** (ready, inactive) — shared, cross-device progress
  and a real leaderboard, using Supabase anonymous auth so there's still no
  login screen to build.

[lib/progress/index.ts](lib/progress/index.ts) picks between them automatically based on whether
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. **No
UI or component code changes when you connect Supabase later** — just:

1. Create a Supabase project.
2. Run [supabase/schema.sql](supabase/schema.sql) against it (SQL Editor or `supabase db push`),
   then [supabase/seed.sql](supabase/seed.sql) to load the static task list.
3. In Supabase Auth settings, enable **Anonymous sign-ins**.
4. Copy `.env.example` to `.env.local` and fill in the two Supabase values.
5. Restart the dev server — progress now syncs through Supabase, and the
   `profile_progress` view is ready for a leaderboard.

### Schema

- `profiles` — one row per person (`id` = `auth.uid()`, anonymous or not)
- `roadmap_tasks` — static reference of every checklist item (seeded, not user-edited)
- `task_completions` — join table: which profile checked off which task
- `profile_progress` (view) — per-profile rollup (tasks completed, points) for progress bars and a leaderboard

Row-level security is on throughout: profiles/tasks/completions are
world-readable (so a leaderboard can show everyone), but a profile can only
insert/update its own row and toggle its own completions.

## Gamification

- **Levels** ([lib/gamification.ts](lib/gamification.ts)): Product Curious → Case Cracker → Metrics
  Mode → GTM Grinder → Interview Ready → Product Confident, based on overall
  % complete — echoing the source deck's own "from product curious to
  product confident" line.
- **Badges**: one per completed week, plus Halfway There and Roadmap
  Complete, with a small confetti burst on 100%.
- **Points**: every task is worth 10 points (see `RoadmapTask.points` — the
  schema supports weighting tasks differently later).
