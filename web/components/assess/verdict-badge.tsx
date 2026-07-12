import { CheckCircle2, CircleDashed, HelpCircle, MinusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Verdict } from "@/lib/types";

const VERDICT_STYLES: Record<
  Verdict,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  eligible: {
    label: "You appear eligible",
    className: "border-verdict-yes-border bg-verdict-yes-soft text-verdict-yes",
    Icon: CheckCircle2,
  },
  likely_eligible: {
    label: "Likely eligible",
    className: "border-verdict-yes-border bg-verdict-yes-soft text-verdict-yes",
    Icon: CircleDashed,
  },
  need_more_info: {
    label: "Needs one more detail",
    className: "border-verdict-info-border bg-verdict-info-soft text-verdict-info",
    Icon: HelpCircle,
  },
  not_eligible: {
    label: "Not eligible for this one",
    className: "border-verdict-no-border bg-verdict-no-soft text-verdict-no",
    Icon: MinusCircle,
  },
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const { label, className, Icon } = VERDICT_STYLES[verdict];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium whitespace-nowrap",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </span>
  );
}
