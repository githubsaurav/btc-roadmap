"use client";

import { useState } from "react";

const AVATARS = ["🧑‍💻", "👩‍💻", "🧑‍🎓", "👨‍🎓", "🚀", "🎯", "🧠", "🔥"];

export function ProfileOnboarding({
  onCreate,
}: {
  onCreate: (name: string, avatarEmoji: string) => void;
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-center shadow-[var(--shadow-md)]">
      <p className="text-3xl">{avatar}</p>
      <h2 className="mt-2 text-xl font-bold text-[var(--color-ink)]">Who&apos;s tracking progress?</h2>
      <p className="mt-1 text-sm text-[var(--color-slate)]">
        Pick a name and avatar — your checklist and progress bar are tied to it.
      </p>

      <form
        className="mt-5 space-y-4 text-left"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onCreate(name, avatar);
        }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {AVATARS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setAvatar(emoji)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition ${
                avatar === emoji ? "bg-[var(--color-accent)] text-white" : "bg-black/[0.05] hover:bg-black/[0.08]"
              }`}
              aria-pressed={avatar === emoji}
              aria-label={`Choose avatar ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={60}
          className="w-full rounded-xl border border-black/10 bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none focus-visible:border-[var(--color-accent)]"
          autoFocus
        />

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          Start tracking
        </button>
      </form>
    </div>
  );
}
