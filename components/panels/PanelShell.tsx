import type { ReactNode } from "react";

export type PanelRole = "blue" | "green" | "amber" | "violet";

const ROLE_VARS: Record<PanelRole, { text: string; bg: string; icon: string }> = {
  blue: { text: "var(--color-role-blue)", bg: "var(--color-role-blue-bg)", icon: "var(--color-role-blue-icon)" },
  green: { text: "var(--color-role-green)", bg: "var(--color-role-green-bg)", icon: "var(--color-role-green-icon)" },
  amber: { text: "var(--color-role-amber)", bg: "var(--color-role-amber-bg)", icon: "var(--color-role-amber-icon)" },
  violet: { text: "var(--color-role-violet)", bg: "var(--color-role-violet-bg)", icon: "var(--color-role-violet-icon)" },
};

export function PanelShell({
  role,
  icon,
  title,
  children,
  className = "",
}: {
  role: PanelRole;
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const vars = ROLE_VARS[role];
  return (
    <div
      className={`rounded-2xl border border-black/5 p-5 shadow-[var(--shadow-sm)] sm:p-6 ${className}`}
      style={{ background: vars.bg }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
          style={{ background: vars.icon }}
          aria-hidden
        >
          {icon}
        </span>
        <h3 className="text-sm font-bold" style={{ color: vars.text }}>
          {title}
        </h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
