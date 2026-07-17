import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CodeXml,
  FileText,
  ListChecks,
  MessageCircleQuestion,
  ScrollText,
  Scale,
} from "lucide-react";

import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { SCHEME_COUNT } from "@/lib/site";

const TRUST_ITEMS = [
  { icon: BookOpenCheck, label: "Grounded in official documents" },
  { icon: BadgeCheck, label: "Every claim cited" },
  { icon: ListChecks, label: `${SCHEME_COUNT} central schemes covered` },
  { icon: CodeXml, label: "Open source" },
];

const STEPS = [
  {
    icon: MessageCircleQuestion,
    title: "Tell us about yourself",
    body: "A few plain questions about your age, work, and household. No login, no documents, and nothing is stored.",
  },
  {
    icon: Scale,
    title: "We check the official rules",
    body: "Your answers are tested against each scheme's actual eligibility clauses — by rules written from the government's own text, not by guesswork.",
  },
  {
    icon: FileText,
    title: "You get a cited report",
    body: "For every scheme: why you qualify, what you'll receive, which documents to bring, and where to apply — each claim linked to its official source.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <Container className="flex flex-col items-center py-20 text-center sm:py-24">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Find out exactly what government support you&rsquo;re entitled to
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
            {`Answer a few plain questions. Adhikaar checks the official rules of ${SCHEME_COUNT} central government schemes and shows its work — every claim linked to the government's own words.`}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/check" size="lg">
              Check your eligibility
              <ArrowRight className="size-4.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Free · No login · Takes about 3 minutes
          </p>
        </Container>
      </section>

      {/* Trust strip */}
      <section aria-label="Why you can trust this" className="border-b border-border bg-card">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 md:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-2.5 text-center">
                <Icon className="size-4.5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2
              id="how-heading"
              className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              How it works
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Three steps from your situation to a report you can keep.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent-soft-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground tabular-nums">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-lg leading-snug font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Why this is different */}
      <section aria-labelledby="different-heading" className="border-y border-border bg-card">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2
              id="different-heading"
              className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Most tools search and summarise. Adhikaar decides — and proves it.
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              A chatbot that merely retrieves scheme text can sound confident and still be
              wrong — and a wrong &ldquo;you qualify&rdquo; costs real people real time and
              hope. Adhikaar works differently: every eligibility rule is written down from
              the official clause, your answers are checked against those rules
              deterministically, and a verifier confirms every sentence of the explanation
              against the source before you see it.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When we tested both approaches on the same cases, the plain-language AI
              invented 16 entitlements that didn&rsquo;t exist.{" "}
              <strong className="font-semibold text-foreground">
                Adhikaar&rsquo;s rules engine invented zero.
              </strong>{" "}
              And when it doesn&rsquo;t have enough information, it asks — it never
              guesses.
            </p>
            <ButtonLink href="/how-it-works" variant="secondary" className="w-fit">
              Read the full explanation
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-3" aria-hidden="true">
            {[
              { label: "Your situation", tone: "plain" },
              { label: "Official rules retrieved from government text", tone: "plain" },
              { label: "Deterministic rules engine decides", tone: "accent" },
              { label: "Verifier checks every claim against the source", tone: "plain" },
              { label: "Cited answer you can keep", tone: "plain" },
            ].map(({ label, tone }, index, list) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div
                  className={
                    tone === "accent"
                      ? "w-full rounded-lg border border-primary bg-accent-soft px-5 py-3.5 text-center text-sm font-semibold text-accent-soft-foreground"
                      : "w-full rounded-lg border border-border bg-background px-5 py-3.5 text-center text-sm font-medium text-foreground"
                  }
                >
                  {label}
                </div>
                {index < list.length - 1 && <span className="h-4 w-px bg-border" />}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="cta-heading">
        <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-24">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ScrollText className="size-6" aria-hidden="true" />
          </span>
          <h2
            id="cta-heading"
            className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Three minutes. No login. A report you can take to the office.
          </h2>
          <ButtonLink href="/check" size="lg">
            Check your eligibility
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
