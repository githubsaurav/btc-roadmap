export function IndustriesTable({ rows }: { rows: { industry: string; products: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.industry} className="border-b border-black/[0.06] last:border-0">
              <td className="py-1.5 pr-3 font-medium text-[var(--color-ink)]">{row.industry}</td>
              <td className="py-1.5 text-[var(--color-slate)]">{row.products}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
