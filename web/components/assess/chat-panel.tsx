"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowUp, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { assess } from "@/lib/api";
import type { SchemeResult, UserProfile } from "@/lib/types";
import { ProfileChips } from "./profile-chips";
import { ResultCard } from "./result-card";
import { ResultsSkeleton } from "./skeletons";

const EXAMPLES = [
  "I'm a 62-year-old farmer in Odisha. My family is on the BPL list and I own half an acre of land.",
  "I'm a 35-year-old widow in Bihar with a BPL card, working as a farm labourer.",
  "I sell vegetables from a cart in Delhi. I'm 30 and have a bank account.",
];

type Turn =
  | { kind: "user"; text: string }
  | { kind: "question"; text: string }
  | { kind: "results"; results: SchemeResult[] };

export function ChatPanel() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  async function submit(text: string) {
    const message = text.trim();
    if (!message || loading) return;
    setInput("");
    setError(null);
    setLoading(true);
    setTurns((t) => [...t, { kind: "user", text: message }]);
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));

    try {
      const response = await assess(message, profile);
      setProfile(response.profile);
      if (response.status === "need_info") {
        setTurns((t) => [
          ...t,
          { kind: "question", text: response.question ?? "Could you tell us a little more?" },
        ]);
      } else {
        setTurns((t) => [...t, { kind: "results", results: response.results }]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  const empty = turns.length === 0 && !loading;

  return (
    <section aria-label="Eligibility check" className="flex flex-col gap-6">
      {empty && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8">
          <h2 className="font-serif text-xl text-foreground">
            Tell us about your situation, in your own words
          </h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
            Your age, what you do, your family&apos;s income — whatever feels relevant. We check
            15 central government schemes and show you exactly why you qualify, quoting the
            official rules.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => submit(example)}
                className="w-fit max-w-full rounded-xl border border-border bg-background px-4 py-2 text-left text-sm leading-relaxed text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                “{example}”
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5" aria-live="polite">
        {turns.map((turn, i) => {
          if (turn.kind === "user") {
            return (
              <p
                key={i}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-[15px] leading-relaxed text-accent-foreground"
              >
                {turn.text}
              </p>
            );
          }
          if (turn.kind === "question") {
            return (
              <div
                key={i}
                className="mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-[15px] leading-relaxed text-foreground shadow-xs"
              >
                {turn.text}
              </div>
            );
          }
          return (
            <div key={i} className="space-y-4">
              {profile && <ProfileChips profile={profile} />}
              {turn.results.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-5 text-[15px] leading-relaxed text-foreground shadow-xs">
                  We couldn&apos;t match your situation to any of the 15 schemes we cover — that
                  doesn&apos;t mean nothing exists for you. State-level schemes aren&apos;t covered
                  here yet.
                </div>
              ) : (
                turn.results.map((result) => (
                  <ResultCard key={result.scheme_id} result={result} />
                ))
              )}
            </div>
          );
        })}

        {loading && (
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
              Reading the official scheme text and checking each rule…
            </p>
            <ResultsSkeleton />
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="sticky bottom-4 rounded-2xl border border-border bg-card p-2 shadow-md"
      >
        <label htmlFor="situation" className="sr-only">
          Describe your situation
        </label>
        <div className="flex items-end gap-2">
          <Textarea
            id="situation"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            placeholder={
              turns.length ? "Reply or add more detail…" : "For example: I'm 45, a widow in Bihar…"
            }
            rows={2}
            className="min-h-0 resize-none border-0 bg-transparent text-[15px] shadow-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            aria-label="Check my eligibility"
            className="mb-1 shrink-0 rounded-xl"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </section>
  );
}
