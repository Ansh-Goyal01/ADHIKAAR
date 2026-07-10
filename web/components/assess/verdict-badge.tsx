import { CheckCircle2, CircleDashed, HelpCircle, MinusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Verdict } from "@/lib/types";

const VERDICT_STYLES: Record<
  Verdict,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  eligible: {
    label: "You appear eligible",
    className: "bg-eligible-soft text-eligible border-eligible/25",
    Icon: CheckCircle2,
  },
  likely_eligible: {
    label: "Likely eligible",
    className: "bg-eligible-soft text-eligible border-eligible/25",
    Icon: CircleDashed,
  },
  need_more_info: {
    label: "Needs one more detail",
    className: "bg-caution-soft text-caution border-caution/25",
    Icon: HelpCircle,
  },
  not_eligible: {
    label: "Not eligible for this one",
    className: "bg-muted text-muted-foreground border-border",
    Icon: MinusCircle,
  },
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const { label, className, Icon } = VERDICT_STYLES[verdict];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </span>
  );
}
