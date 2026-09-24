import { notFound } from "next/navigation";
import { weeks } from "@/lib/roadmap-data";
import { WeekPageClient } from "@/components/week/WeekPageClient";

export function generateStaticParams() {
  return weeks.map((w) => ({ number: String(w.weekNumber) }));
}

export default async function WeekPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const week = weeks.find((w) => w.weekNumber === Number(number));
  if (!week) notFound();

  return (
    <main className="gradient-wash min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <WeekPageClient week={week} />
      </div>
    </main>
  );
}
