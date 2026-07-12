import type { Metadata } from "next";

import { SchemeCatalog } from "@/components/schemes/catalog";
import { Container } from "@/components/site/container";
import { SCHEME_COUNT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore schemes",
  description: `Browse the ${SCHEME_COUNT} central government welfare schemes Adhikaar covers — benefits, eligibility rules, documents, and official sources.`,
};

export default function SchemesPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore the schemes
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Every central scheme Adhikaar covers, with its benefits, the exact
          eligibility rules we check, and links to the official source. Not sure
          where to start? The eligibility check reads all of them for you.
        </p>
      </div>
      <SchemeCatalog />
    </Container>
  );
}
