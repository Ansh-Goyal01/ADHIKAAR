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
import { ProfileChips } from "@/components/assess/profile-chips";
import { ResultCard } from "@/components/assess/result-card";
import { Container } from "@/components/site/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ApiError, assess } from "@/lib/api";
import { DISCLAIMER, SCHEME_COUNT } from "@/lib/site";
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

async function computeAssessment(message: string, profile: UserProfile): Promise<Phase> {
  try {
    const response = await assess(message, profile);
    if (response.status === "need_info") {
      return {
        kind: "need-info",
        question:
          response.question ??
          "Could you share a little more about your age, work, and family income?",
        profile: response.profile,
      };
    }
    return { kind: "ok", response };
  } catch (error) {
    return {
      kind: "error",
      message:
        error instanceof ApiError
          ? error.message
          : "Something unexpected went wrong. Please try again.",
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
  const [phase, setPhase] = React.useState<Phase>({ kind: "loading" });
  const [followUp, setFollowUp] = React.useState("");
  const [followUpBusy, setFollowUpBusy] = React.useState(false);

  const code = searchParams.get("p");
  const answers = React.useMemo(
    () => (isClient ? loadAnswers(code) : undefined),
    [code, isClient],
  );

  // Event-handler re-runs (retry, follow-up answers) may show the loader eagerly.
  const runAssessment = async (message: string, profile: UserProfile) => {
    setPhase({ kind: "loading" });
    setPhase(await computeAssessment(message, profile));
  };

  React.useEffect(() => {
    if (!answers) return;
    let cancelled = false;
    void computeAssessment("", answersToProfile(answers)).then((next) => {
      if (!cancelled) setPhase(next);
    });
    return () => {
      cancelled = true;
    };
  }, [answers]);

  const handleCopyLink = async () => {
    // Derive the code from loaded answers when the URL doesn't carry one, so
    // the copied link always reproduces this report for its recipient.
    const shareCode = code ?? (answers ? encodeAnswers(answers) : null);
    if (!shareCode) return;
    const url = `${window.location.origin}/results?p=${shareCode}`;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied — anyone with it sees this report, so share with care.");
    } catch {
      toast("Couldn't copy automatically — you can copy the address bar instead.");
    }
  };

  if (isClient && answers === null) {
    return (
      <EmptyState
        title="No answers to check yet"
        body="Tell us about your situation first — it takes about three minutes, and nothing is stored."
        action={
          <ButtonLink href="/check">
            Check your eligibility
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
            Preparing your report
          </h1>
          <p className="leading-relaxed text-muted-foreground" role="status">
            {`Checking your answers against the official rules of ${SCHEME_COUNT} schemes — this usually takes under half a minute.`}
          </p>
        </div>
        <ResultsSkeleton />
      </div>
    );
  }

  if (phase.kind === "error") {
    return (
      <ErrorState
        title="We couldn't finish your report"
        body={phase.message}
        action={
          <Button
            variant="secondary"
            onClick={() => {
              if (answers) void runAssessment("", answersToProfile(answers));
            }}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
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
            One more thing before your report
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
          <Field id="follow-up" label="Your answer" help="Plain words are perfect.">
            <Input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Type your answer"
            />
          </Field>
          <Button type="submit" disabled={!followUp.trim() || followUpBusy} className="w-fit">
            Continue to my report
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    );
  }

  const { response } = phase;
  const groups = groupResults(response.results);
  const reportDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Report header */}
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Eligibility report · {reportDate}
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {groups.entitled.length > 0
            ? `You may be entitled to ${groups.entitled.length} ${groups.entitled.length === 1 ? "scheme" : "schemes"}`
            : "We couldn't confirm an entitlement yet"}
        </h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          {groups.entitled.length > 0
            ? "Based on what you told us and the official rules, here is where you stand — including exactly why, what to bring, and where to apply."
            : groups.moreInfo.length > 0
              ? "A few schemes need one more detail each before we can say — they're listed below with exactly what to confirm."
              : `Based on what you told us, none of the ${SCHEME_COUNT} covered schemes matched — the reasons are below, and the rules they rest on are linked.`}
        </p>

        <ProfileChips profile={response.profile} />

        <div className="print-hidden flex flex-wrap gap-2 pt-1">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="size-4" aria-hidden="true" />
            Print or save as PDF
          </Button>
          <Button variant="secondary" onClick={handleCopyLink}>
            <Link2 className="size-4" aria-hidden="true" />
            Copy shareable link
          </Button>
          <ButtonLink variant="ghost" href="/check">
            <RefreshCw className="size-4" aria-hidden="true" />
            Change my answers
          </ButtonLink>
        </div>
      </header>

      {groups.entitled.length > 0 && (
        <section aria-label="Schemes you appear entitled to" className="flex flex-col gap-5">
          <SectionHeading
            icon={CheckCircle2}
            tone="yes"
            title="You appear entitled"
            lead="Verdicts marked “likely” rest on facts the office will verify, like the BPL list."
            count={groups.entitled.length}
          />
          <div className="flex flex-col gap-4">
            {groups.entitled.map((result) => (
              <ResultCard key={result.scheme_id} result={result} />
            ))}
          </div>
        </section>
      )}

      {groups.moreInfo.length > 0 && (
        <section aria-label="Schemes that need more information" className="flex flex-col gap-5">
          <SectionHeading
            icon={HelpCircle}
            tone="info"
            title="Worth checking — one detail missing"
            lead="We'd rather ask than guess. Each card says exactly what to confirm."
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
        <section aria-label="Schemes you don't qualify for" className="flex flex-col gap-5">
          <SectionHeading
            icon={MinusCircle}
            tone="no"
            title="Not a match right now"
            lead="Each card shows the specific rule that wasn't met — circumstances change, and so can this."
            count={groups.notEligible.length}
          />
          <div className="flex flex-col gap-4">
            {groups.notEligible.map((result) => (
              <ResultCard key={result.scheme_id} result={result} />
            ))}
          </div>
        </section>
      )}

      <footer className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        {DISCLAIMER}
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
