"use client";

import type { Week } from "@/lib/roadmap-data";
import { WeekHeader } from "@/components/week/WeekHeader";
import { WeekFooter } from "@/components/week/WeekFooter";
import { WorkedExample } from "@/components/week/WorkedExample";
import { PanelShell } from "@/components/panels/PanelShell";
import { BulletList } from "@/components/panels/BulletList";
import { ChecklistPanel } from "@/components/panels/ChecklistPanel";
import { ApproachOutput } from "@/components/panels/ApproachOutput";
import { QuestionTypes } from "@/components/panels/QuestionTypes";
import { MockTypes } from "@/components/panels/MockTypes";
import { CompanyPrepList } from "@/components/panels/CompanyPrepList";
import { IndustriesTable } from "@/components/panels/IndustriesTable";

export function WeekScreen({
  week,
  completed,
  onToggle,
}: {
  week: Week;
  completed: Set<string>;
  onToggle: (id: string, next: boolean) => void;
}) {
  const weekColor = `var(--color-week-${week.colorSlot})`;
  const doneCount = week.tasks.filter((t) => completed.has(t.id)).length;

  return (
    <div className="space-y-5">
      <WeekHeader week={week} doneCount={doneCount} />

      <div className="grid gap-5 lg:grid-cols-2">
        <PanelShell role="blue" icon="💡" title="What this means">
          <BulletList items={week.whatThisMeans} dotColor="var(--color-role-blue)" />
        </PanelShell>

        <PanelShell role="green" icon="📝" title="What to do">
          <ChecklistPanel tasks={week.tasks} completed={completed} colorVar={weekColor} onToggle={onToggle} />
        </PanelShell>

        {week.suggestedIndustries && (
          <PanelShell role="amber" icon="📊" title="Suggested industries & products">
            <IndustriesTable rows={week.suggestedIndustries} />
          </PanelShell>
        )}

        {week.typesOfQuestions && (
          <PanelShell role="amber" icon="❓" title="Types of questions">
            <QuestionTypes categories={week.typesOfQuestions} />
          </PanelShell>
        )}

        {week.mockQuestionTypes && (
          <PanelShell role="amber" icon="💬" title="Common mock question types">
            <MockTypes items={week.mockQuestionTypes} />
          </PanelShell>
        )}

        {week.approach.length > 0 ? (
          <PanelShell role="violet" icon="🧭" title="How to approach a case">
            <ApproachOutput steps={week.approach} output={week.outputExpected} />
          </PanelShell>
        ) : (
          <PanelShell role="violet" icon="📦" title="Output expected">
            <BulletList items={week.outputExpected} dotColor="var(--color-role-violet)" />
          </PanelShell>
        )}

        {week.companyPrep && (
          <PanelShell role="violet" icon="🏢" title="Prepare company-wise" className="lg:col-span-2">
            <CompanyPrepList companies={week.companyPrep} />
          </PanelShell>
        )}
      </div>

      {week.workedExample && <WorkedExample steps={week.workedExample} weekColor={weekColor} />}

      <WeekFooter week={week} />
    </div>
  );
}
