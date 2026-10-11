import { Thought } from "./thought";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center lowercase">
      <div className="flex w-full max-w-[720px] flex-col items-center">
        <Thought />
      </div>
      <a
        href="https://khanzai.ca"
        className="fixed bottom-6 left-6 text-[0.8125rem] text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        ← khanzai.ca
      </a>
    </main>
  );
}
