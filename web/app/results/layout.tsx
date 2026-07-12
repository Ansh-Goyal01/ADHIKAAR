import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your eligibility report",
  description:
    "Where you stand with 15 central government schemes — every verdict cited to the official scheme text.",
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
