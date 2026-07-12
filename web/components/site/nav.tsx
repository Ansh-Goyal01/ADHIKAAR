"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ScrollText, X } from "lucide-react";

import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/schemes", label: "Explore schemes" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-border bg-background/95">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ScrollText className="size-4.5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            Adhikaar
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground",
                pathname === href && "text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
          <ButtonLink href="/check" className="ml-2">
            Check eligibility
          </ButtonLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ButtonLink href="/check" size="sm">
            Check eligibility
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors duration-150 hover:bg-muted"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-border bg-background md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-foreground transition-colors duration-150 hover:bg-muted"
              >
                {label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
