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
    shareWhatsApp: "Share on WhatsApp",
    whatsappMessage:
      "My scheme eligibility report from Adhikaar — every verdict explained and cited to the official rules:",
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
    valueTitle: "What this could be worth",
    valueTotal: "about {amount} a year",
    valuePerYear: "{amount} a year",
    valueCover: "{amount} insurance cover",
    valueOneTime: "{amount} one-time",
    valueVaries: "amount varies",
    valueNote:
      "Estimates from the official benefit text, shown only where a person has verified the amount against it. The implementing office's calculation is always final.",
    checklistTitle: "Documents to gather",
    checklistLead:
      "Everything the schemes above ask for, in one list — tick items off as you collect them. Printed, the empty boxes make a checklist you can carry to the office.",
  },
  nearMiss: {
    title: "Close to qualifying",
    bodyEligible:
      "This is the only rule you don't meet — every other requirement checks out.",
    bodyLikely:
      "This is the only rule you don't meet — everything else checks out, pending facts the office verifies.",
    needAgeAtLeast: "It would apply from age {value}.",
    needAgeAtMost: "It applies up to age {value}.",
    needIncomeAtMost: "It requires an annual family income of ₹{amount} or less.",
    needIncomeAtLeast: "It requires an annual family income of at least ₹{amount}.",
    ruleAsks: "The rule that decides:",
  },
  whatIf: {
    title: "What if things were different?",
    lead: "Try a different age, income, or a BPL card and see which verdicts would flip — checked against the same official rules. Your report above stays untouched, and nothing is stored.",
    age: "Age",
    income: "Annual family income (₹)",
    bplCard: "Has a BPL card",
    run: "See what changes",
    running: "Checking the rules…",
    noChange: "No verdicts change with these values.",
    changesHeading: "Verdicts that would change",
    error: "The simulation couldn't run. Please try again.",
  },
  feedback: {
    title: "Report a problem with this report",
    lead: "Spotted a wrong verdict, a bad translation, or an outdated document list? Tell us — it goes straight to the maintainers.",
    category: "What kind of problem?",
    categories: {
      wrong_verdict: "A verdict looks wrong",
      missing_scheme: "A scheme is missing",
      translation: "A translation is off",
      documents: "Documents or steps are outdated",
      other: "Something else",
    },
    scheme: "Which scheme?",
    schemeNone: "Not about one scheme",
    message: "What went wrong?",
    noPii: "Please don't include your name, phone, or any ID numbers — reports are anonymous, and identifiers are removed automatically.",
    submit: "Send report",
    sending: "Sending…",
    sent: "Thank you — your report was recorded.",
    error: "Your report couldn't be sent. Please try again.",
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
  voice: {
    speak: "Answer by speaking",
    stop: "Stop listening",
  },
  family: {
    addMember: "Add a family member",
    addMemberHelp:
      "One report for the whole household: add a family member and the shared details — income, home, ration card — carry over, so only their personal questions remain.",
    reportLabel: "Family entitlement report",
    entitledTitle: "Together, your family may be entitled to {count} benefits",
    noEntitlementTitle: "We couldn't confirm an entitlement for the family yet",
    lead: "Each person was checked separately against the same official rules — household facts were shared, everything personal is their own answers. Every verdict below is cited, exactly as in a single report.",
    memberLabel: "Family member {n}",
    needInfo: "One more detail is needed to finish this member's check:",
    noneForMember: "No scheme matched for this member — circumstances change, and so can this.",
    notMatchedCount: "{count} schemes didn't match for this member.",
  },
  chips: {
    heading: "Based on what you told us",
    ariaLabel: "The facts this report is based on",
    yearsOld: "{age} years old",
    income: "₹{amount}/year family income",
    bplCard: "BPL card",
    ownsFarmland: "owns farmland",
    cultivatesCrops: "cultivates crops",
    disability: "{percent}% disability",
    hasBankAccount: "has bank account",
    noIncomeTax: "no income tax",
    paysIncomeTax: "pays income tax",
    govtJobInFamily: "govt job in family",
    ownsVehicle: "owns vehicle",
    noLpg: "no LPG connection",
    streetVendor: "street vendor",
    vendingCertificate: "vending certificate",
    artisan: "traditional artisan",
    postMatricStudent: "post-matric student",
    student: "student",
    daughter: "daughter, {age}",
    gender: { female: "female", male: "male", other: "another gender" },
    marital: { single: "single", married: "married", widowed: "widowed", divorced: "divorced" },
    area: { rural: "rural area", urban: "urban area" },
    house: { kutcha: "kutcha house", pucca: "pucca house" },
    occupation: {
      farmer: "farmer",
      "street vendor": "street vendor",
      artisan: "traditional artisan",
      "daily wage": "daily-wage worker",
      salaried: "salaried (private)",
      "govt service": "government service",
      "self employed": "self-employed",
      homemaker: "homemaker",
      student: "student",
      retired: "retired",
      unemployed: "not working at the moment",
      other: "other work",
    },
  },
  docGuides: {
    title: "How to get these documents",
    lead: "Practical notes for the documents your schemes ask for. Fees and timelines vary by state — treat these as typical, not exact.",
    whereLabel: "Where",
    costLabel: "Cost",
    timeLabel: "Time",
    aadhaar: {
      name: "Aadhaar card",
      where: "Any Aadhaar Seva Kendra or Common Service Centre (CSC); book or locate one on uidai.gov.in.",
      cost: "First enrolment is free; most updates cost about ₹50.",
      time: "Enrolment takes minutes; the card arrives by post within about 30 days. The enrolment slip works as proof sooner.",
    },
    bank_account: {
      name: "Bank account / passbook",
      where: "Any bank branch, India Post Payments Bank, or a banking correspondent. Ask for a Jan Dhan (PMJDY) account — zero balance, no charges.",
      cost: "Free for Jan Dhan accounts.",
      time: "Usually opened the same day with Aadhaar.",
    },
    caste_certificate: {
      name: "Caste / category certificate",
      where: "Your tehsil / SDM office, or your state’s e-district portal online.",
      cost: "Free to about ₹50 depending on the state.",
      time: "Typically 2–4 weeks.",
    },
    income_certificate: {
      name: "Income certificate",
      where: "Tehsil / revenue office, or your state’s e-district portal.",
      cost: "Nominal (usually under ₹50).",
      time: "Typically 1–3 weeks. Note: most states treat it as valid for 6–12 months, so check yours is current.",
    },
    bpl_card: {
      name: "BPL listing",
      where: "Your gram panchayat or the district food & civil supplies office keeps the BPL / SECC list; ask them to check your family’s inclusion.",
      cost: "Checking the list is free.",
      time: "The check itself is quick; adding a family to the list is a state process that can take much longer.",
    },
    ration_card: {
      name: "Ration card",
      where: "Your state food & civil supplies department — online portal or the local ration office.",
      cost: "Free to nominal, by state.",
      time: "Typically 2–4 weeks.",
    },
    land_records: {
      name: "Land records (khasra / khatauni)",
      where: "Your patwari or tehsil office; most states also give instant online copies on their bhulekh / land-records portal.",
      cost: "Online copies are free or a few rupees; certified copies cost a small fee.",
      time: "Online: immediate. Certified copy: a few days.",
    },
    disability_certificate: {
      name: "Disability certificate / UDID",
      where: "The medical board at a government hospital; apply for the UDID card on swavlambancard.gov.in.",
      cost: "Free.",
      time: "A few weeks including the medical assessment.",
    },
    photo: {
      name: "Passport-size photographs",
      where: "Any photo studio.",
      cost: "About ₹30–100 for a set.",
      time: "Same day.",
    },
    age_proof: {
      name: "Proof of age / birth certificate",
      where: "The municipal body or gram panchayat where the birth was registered; a school-leaving certificate usually also works.",
      cost: "Free to nominal.",
      time: "Typically 1–2 weeks for a fresh copy.",
    },
    residence_proof: {
      name: "Residence / domicile certificate",
      where: "Tehsil office or your state’s e-district portal.",
      cost: "Nominal.",
      time: "Typically 1–3 weeks.",
    },
    death_certificate: {
      name: "Death certificate",
      where: "The municipal body or gram panchayat where the death was registered.",
      cost: "Free to nominal (first copy is often free).",
      time: "Typically 1–2 weeks.",
    },
  },
  catalog: {
    title: "Explore the schemes",
    lead: "Every central scheme documented here carries its benefits, official sources, and — for the {schemeCount} schemes the eligibility check decides today — the exact rules we check. Schemes marked “check coming soon” have machine-drafted rules awaiting human verification; we don’t judge eligibility for them until a person has certified every rule.",
    freshnessUnchanged:
      "Freshness: all {checked} myScheme-sourced pages were re-fetched and diffed against our audited text on {date} — no changes found.",
    freshnessChanged:
      "Freshness: all {checked} myScheme-sourced pages were re-fetched and diffed against our audited text on {date} — {changed} changed and are flagged on their pages.",
    searchLabel: "Search schemes",
    searchPlaceholder: "Search by name or benefit",
    filterCategoryLabel: "Filter by category",
    filterAudienceLabel: "Filter by who it's for",
    allCategories: "All categories",
    everyone: "Everyone",
    showing: "Showing {shown} of {total} schemes",
    emptyTitle: "No schemes match",
    emptyBody: "Try a different word, or clear the filters — every scheme will come back.",
    emptyClear: "Clear search and filters",
    individualsOnly: "Individuals only",
    comingSoon: "Check coming soon",
    viewDetails: "View details",
    categories: {
      farmers: "Farming",
      pension: "Pensions",
      insurance: "Insurance",
      health: "Health",
      housing: "Housing",
      education: "Education",
      livelihood: "Livelihood",
      household: "Household",
      savings: "Savings",
    },
    audiences: {
      women: "Women & daughters",
      farmers: "Farmers",
      workers: "Workers & vendors",
      students: "Students",
      seniors: "Older adults",
      disability: "Persons with disabilities",
      families: "Low-income families",
    },
  },
  marketing: {
    home: {
      heroTitle: "Find out exactly what government support you’re entitled to",
      heroLead:
        "Answer a few plain questions. Adhikaar checks the official rules of {schemeCount} central government schemes and shows its work — every claim linked to the government’s own words.",
      ctaCheck: "Check your eligibility",
      ctaHow: "See how it works",
      heroNote: "Free · No login · Takes about 3 minutes",
      trustGrounded: "Grounded in official documents",
      trustCited: "Every claim cited",
      trustCovered: "{schemeCount} central schemes covered",
      trustOpenSource: "Open source",
      howTitle: "How it works",
      howLead: "Three steps from your situation to a report you can keep.",
      stepLabel: "Step {number}",
      step1Title: "Tell us about yourself",
      step1Body:
        "A few plain questions about your age, work, and household. No login, no documents, and nothing is stored.",
      step2Title: "We check the official rules",
      step2Body:
        "Your answers are tested against each scheme’s actual eligibility clauses — by rules written from the government’s own text, not by guesswork.",
      step3Title: "You get a cited report",
      step3Body:
        "For every scheme: why you qualify, what you’ll receive, which documents to bring, and where to apply — each claim linked to its official source.",
      differentTitle: "Most tools search and summarise. Adhikaar decides — and proves it.",
      differentBody1:
        "A chatbot that merely retrieves scheme text can sound confident and still be wrong — and a wrong “you qualify” costs real people real time and hope. Adhikaar works differently: every eligibility rule is written down from the official clause, your answers are checked against those rules deterministically, and a verifier confirms every sentence of the explanation against the source before you see it.",
      differentBody2:
        "When we tested both approaches on the same cases, the plain-language AI invented 16 entitlements that didn’t exist.",
      differentBody2Strong: "Adhikaar’s rules engine invented zero.",
      differentBody2End:
        "And when it doesn’t have enough information, it asks — it never guesses.",
      flowSituation: "Your situation",
      flowRetrieved: "Official rules retrieved from government text",
      flowDecides: "Deterministic rules engine decides",
      flowVerifier: "Verifier checks every claim against the source",
      flowCited: "Cited answer you can keep",
      readFull: "Read the full explanation",
      closingTitle: "Three minutes. No login. A report you can take to the office.",
    },
    about: {
      title: "Adhikaar means “right” — because that’s what these are",
      intro1:
        "India runs some of the largest welfare programmes in the world, but knowing what you’re entitled to still takes expertise most people don’t have: the rules live across portals and PDFs, in language written for administrators. Many entitlements go unclaimed not because people don’t qualify, but because they never find out they do.",
      intro2:
        "Adhikaar is an attempt to close that gap carefully. It answers one question — “what am I entitled to?” — for {schemeCount} central schemes, in plain language, with every claim traceable to the government’s own text. It would rather say “not sure, ask this at the office” than be confidently wrong.",
      openTitle: "Open source, verifiable",
      openBody:
        "The whole system is open: the rules files (one clause of official text per rule), the evaluation dataset and results, and this site. If you find a rule that’s wrong or out of date, you can point at the exact line — and fix it.",
      linkSource: "Source code and rule files on GitHub",
      linkMyscheme: "myScheme — the official scheme portal",
      privacyTitle: "Privacy, simply",
      privacyBody:
        "There are no accounts and no database of people. Your answers live in your browser and in the link or resume code you choose to keep; they are sent to the eligibility engine only to compute your report, and are not stored there.",
      finePrintTitle: "The honest fine print",
      contactTitle: "Contact",
      contactBody: "Found a mistake in a rule, or want to help cover more schemes?",
      contactLink: "Open an issue on GitHub",
      contactEnd: "— corrections are the most valuable contribution this project can get.",
      closing: "Find out what you’re owed.",
    },
    lifeEvents: {
      eyebrow: "A check for this moment",
      relevantTitle: "This check covers, among others:",
      ctaNote: "About 3 minutes · No login · Answers stay on your device",
      startCheck: "Start the check",
      widowedTitle: "Support after losing your spouse",
      widowedLead:
        "A monthly widow pension and survivor benefits exist, but many go unclaimed simply because nobody says so at the office. Answer a few plain questions and see exactly what you can claim — every answer backed by the official rules.",
      pregnantTitle: "Expecting a child? Check what support you can claim now",
      pregnantLead:
        "Health cover and family-support schemes have specific windows — some must be claimed during pregnancy or soon after birth. A few questions show what applies to you, with the official text to take along.",
      farmerTitle: "Farming a small holding? Some support is yours by right",
      farmerLead:
        "Income support, crop insurance, and pension schemes exist for farming families — with exclusions that are hard to guess. Check which ones your household can actually claim, cited to the official rules.",
      studentTitle: "Scholarships your family may be missing",
      studentLead:
        "Post-matric scholarships and education support depend on category, income, and course — rules that are easy to misread. Answer for the student in your family and see what applies, with sources.",
      seniorTitle: "Past 60? A monthly pension may already be yours",
      seniorLead:
        "Old-age pensions are small but real, and the eligibility rules are precise. Two minutes of questions show whether you or a parent can claim one — and exactly what to take to the office.",
      disabilityTitle: "Living with a disability? Check your entitlements",
      disabilityLead:
        "Disability pensions and support schemes depend on the certified disability percentage and a few facts about your household. See what the official rules say you can claim.",
    },
    howItWorks: {
      title: "Built so you can check its work",
      intro:
        "Most AI tools answer eligibility questions by searching documents and summarising what they find. That can sound right and be wrong. Adhikaar separates the jobs: language models only read and explain — a deterministic rules engine decides, and a verifier checks every claim against the official text before you see it.",
      pipelineTitle: "From your answers to a cited report",
      pipe1Title: "Your situation",
      pipe1Body:
        "You answer a few plain questions — age, work, household. No login, and nothing is stored anywhere.",
      pipe2Title: "Official rules are retrieved",
      pipe2Body:
        "The scheme text comes straight from government sources — myScheme and official guidelines — kept with its section labels and source links. {schemeCount} central schemes, {ruleCount} encoded rules.",
      pipe3Title: "A rules engine decides — not the AI",
      pipe3Body:
        "Each eligibility clause is written down as an executable rule. Your answers are checked against them deterministically: met, not met, or unknown. Unknown never becomes a guess — it becomes a question.",
      pipe4Title: "A verifier checks every claim",
      pipe4Body:
        "Before anything reaches you, every sentence of the explanation is checked against the official text it cites. Claims that can’t be verified are dropped.",
      pipe5Title: "You get a cited answer",
      pipe5Body:
        "Every verdict comes with the exact clause it rests on, a link to the official source, and honest “likely” wording where the office still has to verify a fact.",
      measuredTitle: "Measured, honestly",
      measuredLead:
        "We tested the rules engine against a plain AI baseline on the same 41 labeled cases — same retrieval, same underlying model, only the decider differs.",
      statFpCaption:
        "false entitlements asserted by the rules engine (the AI baseline asserted 16)",
      statAccCaption: "eligibility accuracy, against 57% for the AI-only baseline",
      statFaithCaption: "more of its claims verifiably supported by the cited official text",
      measuredNote:
        "Small labeled evaluation set — treat these as engineering counts, not population statistics. The full methodology and raw results are in the open-source repository.",
      principlesTitle: "The principles behind it",
      prin1Title: "We never invent an entitlement",
      prin1Body:
        "A wrong “you qualify” costs real people bus fare, queues, and hope. The rules engine can only conclude what the encoded official clauses support. In our evaluation it asserted zero false entitlements across 92 judgments — the AI-only baseline asserted 16.",
      prin2Title: "“Not sure” is a first-class answer",
      prin2Body:
        "Eligibility rules have three outcomes here: met, not met, and unknown. Anything unknown turns into a question or an honest “needs one more detail” — never a silent assumption.",
      prin3Title: "Some facts only the office can verify",
      prin3Body:
        "Whether your family is on the BPL or SECC list can’t be checked from a conversation. Verdicts that rest on such facts are marked “likely eligible” and the report says exactly what to confirm.",
      prin4Title: "Freshness is visible",
      prin4Body:
        "Every scheme page shows the date its official text was fetched and verified. If the text is a transcription (one scanned PDF is), that’s disclosed too.",
      limitsTitle: "What this can’t do (yet)",
      limitCoverage:
        "The eligibility check decides {schemeCount} central schemes today. {pendingCount} more are documented in the catalog with machine-drafted rules awaiting human verification — each joins the check only when a person has certified every rule against its official source.",
      limitOutOfScope:
        "One more is listed for reference only: its applicant is an institution, not an individual, so a personal check can’t apply.",
      limitStates:
        "State schemes — often the most relevant — aren’t included yet, so “not eligible here” never means “not eligible anywhere”.",
      limitSelfReported:
        "Answers are self-reported. The final decision always rests with the implementing authority, and the report is designed to be taken to them — not to replace them. Where a verdict rests on a fact only the office can verify (BPL or SECC lists), the report now says exactly what to confirm and where.",
      limitSimplified:
        "A few rarely-triggered criteria are simplified — for example, PM-KISAN’s exclusions for constitutional-post holders and practicing professionals are now encoded, while notified-crop areas (PMFBY) and the two-accounts-per-family cap (Sukanya Samriddhi) are not. Every remaining simplification is listed in the open-source rule files, beside the rule it affects.",
      limitLanguages:
        "Beyond English and Hindi, the other nine languages are machine-translated and still awaiting native-speaker review — wording may be imperfect in places.",
      closing: "The best way to understand it is to try it.",
    },
  },
  citation: {
    sections: {
      eligibility: "Eligibility clause",
      exclusions: "Exclusion clause",
      benefits: "Benefits",
      details: "Scheme details",
      application: "How to apply",
      documents: "Documents",
      faq: "Official FAQ",
    },
    officialText: "Official text",
    viewSource: "View the official source",
  },
} as const;

/** Deeply-widened dictionary type all locales must structurally match. */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type UiDict = Widen<typeof en>;
