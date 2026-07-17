"use client";

// Searchable, filterable scheme catalog. All data is static — filtering is
// instant and works even when the backend is asleep.
import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, SearchX } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  AUDIENCE_LABELS,
  CATEGORIES,
  CATEGORY_LABELS,
  SCHEMES,
  audiencesOf,
} from "@/lib/schemes";

export function SchemeCatalog() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [audience, setAudience] = React.useState("");

  const filtered = SCHEMES.filter((scheme) => {
    if (category && scheme.category !== category) return false;
    if (audience && !audiencesOf(scheme.scheme_id).includes(audience)) return false;
    if (query) {
      const haystack =
        `${scheme.short_name} ${scheme.name} ${scheme.ministry} ${scheme.benefit_snippet}`.toLowerCase();
      if (!haystack.includes(query.toLowerCase().trim())) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label="Search schemes"
            placeholder="Search by name or benefit"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sm:w-44"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c] ?? c}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filter by who it's for"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="sm:w-52"
        >
          <option value="">Everyone</option>
          {Object.entries(AUDIENCE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <p className="text-sm text-muted-foreground" role="status">
        Showing {filtered.length} of {SCHEMES.length} schemes
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No schemes match"
          body="Try a different word, or clear the filters — every scheme will come back."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCategory("");
                setAudience("");
              }}
            >
              Clear search and filters
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scheme) => (
            <li key={scheme.scheme_id}>
              <Link
                href={`/schemes/${scheme.scheme_id}`}
                className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-150 ease-soft hover:border-input hover:shadow-raised"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif text-lg leading-snug font-semibold">
                    {scheme.short_name}
                  </span>
                  <span className="flex flex-wrap justify-end gap-1.5">
                    {scheme.out_of_scope ? (
                      <Chip tone="neutral">Individuals only</Chip>
                    ) : (
                      scheme.rules.length === 0 && (
                        <Chip tone="info">Check coming soon</Chip>
                      )
                    )}
                    <Chip tone="neutral">
                      {CATEGORY_LABELS[scheme.category] ?? scheme.category}
                    </Chip>
                  </span>
                </div>
                <p className="text-sm leading-snug text-muted-foreground">{scheme.name}</p>
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground/80">
                  {scheme.benefit_snippet}
                </p>
                <span className="mt-auto flex items-center gap-1 pt-1 text-sm font-medium text-accent">
                  View details
                  <ArrowRight
                    className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
