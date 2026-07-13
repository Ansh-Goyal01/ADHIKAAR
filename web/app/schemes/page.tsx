import type { Metadata } from "next";

import { SchemeCatalog } from "@/components/schemes/catalog";
import { Container } from "@/components/site/container";
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
      </div>
      <SchemeCatalog />
    </Container>
  );
}
