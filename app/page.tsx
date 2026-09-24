import { RoadmapApp } from "@/components/RoadmapApp";

export default function Home() {
  return (
    <main className="gradient-wash min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
              BTC
            </span>
            <span className="text-xs text-[var(--color-slate)]">Business Technology Club</span>
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Product Management <span className="gradient-text">Placement Prep Roadmap</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-slate)] sm:text-base">
            A 6-week plan to build product judgment, practice with purpose and get interview
            ready — tick off each piece as you go.
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
