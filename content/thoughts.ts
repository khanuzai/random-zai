// How to add a thought:
//   Add a { text, date } entry to `thoughts` below. `text` is shown lowercase
//   whatever case you type it in; `date` is the day you had it, as YYYY-MM-DD.
//   Order doesn't matter, since the page picks one at random.
//
//   { text: "the best ideas show up in the shower", date: "2026-10-10" },

export type Thought = { text: string; date: string };

export const thoughts: Thought[] = [];

// Shown only in development, and only while `thoughts` is empty.
const placeholders: Thought[] = [
  { text: "TODO: a first random thought", date: "2026-10-10" },
  { text: "TODO: a quote worth keeping", date: "2026-10-09" },
  { text: "TODO: something only i find funny", date: "2026-10-08" },
];

export const visibleThoughts: Thought[] =
  thoughts.length > 0
    ? thoughts
    : process.env.NODE_ENV === "development"
      ? placeholders
      : [];
