import { BadgeCheck, FileSearch, Scale } from "lucide-react";

import { ChatPanel } from "@/components/assess/chat-panel";

const PILLARS = [
  {
    Icon: FileSearch,
    title: "Official text only",
    text: "Answers come from government scheme documents, quoted verbatim.",
  },
  {
    Icon: Scale,
    title: "Reasoned, not guessed",
    text: "Every verdict shows the rule it was checked against.",
  },
  {
    Icon: BadgeCheck,
    title: "Honest about limits",
    text: "If we can't verify something, we say so — we never invent an entitlement.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
          Know what you&apos;re owed.
        </h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Government schemes exist for you — but finding out which ones is hard. Describe your
          situation and Adhikaar checks 15 central welfare schemes against their official rules,
          showing you why, what documents you need, and how to apply.
        </p>
        <ul className="mt-1 grid gap-3 sm:grid-cols-3">
          {PILLARS.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-2.5 text-sm leading-snug">
              <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="font-medium text-foreground">{title}.</span>{" "}
                <span className="text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <ChatPanel />
    </div>
  );
}
