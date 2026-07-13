import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  FileSearch,
  MessageCircleQuestion,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { OUT_OF_SCOPE_COUNT, PENDING_COUNT, RULE_COUNT, SCHEME_COUNT } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Adhikaar turns your answers into a cited eligibility report: official rules, a deterministic rules engine, and a verifier that checks every claim against the source.",
};

const PIPELINE = [
  {
    icon: MessageCircleQuestion,
    title: "Your situation",
    body: "You answer a few plain questions — age, work, household. No login, and nothing is stored anywhere.",
  },
  {
    icon: FileSearch,
    title: "Official rules are retrieved",
    body: `The scheme text comes straight from government sources — myScheme and official guidelines — kept with its section labels and source links. ${SCHEME_COUNT} central schemes, ${RULE_COUNT} encoded rules.`,
  },
  {
    icon: Scale,
    title: "A rules engine decides — not the AI",
    body: "Each eligibility clause is written down as an executable rule. Your answers are checked against them deterministically: met, not met, or unknown. Unknown never becomes a guess — it becomes a question.",
  },
  {
    icon: ShieldCheck,
    title: "A verifier checks every claim",
    body: "Before anything reaches you, every sentence of the explanation is checked against the official text it cites. Claims that can't be verified are dropped.",
  },
  {
    icon: BadgeCheck,
    title: "You get a cited answer",
    body: "Every verdict comes with the exact clause it rests on, a link to the official source, and honest “likely” wording where the office still has to verify a fact.",
  },
];

const PRINCIPLES = [
  {
    title: "We never invent an entitlement",
    body: "A wrong “you qualify” costs real people bus fare, queues, and hope. The rules engine can only conclude what the encoded official clauses support. In our evaluation it asserted zero false entitlements across 92 judgments — the AI-only baseline asserted 16.",
  },
  {
    title: "“Not sure” is a first-class answer",
    body: "Eligibility rules have three outcomes here: met, not met, and unknown. Anything unknown turns into a question or an honest “needs one more detail” — never a silent assumption.",
  },
  {
    title: "Some facts only the office can verify",
    body: "Whether your family is on the BPL or SECC list can't be checked from a conversation. Verdicts that rest on such facts are marked “likely eligible” and the report says exactly what to confirm.",
  },
  {
    title: "Freshness is visible",
    body: "Every scheme page shows the date its official text was fetched and verified. If the text is a transcription (one scanned PDF is), that's disclosed too.",
  },
];

const LIMITATIONS = [
  `The eligibility check decides ${SCHEME_COUNT} central schemes today. ${PENDING_COUNT} more are documented in the catalog with machine-drafted rules awaiting human verification — each joins the check only when a person has certified every rule against its official source. ${OUT_OF_SCOPE_COUNT === 1 ? "One more is listed for reference only: its applicant is an institution, not an individual, so a personal check can't apply." : ""}`,
  "State schemes — often the most relevant — aren't included yet, so “not eligible here” never means “not eligible anywhere”.",
  "Answers are self-reported. The final decision always rests with the implementing authority, and the report is designed to be taken to them — not to replace them. Where a verdict rests on a fact only the office can verify (BPL or SECC lists), the report now says exactly what to confirm and where.",
  "A few rarely-triggered criteria are simplified — for example, PM-KISAN's exclusions for constitutional-post holders and practicing professionals are now encoded, while notified-crop areas (PMFBY) and the two-accounts-per-family cap (Sukanya Samriddhi) are not. Every remaining simplification is listed in the open-source rule files, beside the rule it affects.",
  "English only, for now.",
];

export default function HowItWorksPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-14 py-10 sm:py-14">
      {/* Intro */}
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Built so you can check its work
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Most AI tools answer eligibility questions by searching documents and
          summarising what they find. That can sound right and be wrong. Adhikaar
          separates the jobs: language models only read and explain — a
          deterministic rules engine decides, and a verifier checks every claim
          against the official text before you see it.
        </p>
      </div>

      {/* Pipeline */}
      <section aria-labelledby="pipeline-heading" className="flex flex-col gap-6">
        <h2 id="pipeline-heading" className="font-serif text-2xl font-semibold tracking-tight">
          From your answers to a cited report
        </h2>
        <ol className="flex flex-col">
          {PIPELINE.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="relative flex gap-4 pb-8 last:pb-0">
              {index < PIPELINE.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 left-5 h-[calc(100%-2.75rem)] w-px bg-border"
                />
              )}
              <span className="z-10 flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent shadow-card">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Measured, honestly */}
      <section
        aria-labelledby="measured-heading"
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card"
      >
        <h2 id="measured-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Measured, honestly
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We tested the rules engine against a plain AI baseline on the same 41
          labeled cases — same retrieval, same underlying model, only the decider
          differs.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-lg bg-background p-4">
            <span className="font-serif text-3xl font-semibold text-verdict-yes">0</span>
            <span className="text-sm leading-snug text-muted-foreground">
              false entitlements asserted by the rules engine (the AI baseline asserted 16)
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-background p-4">
            <span className="font-serif text-3xl font-semibold text-foreground">91%</span>
            <span className="text-sm leading-snug text-muted-foreground">
              eligibility accuracy, against 57% for the AI-only baseline
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-background p-4">
            <span className="font-serif text-3xl font-semibold text-foreground">2.7×</span>
            <span className="text-sm leading-snug text-muted-foreground">
              more of its claims verifiably supported by the cited official text
            </span>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Small labeled evaluation set — treat these as engineering counts, not
          population statistics. The full methodology and raw results are in the
          open-source repository.
        </p>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="flex flex-col gap-6">
        <h2 id="principles-heading" className="font-serif text-2xl font-semibold tracking-tight">
          The principles behind it
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <h3 className="flex items-start gap-2 font-semibold">
                <BookOpenCheck className="mt-0.5 size-4.5 shrink-0 text-accent" aria-hidden="true" />
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section aria-labelledby="limits-heading" className="flex flex-col gap-4">
        <h2 id="limits-heading" className="font-serif text-2xl font-semibold tracking-tight">
          What this can&rsquo;t do (yet)
        </h2>
        <ul className="flex flex-col gap-2.5">
          {LIMITATIONS.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-card">
        <p className="max-w-md font-serif text-xl font-semibold tracking-tight text-balance">
          The best way to understand it is to try it.
        </p>
        <ButtonLink href="/check">
          Check your eligibility
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Container>
  );
}
