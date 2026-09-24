import type { RoadmapTask } from "@/lib/roadmap-data";
import { TaskItem } from "@/components/TaskItem";

export function ChecklistPanel({
  tasks,
  completed,
  colorVar,
  onToggle,
}: {
  tasks: RoadmapTask[];
  completed: Set<string>;
  colorVar: string;
  onToggle: (id: string, next: boolean) => void;
}) {
  const done = tasks.filter((t) => completed.has(t.id)).length;
  return (
    <div>
      <ul className="divide-y divide-black/[0.04]">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} checked={completed.has(task.id)} colorVar={colorVar} onToggle={onToggle} />
        ))}
      </ul>
      <p className="mt-2 text-xs font-medium text-[var(--color-slate)]">
        {done}/{tasks.length} done
      </p>
    </div>
  );
}
