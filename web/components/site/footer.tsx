import Link from "next/link";

import { Container } from "@/components/site/container";
import { DISCLAIMER, GITHUB_URL, MYSCHEME_URL } from "@/lib/site";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/schemes", label: "Explore schemes" },
  { href: "/about", label: "About" },
  { href: "/check", label: "Check eligibility" },
];

export function SiteFooter() {
  return (
    <footer className="print-hidden mt-auto border-t border-border bg-card">
      <Container className="grid gap-8 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex max-w-md flex-col gap-3">
          <p className="font-serif text-lg font-semibold tracking-tight">Adhikaar</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Explore</p>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="w-fit text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Sources</p>
          <a
            href={MYSCHEME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            myScheme (Government of India)
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Source code on GitHub
          </a>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="py-4">
          <p className="text-xs text-muted-foreground">
            Scheme text belongs to the Government of India and is reproduced from public
            official sources. No personal data is collected or stored.
          </p>
        </Container>
      </div>
    </footer>
  );
}
