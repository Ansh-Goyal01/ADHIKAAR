import type { Metadata } from "next";

import { SCHEME_COUNT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your eligibility report",
  description: `Where you stand with ${SCHEME_COUNT} central government schemes — every verdict cited to the official scheme text.`,
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
