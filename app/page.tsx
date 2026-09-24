import { RoadmapApp } from "@/components/RoadmapApp";

export default function Home() {
  return (
    <main className="gradient-wash min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Product Management <span className="gradient-text">Placement Prep Roadmap</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-slate)] sm:text-base">
            A 6-week plan to build product judgment, practice with purpose and get interview
            ready — pick a week to dive in.
          </p>
        </header>

        <RoadmapApp />

        <footer className="mt-12 text-center text-xs text-[var(--color-slate)]">
          Learn. Build. Break In. — from product curious to product confident.
        </footer>
      </div>
    </main>
  );
}
