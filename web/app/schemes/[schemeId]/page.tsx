import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  FileText,
  Landmark,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { CATEGORY_LABELS, SCHEMES, getScheme } from "@/lib/schemes";

export function generateStaticParams() {
  return SCHEMES.map((scheme) => ({ schemeId: scheme.scheme_id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ schemeId: string }>;
}): Promise<Metadata> {
  const { schemeId } = await params;
  const scheme = getScheme(schemeId);
  if (!scheme) return {};
  return {
    title: scheme.short_name,
    description: scheme.benefit_snippet,
  };
}

const SECTION_ORDER: {
  key: "details" | "benefits" | "eligibility" | "exclusions" | "application" | "documents";
  title: string;
  icon: typeof FileText;
}[] = [
  { key: "details", title: "Overview", icon: ScrollText },
  { key: "benefits", title: "What you get", icon: BadgeCheck },
  { key: "eligibility", title: "Who is eligible", icon: ShieldCheck },
  { key: "exclusions", title: "Who is not eligible", icon: ShieldCheck },
  { key: "documents", title: "Documents you'll need", icon: FileText },
  { key: "application", title: "How to apply", icon: Landmark },
];

const markdownStyles =
  "text-[15px] leading-relaxed text-foreground/85 [&_a]:text-accent [&_a]:underline-offset-2 [&_h1]:mt-4 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-2 [&_strong]:text-foreground [&_table]:mt-2 [&_table]:block [&_table]:overflow-x-auto [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-border [&_th]:px-2 [&_th]:py-1 [&_ul]:list-disc [&_ul]:pl-5 first:[&>*]:mt-0";

export default async function SchemeDetailPage({
  params,
}: {
  params: Promise<{ schemeId: string }>;
}) {
  const { schemeId } = await params;
  const scheme = getScheme(schemeId);
  if (!scheme) notFound();

  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10 sm:py-14">
      {/* Header */}
      <header className="flex flex-col gap-4">
        <Link
          href="/schemes"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All schemes
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="neutral">{CATEGORY_LABELS[scheme.category] ?? scheme.category}</Chip>
          {scheme.fetched_at && (
            <Chip tone="accent">
              <BadgeCheck aria-hidden="true" />
              Verified against official text on {scheme.fetched_at}
            </Chip>
          )}
        </div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {scheme.name}
        </h1>
        <p className="text-sm text-muted-foreground">{scheme.ministry}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <ButtonLink href="/check">
            Check if you qualify
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <a
            href={scheme.page_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium shadow-xs transition-colors duration-150 hover:bg-muted"
          >
            Official scheme page
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Official sections */}
      {SECTION_ORDER.map(({ key, title, icon: Icon }) => {
        const text = scheme.sections[key];
        if (!text) return null;
        return (
          <section key={key} aria-labelledby={`section-${key}`} className="flex flex-col gap-3">
            <h2
              id={`section-${key}`}
              className="flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              {title}
            </h2>
            <div className={markdownStyles}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          </section>
        );
      })}

      {/* The exact rules Adhikaar checks */}
      {scheme.rules.length > 0 && (
        <section aria-labelledby="section-rules" className="flex flex-col gap-3">
          <h2
            id="section-rules"
            className="flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight sm:text-2xl"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent-soft-foreground">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            The exact rules we check
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Adhikaar&rsquo;s verdicts for this scheme rest on these clauses of
            official text, checked one by one against your answers — never on
            guesswork.
          </p>
          <ul className="flex flex-col gap-3">
            {scheme.rules.map((rule) => (
              <li
                key={rule.id}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <Chip tone={rule.kind === "require" ? "yes" : "no"} className="w-fit">
                  {rule.kind === "require" ? "Required condition" : "Exclusion"}
                </Chip>
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  “{rule.clause}”
                </blockquote>
                <a
                  href={rule.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1 text-xs font-medium text-accent underline-offset-2 hover:underline"
                >
                  View the official source
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* References */}
      {scheme.references.length > 0 && (
        <section aria-labelledby="section-refs" className="flex flex-col gap-3">
          <h2 id="section-refs" className="font-serif text-xl font-semibold tracking-tight">
            Official references
          </h2>
          <ul className="flex flex-col gap-1.5">
            {scheme.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
                >
                  {ref.title}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Closing CTA */}
      <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 shadow-card">
        <p className="font-serif text-lg font-semibold tracking-tight">
          Wondering if this applies to you?
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Answer a few plain questions and we&rsquo;ll check this scheme — and
          the other fourteen — against the official rules.
        </p>
        <ButtonLink href="/check">
          Check your eligibility
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Container>
  );
}
