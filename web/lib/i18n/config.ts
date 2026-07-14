/** Language registry — adding a language is ONE entry here plus ONE locale
 * dictionary in ./locales (see hi.ts for the shape). No code changes.
 *
 * `enabled: false` keeps a language behind a flag until its dictionary passes
 * the coverage check (scripts in P2 report untranslated keys).
 */

export interface LanguageDef {
  /** BCP-47 primary subtag; sent to the API as `lang`. */
  code: string;
  /** Endonym shown in the switcher. */
  label: string;
  /** BCP-47 tag for speech synthesis voice matching. */
  ttsLang: string;
  enabled: boolean;
}

export const LANGUAGES: LanguageDef[] = [
  { code: "en", label: "English", ttsLang: "en-IN", enabled: true },
  { code: "hi", label: "हिन्दी", ttsLang: "hi-IN", enabled: true },
];

export const DEFAULT_LANG = "en";
export const LANG_STORAGE_KEY = "adhikaar-lang";

export const enabledLanguages = () => LANGUAGES.filter((l) => l.enabled);
