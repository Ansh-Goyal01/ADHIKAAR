"use client";

import { Languages } from "lucide-react";

import { enabledLanguages } from "@/lib/i18n/config";
import { useLanguage, useT } from "@/lib/i18n";

/** Language choice lives client-side only (localStorage) — no PII, no server
 * state. Rendered as a native select: keyboard- and screen-reader-correct
 * for free, and familiar on low-end devices. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const languages = enabledLanguages();
  if (languages.length < 2) return null;

  return (
    <label className={`flex items-center gap-1.5 ${className ?? ""}`}>
      <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">{t("nav.language")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
