/** English UI strings — the canonical dictionary that defines the key shape.
 * Wizard question text is NOT duplicated here: wizard.ts is its canonical
 * source and other locales overlay it (see `WizardOverlay` in ../index).
 */

export const en = {
  nav: {
    howItWorks: "How it works",
    exploreSchemes: "Explore schemes",
    about: "About",
    checkEligibility: "Check eligibility",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  footer: {
    explore: "Explore",
    sources: "Sources",
    myscheme: "myScheme (Government of India)",
    sourceCode: "Source code on GitHub",
    copyrightNote:
      "Scheme text belongs to the Government of India and is reproduced from public official sources. No personal data is collected or stored.",
    disclaimer:
      "Adhikaar explains eligibility using official scheme documents. It is informational only — not legal advice — and final decisions rest with the implementing authorities. Always confirm on the official portal before acting.",
  },
  common: {
    skipToContent: "Skip to content",
    edit: "Edit",
    continue: "Continue",
    back: "Back",
    tryAgain: "Try again",
    choose: "Choose",
  },
  wizardChrome: {
    loading: "Loading your questions…",
    stepOf: "Step {current} of {total}",
    review: "Check your answers",
    reviewLead: "A quick look before we prepare your report. You can change anything.",
    defaultLead: "Answer what you can — “Not sure” is always allowed, and nothing is stored.",
    whyWeAsk: "Why we ask",
    saveResume: "Save & resume later",
    getReport: "Get my report",
    haveCode: "Have a resume code?",
    resumeCode: "Resume code",
    resumeHelp: "Paste the code you copied earlier to pick up where you left off.",
    resumePlaceholder: "Paste your code",
    restore: "Restore my answers",
    neverMind: "Never mind",
    resumeInvalid: "That code doesn't look right. Check it and try again.",
    resumeWelcome: "Welcome back — your answers are restored.",
    codeCopied: "Resume code copied — paste it here any time to continue.",
    codeIs: "Your resume code: {code}",
    fillRequired: "Please fill this in before continuing.",
    chooseAnswer: "Please choose an answer — “Not sure” is always fine.",
    numberRange: "Please enter a number between {min} and {max}.",
    yes: "Yes",
    no: "No",
    notSure: "Not sure",
  },
  results: {
    preparing: "Preparing your report",
    preparingBody:
      "Checking your answers against the official rules of {count} schemes — this usually takes under half a minute.",
    reportLabel: "Eligibility report",
    entitledTitleOne: "You may be entitled to 1 scheme",
    entitledTitleMany: "You may be entitled to {count} schemes",
    noEntitlementTitle: "We couldn't confirm an entitlement yet",
    entitledLead:
      "Based on what you told us and the official rules, here is where you stand — including exactly why, what to bring, and where to apply.",
    moreInfoLead:
      "A few schemes need one more detail each before we can say — they're listed below with exactly what to confirm.",
    noneLead:
      "Based on what you told us, none of the {count} covered schemes matched — the reasons are below, and the rules they rest on are linked.",
    print: "Print or save as PDF",
    copyLink: "Copy shareable link",
    changeAnswers: "Change my answers",
    linkCopied: "Link copied — anyone with it sees this report, so share with care.",
    linkCopyFailed: "Couldn't copy automatically — you can copy the address bar instead.",
    entitledSection: "You appear entitled",
    entitledSectionLead:
      "Verdicts marked “likely” rest on facts the office will verify, like the BPL list.",
    moreInfoSection: "Worth checking — one detail missing",
    moreInfoSectionLead: "We'd rather ask than guess. Each card says exactly what to confirm.",
    notEligibleSection: "Not a match right now",
    notEligibleSectionLead:
      "Each card shows the specific rule that wasn't met — circumstances change, and so can this.",
    emptyTitle: "No answers to check yet",
    emptyBody:
      "Tell us about your situation first — it takes about three minutes, and nothing is stored.",
    emptyAction: "Check your eligibility",
    errorTitle: "We couldn't finish your report",
    errorFallback: "Something unexpected went wrong. Please try again.",
    needInfoTitle: "One more thing before your report",
    needInfoFallback: "Could you share a little more about your age, work, and family income?",
    yourAnswer: "Your answer",
    plainWords: "Plain words are perfect.",
    typeAnswer: "Type your answer",
    continueToReport: "Continue to my report",
  },
  card: {
    why: "Why — grounded in the official text",
    confirm: "To be sure, confirm: ",
    beforeApply: "Before you apply — this verdict rests on facts the office will verify:",
    documents: "Documents you'll need",
    howToApply: "How to apply",
    officialPage: "Official scheme page",
  },
  verdicts: {
    eligible: "You appear eligible",
    likely_eligible: "Likely eligible",
    need_more_info: "Needs one more detail",
    not_eligible: "Not eligible for this one",
  },
  readAloud: {
    listen: "Listen to this section",
    stop: "Stop reading aloud",
  },
} as const;

/** Deeply-widened dictionary type all locales must structurally match. */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type UiDict = Widen<typeof en>;
