"use client";

import { useState, useSyncExternalStore } from "react";
import { visibleThoughts as thoughts } from "@/content/thoughts";

// The current thought lives outside React so the first one can be picked in
// the browser (never on the server), which keeps every visit different
// without a hydration mismatch.
let current: number | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  if (current === null && thoughts.length > 0) {
    current = Math.floor(Math.random() * thoughts.length);
  }
  return current;
}

function getServerSnapshot() {
  return null;
}

function showAnother() {
  if (current === null || thoughts.length < 2) return;
  // Pick among the other thoughts so the same one never shows twice in a row.
  const next = Math.floor(Math.random() * (thoughts.length - 1));
  current = next >= current ? next + 1 : next;
  listeners.forEach((listener) => listener());
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
}

const thoughtClass =
  "font-serif font-semibold text-ink text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.15] text-balance";

export function Thought() {
  const index = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [aboutOpen, setAboutOpen] = useState(false);

  if (thoughts.length === 0) {
    return <p className={thoughtClass}>nothing yet.</p>;
  }
  if (index === null) return null;

  const thought = thoughts[index];

  return (
    <>
      <div key={index} className="thought-fade flex flex-col items-center">
        <button
          type="button"
          aria-pressed={aboutOpen}
          onClick={() => setAboutOpen(!aboutOpen)}
          className={
            aboutOpen
              ? "max-w-[30rem] cursor-pointer lowercase text-[1.0625rem] leading-relaxed text-ink-soft text-pretty"
              : `cursor-pointer lowercase ${thoughtClass}`
          }
        >
          {aboutOpen
            ? "this is just a random page i felt i ought to make. random photos, random quotes, random text, random anything i like or fw. a quieter, more hidden way of being myself."
            : thought.text}
        </button>
        {!aboutOpen && (
          <time dateTime={thought.date} className="mt-6 text-[0.8125rem] text-muted">
            {formatDate(thought.date)}
          </time>
        )}
      </div>
      {thoughts.length > 1 && (
        <button
          type="button"
          onClick={() => {
            setAboutOpen(false);
            showAnother();
          }}
          className="mt-8 cursor-pointer lowercase text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          another →
        </button>
      )}
    </>
  );
}
