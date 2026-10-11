@AGENTS.md

# random · khanzai

A one-page sister site to https://khanzai.ca. It shows one random thought at a time; clicking the thought swaps it for a short note about what the page is. It should always feel like part of the same world as the main site: paper, ink, quiet.

## Commands

- `pnpm dev` runs the dev server; `pnpm build` must pass before a change is done; `pnpm lint` must stay clean.

## Where things live

- `content/thoughts.ts`: the thoughts, a list of `{ text, date }` (`date` is `YYYY-MM-DD`). New thoughts go here and nowhere else.
- `app/thought.tsx`: the client component that picks, shows and swaps thoughts, and holds the "about" note.
- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`: page shell, fonts and metadata, colour and font tokens.
- `app/icon.svg`: the favicon, a small ink dot on paper.

## Design rules

- Colours, only these four, defined as Tailwind theme tokens in `globals.css`: paper `#ebe5d8` (background), ink `#16130f`, ink-soft `#3d3831`, muted `#5c554b`. No dark mode.
- Fonts via `next/font` only. The thought is Cormorant Garamond 600 (`font-serif`); everything else is Hanken Grotesk (`font-sans`).
- All text is lowercase.
- The thought is centred, about 44px scaling down on mobile, max-width 720px. Under it sits the date in small muted text, then the "another →" link. A small "← khanzai.ca" link sits in the bottom-left corner.
- No animations or transitions, except the quick fade when the thought changes (`.thought-fade`), which is skipped under `prefers-reduced-motion`.
- Page title is "random · khanzai".

## Behaviour rules

- The first thought is picked randomly in the browser, never on the server, so every visit is different. Keep the page static.
- "another →" never shows the same thought twice in a row. It is hidden when there is only one thought.
- The TODO placeholders in `content/thoughts.ts` show only in development and only while there are no real thoughts. In production with no real thoughts the page shows "nothing yet."
