"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Link2,
  MinusCircle,
  Printer,
  RefreshCw,
} from "lucide-react";

import { ResultsSkeleton } from "@/components/assess/skeletons";
import { DocumentChecklist } from "@/components/assess/document-checklist";
import { FeedbackForm } from "@/components/assess/feedback-form";
import { ProfileChips } from "@/components/assess/profile-chips";
import { ResultCard } from "@/components/assess/result-card";
import { WhatIf } from "@/components/assess/what-if";
import { Container } from "@/components/site/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ReadAloud } from "@/components/ui/read-aloud";
import { ApiError, assess } from "@/lib/api";
import { useLanguage, useT } from "@/lib/i18n";
import { SCHEME_COUNT } from "@/lib/site";
import type { AssessResponse, SchemeResult, UserProfile } from "@/lib/types";
import { useIsClient } from "@/lib/use-is-client";
import {
  type Answers,
  STORAGE_KEY,
  answersToProfile,
  decodeAnswers,
  encodeAnswers,
} from "@/lib/wizard";

type Phase =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "need-info"; question: string; profile: UserProfile }
  | { kind: "ok"; response: AssessResponse };

async function computeAssessment(
  message: string,
  profile: UserProfile,
  lang: string,
  fallbacks: { needInfo: string; error: string },
): Promise<Phase> {
  try {
    const response = await assess(message, profile, lang);
    if (response.status === "need_info") {
      return {
        kind: "need-info",
        question: response.question ?? fallbacks.needInfo,
        profile: response.profile,
      };
    }
    return { kind: "ok", response };
  } catch (error) {
    return {
      kind: "error",
      message: error instanceof ApiError ? error.message : fallbacks.error,
    };
  }
}

/** Answers from the share link, falling back to this browser's saved wizard. */
function loadAnswers(code: string | null): Answers | null {
  let answers = code ? decodeAnswers(code) : null;
  if (!answers) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) answers = decodeAnswers(saved);
    } catch {
      // storage unavailable — fall through to the empty state
    }
  }
  return answers && Object.keys(answers).length > 0 ? answers : null;
}

function groupResults(results: SchemeResult[]) {
  const entitled = results.filter(
    (r) => r.verdict === "eligible" || r.verdict === "likely_eligible",
  );
  return {
    entitled: [
      ...entitled.filter((r) => r.verdict === "eligible"),
      ...entitled.filter((r) => r.verdict === "likely_eligible"),
    ],
    moreInfo: results.filter((r) => r.verdict === "need_more_info"),
    notEligible: results.filter((r) => r.verdict === "not_eligible"),
  };
}

function SectionHeading({
  icon: Icon,
  tone,
  title,
  lead,
  count,
}: {
  icon: typeof CheckCircle2;
  tone: "yes" | "info" | "no";
  title: string;
  lead: string;
  count: number;
}) {
  const toneClass = {
    yes: "bg-verdict-yes-soft text-verdict-yes",
    info: "bg-verdict-info-soft text-verdict-info",
    no: "bg-verdict-no-soft text-verdict-no",
  }[tone];
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${toneClass}`}>
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
          {title} <span className="text-muted-foreground">({count})</span>
        </h2>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{lead}</p>
      </div>
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const isClient = useIsClient();
  const t = useT();
  const { lang } = useLanguage();
  const [phase, setPhase] = React.useState<Phase>({ kind: "loading" });
  const [followUp, setFollowUp] = React.useState("");
  const [followUpBusy, setFollowUpBusy] = React.useState(false);

  const code = searchParams.get("p");
  const answers = React.useMemo(
    () => (isClient ? loadAnswers(code) : undefined),
    [code, isClient],
  );

  const fallbacks = React.useMemo(
    () => ({ needInfo: t("results.needInfoFallback"), error: t("results.errorFallback") }),
    [t],
  );

  // Event-handler re-runs (retry, follow-up answers) may show the loader eagerly.
  const runAssessment = async (message: string, profile: UserProfile) => {
    setPhase({ kind: "loading" });
    setPhase(await computeAssessment(message, profile, lang, fallbacks));
  };

  // Re-runs when the language changes too: same verdicts (language-invariant
  // by construction), freshly translated prose.
  React.useEffect(() => {
    if (!answers) return;
    let cancelled = false;
    void computeAssessment("", answersToProfile(answers), lang, fallbacks).then((next) => {
      if (!cancelled) setPhase(next);
    });
    return () => {
      cancelled = true;
    };
  }, [answers, lang, fallbacks]);

  const handleCopyLink = async () => {
    // Derive the code from loaded answers when the URL doesn't carry one, so
    // the copied link always reproduces this report for its recipient.
    const shareCode = code ?? (answers ? encodeAnswers(answers) : null);
    if (!shareCode) return;
    const url = `${window.location.origin}/results?p=${shareCode}`;
    try {
      await navigator.clipboard.writeText(url);
      toast(t("results.linkCopied"));
    } catch {
      toast(t("results.linkCopyFailed"));
    }
  };

  if (isClient && answers === null) {
    return (
      <EmptyState
        title={t("results.emptyTitle")}
        body={t("results.emptyBody")}
        action={
          <ButtonLink href="/check">
            {t("results.emptyAction")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        }
      />
    );
  }

  if (phase.kind === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("results.preparing")}
          </h1>
          <p className="leading-relaxed text-muted-foreground" role="status">
            {t("results.preparingBody", { count: SCHEME_COUNT })}
          </p>
        </div>
        <ResultsSkeleton />
      </div>
    );
  }

  if (phase.kind === "error") {
    return (
      <ErrorState
        title={t("results.errorTitle")}
        body={phase.message}
        action={
          <Button
            variant="secondary"
            onClick={() => {
              if (answers) void runAssessment("", answersToProfile(answers));
            }}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            {t("common.tryAgain")}
          </Button>
        }
      />
    );
  }

  if (phase.kind === "need-info") {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("results.needInfoTitle")}
          </h1>
          <p className="leading-relaxed text-muted-foreground">{phase.question}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!followUp.trim() || followUpBusy) return;
            setFollowUpBusy(true);
            void runAssessment(followUp.trim(), phase.profile).finally(() =>
              setFollowUpBusy(false),
            );
          }}
          className="flex flex-col gap-4"
        >
          <Field
            id="follow-up"
            label={t("results.yourAnswer")}
            help={t("results.plainWords")}
          >
            <Input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder={t("results.typeAnswer")}
            />
          </Field>
          <Button type="submit" disabled={!followUp.trim() || followUpBusy} className="w-fit">
            {t("results.continueToReport")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    );
  }

  const { response } = phase;
  const groups = groupResults(response.results);
  // Presentation-only date formatting; the date itself is canonical.
  const reportDate = new Date().toLocaleDateString(lang === "en" ? "en-IN" : `${lang}-IN`, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const headline =
    groups.entitled.length > 0
      ? groups.entitled.length === 1
        ? t("results.entitledTitleOne")
        : t("results.entitledTitleMany", { count: groups.entitled.length })
      : t("results.noEntitlementTitle");
  const headlineLead =
    groups.entitled.length > 0
      ? t("results.entitledLead")
      : groups.moreInfo.length > 0
        ? t("results.moreInfoLead")
        : t("results.noneLead", { count: SCHEME_COUNT });

  return (
    <div className="flex flex-col gap-10">
      {/* Report header */}
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {t("results.reportLabel")} · {reportDate}
        </p>
        <div className="flex items-start justify-between gap-2">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {headline}
          </h1>
          <ReadAloud text={`${headline}. ${headlineLead}`} />
        </div>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{headlineLead}</p>

        <ProfileChips profile={response.profile} />

        <div className="print-hidden flex flex-wrap gap-2 pt-1">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="size-4" aria-hidden="true" />
            {t("results.print")}
          </Button>
          <Button variant="secondary" onClick={handleCopyLink}>
            <Link2 className="size-4" aria-hidden="true" />
            {t("results.copyLink")}
          </Button>
          <ButtonLink variant="ghost" href="/check">
            <RefreshCw className="size-4" aria-hidden="true" />
            {t("results.changeAnswers")}
          </ButtonLink>
        </div>
      </header>

      {groups.entitled.length > 0 && (
        <section aria-label={t("results.entitledSection")} className="flex flex-col gap-5">
          <SectionHeading
            icon={CheckCircle2}
            tone="yes"
            title={t("results.entitledSection")}
            lead={t("results.entitledSectionLead")}
            count={groups.entitled.length}
          />
          <div className="flex flex-col gap-4">
            {groups.entitled.map((result) => (
              <ResultCard key={result.scheme_id} result={result} />
            ))}
          </div>
        </section>
      )}

      {groups.entitled.length > 0 && <DocumentChecklist results={groups.entitled} />}

      {groups.moreInfo.length > 0 && (
        <section aria-label={t("results.moreInfoSection")} className="flex flex-col gap-5">
          <SectionHeading
            icon={HelpCircle}
            tone="info"
            title={t("results.moreInfoSection")}
            lead={t("results.moreInfoSectionLead")}
            count={groups.moreInfo.length}
          />
          <div className="flex flex-col gap-4">
            {groups.moreInfo.map((result) => (
              <ResultCard key={result.scheme_id} result={result} />
            ))}
          </div>
        </section>
      )}

      {groups.notEligible.length > 0 && (
        <section aria-label={t("results.notEligibleSection")} className="flex flex-col gap-5">
          <SectionHeading
            icon={MinusCircle}
            tone="no"
            title={t("results.notEligibleSection")}
            lead={t("results.notEligibleSectionLead")}
            count={groups.notEligible.length}
          />
          <div className="flex flex-col gap-4">
            {groups.notEligible.map((result) => (
              <ResultCard key={result.scheme_id} result={result} />
            ))}
          </div>
        </section>
      )}

      <WhatIf profile={response.profile} baseline={response.results} lang={lang} />

      <FeedbackForm results={response.results} lang={lang} />

      <footer className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        {t("footer.disclaimer")}
      </footer>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <React.Suspense
        fallback={
          <div className="flex flex-col gap-6">
            <ResultsSkeleton />
          </div>
        }
      >
        <ResultsContent />
      </React.Suspense>
    </Container>
  );
}
