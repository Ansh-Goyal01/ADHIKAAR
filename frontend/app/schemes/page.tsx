import type { Metadata } from "next";

import { SchemeCatalog } from "@/components/schemes/catalog";
import { Container } from "@/components/site/container";
import { CHANGED_COUNT, FRESHNESS, LAST_CHECKED } from "@/lib/freshness";
import { CATALOG_COUNT, SCHEME_COUNT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore schemes",
  description: `Browse ${CATALOG_COUNT} central government welfare schemes — benefits, eligibility rules, documents, and official sources. ${SCHEME_COUNT} are covered by the eligibility check today.`,
};

export default function SchemesPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore the schemes
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          {`Every central scheme documented here carries its benefits, official sources, and — for the ${SCHEME_COUNT} schemes the eligibility check decides today — the exact rules we check. Schemes marked "check coming soon" have machine-drafted rules awaiting human verification; we don't judge eligibility for them until a person has certified every rule.`}
        </p>
        {FRESHNESS && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {`Freshness: all ${FRESHNESS.schemes_checked} myScheme-sourced pages were re-fetched and diffed against our audited text on ${LAST_CHECKED} — ${
              CHANGED_COUNT === 0
                ? "no changes found."
                : `${CHANGED_COUNT} changed and ${CHANGED_COUNT === 1 ? "is" : "are"} flagged on their pages.`
            }`}
          </p>
        )}
      </div>
      <SchemeCatalog />
    </Container>
  );
}
