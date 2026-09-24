import { weeks } from "@/lib/roadmap-data";

export interface Level {
  name: string;
  emoji: string;
  minPercent: number;
}

/** Ordered low → high; the closing line of the source deck ("product curious to
 * product confident") is the top and bottom rung on purpose. */
export const levels: Level[] = [
  { name: "Product Curious", emoji: "🌱", minPercent: 0 },
  { name: "Case Cracker", emoji: "🧠", minPercent: 15 },
  { name: "Metrics Mode", emoji: "📊", minPercent: 35 },
  { name: "GTM Grinder", emoji: "🚀", minPercent: 55 },
  { name: "Interview Ready", emoji: "🔥", minPercent: 80 },
  { name: "Product Confident", emoji: "🏆", minPercent: 100 },
];

export function levelForPercent(percent: number): Level {
  return [...levels].reverse().find((l) => percent >= l.minPercent) ?? levels[0];
}

export function nextLevel(percent: number): Level | null {
  return levels.find((l) => percent < l.minPercent) ?? null;
}

export interface Badge {
  id: string;
  emoji: string;
  label: string;
  earned: (completedIds: Set<string>) => boolean;
}

export const badges: Badge[] = [
  ...weeks.map((w) => ({
    id: `week-${w.weekNumber}-done`,
    emoji: w.emoji,
    label: `Week ${w.weekNumber} Crushed`,
    earned: (completed: Set<string>) => w.tasks.every((t) => completed.has(t.id)),
  })),
  {
    id: "halfway",
    emoji: "🔥",
    label: "Halfway There",
    earned: (completed) => {
      const total = weeks.flatMap((w) => w.tasks).length;
      return completed.size / total >= 0.5;
    },
  },
  {
    id: "all-done",
    emoji: "🏆",
    label: "Roadmap Complete",
    earned: (completed) => {
      const total = weeks.flatMap((w) => w.tasks).length;
      return completed.size === total;
    },
  },
];

export function earnedBadges(completed: Set<string>): Badge[] {
  return badges.filter((b) => b.earned(completed));
}
