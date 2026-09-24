import type { MockQuestionType } from "@/lib/roadmap-data";

export function MockTypes({ items }: { items: MockQuestionType[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.category}>
          <p className="text-sm font-bold text-[var(--color-ink)]">{item.category}</p>
          <p className="text-sm italic text-[var(--color-slate)]">&ldquo;{item.example}&rdquo;</p>
        </li>
      ))}
    </ul>
  );
}
