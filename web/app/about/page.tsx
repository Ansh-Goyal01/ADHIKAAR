import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { DISCLAIMER, GITHUB_URL, MYSCHEME_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Adhikaar exists: welfare entitlements are rights, and finding out what you're owed shouldn't require an expert.",
};

export default function AboutPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-12 py-10 sm:py-14">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Adhikaar means &ldquo;right&rdquo; — because that&rsquo;s what these are
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          India runs some of the largest welfare programmes in the world, but
          knowing what you&rsquo;re entitled to still takes expertise most people
          don&rsquo;t have: the rules live across portals and PDFs, in language
          written for administrators. Many entitlements go unclaimed not because
          people don&rsquo;t qualify, but because they never find out they do.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Adhikaar is an attempt to close that gap carefully. It answers one
          question — <em>&ldquo;what am I entitled to?&rdquo;</em> — for fifteen
          central schemes, in plain language, with every claim traceable to the
          government&rsquo;s own text. It would rather say &ldquo;not sure, ask
          this at the office&rdquo; than be confidently wrong.
        </p>
      </div>

      <section aria-labelledby="open-heading" className="flex flex-col gap-3">
        <h2 id="open-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Open source, verifiable
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The whole system is open: the rules files (one clause of official text
          per rule), the evaluation dataset and results, and this site. If you
          find a rule that&rsquo;s wrong or out of date, you can point at the
          exact line — and fix it.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            Source code and rule files on GitHub
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href={MYSCHEME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            myScheme — the official scheme portal
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="privacy-heading" className="flex flex-col gap-3">
        <h2 id="privacy-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Privacy, simply
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          There are no accounts and no database of people. Your answers live in
          your browser and in the link or resume code you choose to keep; they are
          sent to the eligibility engine only to compute your report, and are not
          stored there.
        </p>
      </section>

      <section aria-labelledby="disclaimer-heading" className="flex flex-col gap-3">
        <h2 id="disclaimer-heading" className="font-serif text-2xl font-semibold tracking-tight">
          The honest fine print
        </h2>
        <p className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-card">
          {DISCLAIMER}
        </p>
      </section>

      <section aria-labelledby="contact-heading" className="flex flex-col gap-3">
        <h2 id="contact-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Contact
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Found a mistake in a rule, or want to help cover more schemes?{" "}
          <a
            href={`${GITHUB_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            Open an issue on GitHub
          </a>{" "}
          — corrections are the most valuable contribution this project can get.
        </p>
      </section>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-card">
        <p className="max-w-md font-serif text-xl font-semibold tracking-tight text-balance">
          Find out what you&rsquo;re owed.
        </p>
        <ButtonLink href="/check">
          Check your eligibility
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Container>
  );
}
