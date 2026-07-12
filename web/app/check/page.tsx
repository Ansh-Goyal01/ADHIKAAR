"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Bookmark, FileText, Pencil } from "lucide-react";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { useToast } from "@/components/ui/toast";
import { useIsClient } from "@/lib/use-is-client";
import {
  type Answers,
  type FieldDef,
  type StepDef,
  STORAGE_KEY,
  decodeAnswers,
  encodeAnswers,
  visibleFields,
  visibleSteps,
} from "@/lib/wizard";

function WhyWeAsk({ children }: { children: React.ReactNode }) {
  return (
    <details className="group mt-1">
      <summary className="w-fit cursor-pointer list-none text-sm font-medium text-accent underline-offset-2 hover:underline">
        Why we ask
      </summary>
      <p className="mt-1.5 rounded-lg bg-accent-soft p-3 text-sm leading-relaxed text-accent-soft-foreground">
        {children}
      </p>
    </details>
  );
}

function WizardField({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: Answers[string];
  error?: string;
  onChange: (value: Answers[string]) => void;
}) {
  if (field.type === "radio" || field.type === "yesno") {
    return (
      <div>
        <RadioGroup
          legend={field.label}
          name={field.key}
          options={field.options ?? []}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
          help={field.help}
          error={error}
          columns={field.type === "yesno"}
        />
        {field.whyWeAsk && <WhyWeAsk>{field.whyWeAsk}</WhyWeAsk>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <Field
          id={field.key}
          label={field.label}
          help={field.help}
          error={error}
          optional={field.optional}
        >
          <Select
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value || null)}
          >
            <option value="">{field.placeholder ?? "Choose"}</option>
            {(field.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        {field.whyWeAsk && <WhyWeAsk>{field.whyWeAsk}</WhyWeAsk>}
      </div>
    );
  }

  return (
    <div>
      <Field
        id={field.key}
        label={field.label}
        help={field.help}
        error={error}
        optional={field.optional}
      >
        <Input
          type="number"
          inputMode="numeric"
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? null : Number(raw));
          }}
          className="max-w-52"
        />
      </Field>
      {field.whyWeAsk && <WhyWeAsk>{field.whyWeAsk}</WhyWeAsk>}
    </div>
  );
}

function validateStep(step: StepDef, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of visibleFields(step, answers)) {
    const value = answers[field.key];
    if (field.type === "number") {
      if (typeof value === "number") {
        if (
          (field.min !== undefined && value < field.min) ||
          (field.max !== undefined && value > field.max)
        ) {
          errors[field.key] =
            `Please enter a number between ${field.min} and ${field.max}.`;
        }
      } else if (!field.optional) {
        errors[field.key] = field.errorText ?? "Please fill this in before continuing.";
      }
    } else if (!field.optional && (value === null || value === undefined || value === "")) {
      errors[field.key] =
        field.errorText ?? "Please choose an answer — “Not sure” is always fine.";
    }
  }
  return errors;
}

const ANSWER_LABEL: Record<string, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

function ReviewStep({
  steps,
  answers,
  onEdit,
}: {
  steps: StepDef[];
  answers: Answers;
  onEdit: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const fields = visibleFields(step, answers).filter(
          (f) => answers[f.key] !== null && answers[f.key] !== undefined && answers[f.key] !== "",
        );
        if (fields.length === 0) return null;
        return (
          <section
            key={step.id}
            aria-label={step.title}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 className="font-semibold">{step.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(index)}>
                <Pencil className="size-3.5" aria-hidden="true" />
                Edit
              </Button>
            </div>
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {fields.map((field) => {
                const raw = answers[field.key];
                const display =
                  typeof raw === "number"
                    ? field.key === "annual_family_income_inr"
                      ? `₹${raw.toLocaleString("en-IN")}`
                      : String(raw)
                    : (field.options?.find((o) => o.value === raw)?.label ??
                      ANSWER_LABEL[String(raw)] ??
                      String(raw));
                return (
                  <div key={field.key} className="flex flex-col">
                    <dt className="text-xs text-muted-foreground">{field.label}</dt>
                    <dd className="text-sm font-medium">{display}</dd>
                  </div>
                );
              })}
            </dl>
          </section>
        );
      })}
    </div>
  );
}

export default function CheckPage() {
  const router = useRouter();
  const toast = useToast();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const isClient = useIsClient();
  // Lazy-initialised from this browser's saved answers; during SSR the
  // initialiser runs without localStorage and yields a fresh start.
  const [answers, setAnswers] = React.useState<Answers>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? decodeAnswers(saved) : null;
      return parsed ?? {};
    } catch {
      return {}; // Private mode or blocked storage — start fresh.
    }
  });
  const [stepIndex, setStepIndex] = React.useState(0);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const [resumeCode, setResumeCode] = React.useState("");
  const [resumeError, setResumeError] = React.useState<string | undefined>();

  // Autosave as the person types — losing answers is the one unforgivable bug.
  React.useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(STORAGE_KEY, encodeAnswers(answers));
    } catch {
      // Storage unavailable; save-and-resume codes still work.
    }
  }, [answers, isClient]);

  const steps = visibleSteps(answers);
  const totalSteps = steps.length + 1; // + review
  const isReview = stepIndex >= steps.length;
  const step = isReview ? null : steps[stepIndex];

  const focusHeading = () => {
    // Move focus to the step heading so screen readers announce the change.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const goTo = (index: number) => {
    setErrors({});
    setStepIndex(index);
    window.scrollTo({ top: 0 });
    focusHeading();
  };

  const handleContinue = () => {
    if (step) {
      const stepErrors = validateStep(step, answers);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    goTo(stepIndex + 1);
  };

  const handleSubmit = () => {
    const code = encodeAnswers(answers);
    router.push(`/results?p=${code}`);
  };

  const handleSaveCode = async () => {
    const code = encodeAnswers(answers);
    try {
      await navigator.clipboard.writeText(code);
      toast("Resume code copied — paste it here any time to continue.");
    } catch {
      toast(`Your resume code: ${code}`);
    }
  };

  const handleResume = () => {
    const parsed = decodeAnswers(resumeCode.trim());
    if (!parsed) {
      setResumeError("That code doesn't look right. Check it and try again.");
      return;
    }
    setAnswers(parsed);
    setResumeError(undefined);
    setResumeOpen(false);
    setResumeCode("");
    toast("Welcome back — your answers are restored.");
  };

  // Until the client takes over, mirror the server-rendered shell exactly —
  // saved answers may differ from the fresh-start HTML.
  if (!isClient) {
    return (
      <Container className="max-w-2xl py-10 sm:py-14">
        <p className="text-muted-foreground" role="status">
          Loading your questions…
        </p>
      </Container>
    );
  }

  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <div className="flex flex-col gap-8">
        <Stepper
          current={Math.min(stepIndex + 1, totalSteps)}
          total={totalSteps}
          label={isReview ? "Check your answers" : (step?.title ?? "")}
        />

        <div className="flex flex-col gap-2">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-serif text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
          >
            {isReview ? "Check your answers" : step?.title}
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            {isReview
              ? "A quick look before we prepare your report. You can change anything."
              : (step?.lead ??
                "Answer what you can — “Not sure” is always allowed, and nothing is stored.")}
          </p>
        </div>

        {isReview ? (
          <ReviewStep steps={steps} answers={answers} onEdit={goTo} />
        ) : (
          <div className="flex flex-col gap-7">
            {step &&
              visibleFields(step, answers).map((field) => (
                <WizardField
                  key={field.key}
                  field={field}
                  value={answers[field.key] ?? null}
                  error={errors[field.key]}
                  onChange={(value) => {
                    setAnswers((prev) => ({ ...prev, [field.key]: value }));
                    setErrors((prev) => {
                      if (!prev[field.key]) return prev;
                      const next = { ...prev };
                      delete next[field.key];
                      return next;
                    });
                  }}
                />
              ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div>
            {stepIndex > 0 && (
              <Button variant="secondary" onClick={() => goTo(stepIndex - 1)}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleSaveCode}>
              <Bookmark className="size-4" aria-hidden="true" />
              Save &amp; resume later
            </Button>
            {isReview ? (
              <Button onClick={handleSubmit}>
                <FileText className="size-4" aria-hidden="true" />
                Get my report
              </Button>
            ) : (
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {resumeOpen ? (
            <div className="flex flex-col gap-2">
              <Field
                id="resume-code"
                label="Resume code"
                error={resumeError}
                help="Paste the code you copied earlier to pick up where you left off."
              >
                <Input
                  value={resumeCode}
                  onChange={(e) => setResumeCode(e.target.value)}
                  placeholder="Paste your code"
                />
              </Field>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={handleResume}>
                  Restore my answers
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setResumeOpen(false)}>
                  Never mind
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="text-accent underline-offset-2 hover:underline"
            >
              Have a resume code?
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
