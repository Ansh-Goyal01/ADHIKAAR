"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, FileText, Landmark } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { SchemeResult } from "@/lib/types";
import { CitationChip } from "./citation-chip";
import { VerdictBadge } from "./verdict-badge";

function Expandable({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="print-hidden flex w-full items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {/* Stays in the DOM so the printed report is complete even when collapsed. */}
      <div
        hidden={!open}
        className="print-block prose-sm pb-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-accent [&_a]:underline-offset-2 [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5"
      >
        <h5 className="mb-1 hidden font-semibold text-foreground print:block">{title}</h5>
        {children}
      </div>
    </div>
  );
}

export function ResultCard({ result }: { result: SchemeResult }) {
  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-serif text-lg leading-snug font-semibold">
            {result.scheme_name}
          </h3>
          <VerdictBadge verdict={result.verdict} />
        </div>
        <p className="text-[15px] leading-relaxed text-foreground">{result.summary}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {result.reasons.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Why — grounded in the official text
            </h4>
            <ul className="space-y-3">
              {result.reasons.map((reason, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  {reason.text}
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    {reason.citations.map((citation, j) => (
                      <CitationChip key={j} citation={citation} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.missing_info.length > 0 && (
          <div className="rounded-lg bg-verdict-info-soft p-3 text-sm leading-relaxed text-verdict-info">
            <span className="font-medium">To be sure, confirm: </span>
            {result.missing_info.join(" · ")}
          </div>
        )}

        {(result.confirm_before_applying?.length ?? 0) > 0 && (
          <div className="rounded-lg bg-verdict-info-soft p-3 text-sm leading-relaxed text-verdict-info">
            <p className="font-medium">
              Before you apply — this verdict rests on facts the office will
              verify:
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              {result.confirm_before_applying!.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {result.documents && (
          <Expandable
            title="Documents you'll need"
            icon={<FileText className="size-4 text-accent" aria-hidden="true" />}
          >
            <ReactMarkdown>{result.documents}</ReactMarkdown>
          </Expandable>
        )}
        {result.how_to_apply && (
          <Expandable
            title="How to apply"
            icon={<Landmark className="size-4 text-accent" aria-hidden="true" />}
          >
            <ReactMarkdown>{result.how_to_apply}</ReactMarkdown>
          </Expandable>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3">
          <a
            href={result.page_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-accent underline-offset-2 hover:underline"
          >
            Official scheme page <ExternalLink className="size-3" aria-hidden="true" />
          </a>
          {result.references.slice(0, 2).map((ref) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-accent underline-offset-2 hover:underline"
            >
              {ref.title} <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
