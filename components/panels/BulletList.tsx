export function BulletList({ items, dotColor = "currentColor" }: { items: string[]; dotColor?: string }) {
  return (
    <ul className="space-y-2 text-sm text-[var(--color-ink)]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dotColor }} />
          {item}
        </li>
      ))}
    </ul>
  );
}
