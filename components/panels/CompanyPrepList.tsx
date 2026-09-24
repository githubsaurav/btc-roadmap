import type { CompanyPrep } from "@/lib/roadmap-data";

export function CompanyPrepList({ companies }: { companies: CompanyPrep[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {companies.map((c) => (
        <li key={c.name} className="flex items-start gap-2.5">
          <span className="text-lg leading-none" aria-hidden>
            {c.emoji}
          </span>
          <span>
            <span className="text-sm font-bold text-[var(--color-ink)]">{c.name}</span>{" "}
            <span className="text-sm text-[var(--color-slate)]">— {c.focus}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
