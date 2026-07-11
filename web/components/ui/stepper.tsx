import { cn } from "@/lib/utils";

interface StepperProps {
  /** 1-based current step. */
  current: number;
  total: number;
  /** Short name of the current step, read together with the count. */
  label: string;
  className?: string;
}

/** Wizard progress: a quiet track plus "Step X of Y" for everyone. */
export function Stepper({ current, total, label, className }: StepperProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground tabular-nums">
          Step {current} of {total}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}: ${label}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-250 ease-soft"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
