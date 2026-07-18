/** Malayalam (à´®à´²à´¯à´¾à´³à´‚) â€” MACHINE-TRANSLATED, pending native-speaker review.
 *
 * Generated 2026-07-18 by scripts/generate_locales.py through the
 * backend translation pipeline (disk-cached, canonical values copied through).
 * Coverage: 40 strings fell back to English (see generator output). Do not hand-edit strings here without also
 * recording the review in the vault sign-off notes; regenerate with:
 *   node frontend/scripts/i18n-export.mts
 *   backend/.venv/Scripts/python.exe -X utf8 -u scripts/generate_locales.py
 */

/* Interim 2026-07-18: 90 missing keys filled with English pending the running locale regeneration. */
import type { UiDict } from "./en";
import type { WizardOverlay } from "../overlay";

export const ml: UiDict = {
  "nav": {
    "howItWorks": "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "exploreSchemes": "പദ്ധതികൾ പര്യവേക്ഷണം ചെയ്യുക",
    "about": "കുറിച്ച്",
    "checkEligibility": "യോഗ്യത പരിശോധിക്കുക",
    "openMenu": "മെനു തുറക്കുക",
    "closeMenu": "മെനു അടയ്ക്കുക",
    "language": "ഭാഷ"
  },
  "footer": {
    "explore": "പര്യവേക്ഷണം ചെയ്യുക",
    "sources": "ഉറവിടങ്ങൾ",
    "myscheme": "എന്റെ സ്കീം (ഇന്ത്യാ സർക്കാർ)",
    "sourceCode": "GitHub-ലെ ഉറവിട കോഡ്",
    "copyrightNote": "സ്കീം ടെക്സ്റ്റ് ഇന്ത്യാ സർക്കാരിന്റേതാണ്, പൊതു ഔദ്യോഗിക ഉറവിടങ്ങളിൽ നിന്ന് പുനർനിർമ്മിച്ചതാണ്. വ്യക്തിഗത ഡാറ്റ ശേഖരിക്കുകയോ സംഭരിക്കുകയോ ചെയ്യുന്നില്ല.",
    "disclaimer": "അധികാരം ഔദ്യോഗിക സ്കീം രേഖകൾ ഉപയോഗിച്ച് അർഹത വിശദീകരിക്കുന്നു. ഇത് വിവരദായകം മാത്രമാണ് - നിയമ ഉപദേശമല്ല - നടപ്പാക്കുന്ന അധികാരികൾക്ക് അന്തിമ തീരുമാനങ്ങൾ. പ്രവർത്തിക്കുന്നതിന് മുമ്പ് ഔദ്യോഗിക പോർട്ടലിൽ എല്ലായ്പ്പോഴും സ്ഥിരീകരിക്കുക."
  },
  "common": {
    "skipToContent": "ഉള്ളടക്കത്തിലേക്ക് പോകുക",
    "edit": "തിരുത്തുക",
    "continue": "തുടരുക",
    "back": "തിരികെ",
    "tryAgain": "വീണ്ടും ശ്രമിക്കുക",
    "choose": "തിരഞ്ഞെടുക്കുക"
  },
  "wizardChrome": {
    "loading": "നിങ്ങളുടെ ചോദ്യങ്ങൾ ലോഡ് ചെയ്യുന്നു…",
    "stepOf": "ഘട്ടം {current} of {total}",
    "review": "നിങ്ങളുടെ ഉത്തരങ്ങൾ പരിശോധിക്കുക",
    "reviewLead": "ഞങ്ങൾ നിങ്ങളുടെ റിപ്പോർട്ട് തയ്യാറാക്കുന്നതിന് മുമ്പ് ഒരു ദ്രുത നോക്കുക. നിങ്ങൾക്ക് എന്തും മാറ്റാൻ കഴിയും.",
    "defaultLead": "നിങ്ങൾക്ക് കഴിയുന്നത്ര ഉത്തരം നൽകുക — “എനിക്ക് ഉറപ്പില്ല” എന്നത് എല്ലായ്പ്പോഴും അനുവദനീയമാണ്, ഒന്നും സംരക്ഷിക്കില്ല.",
    "whyWeAsk": "എന്തിനാണ് ഞങ്ങൾ ചോദിക്കുന്നത്",
    "saveResume": "പിന്നീട് സംരക്ഷിച്ച് പുനരാരംഭിക്കുക",
    "getReport": "എന്റെ റിപ്പോർട്ട്‌ നേടുക",
    "haveCode": "ഒരു പുനരാരംഭ കോഡ് ഉണ്ടോ?",
    "resumeCode": "പുനരാരംഭിക്കുക",
    "resumeHelp": "നിങ്ങൾ മുമ്പ് പകർത്തിയ കോഡ് ഒട്ടിച്ച് നിങ്ങൾ വിട്ട സ്ഥലത്ത് നിന്ന് ആരംഭിക്കുക",
    "resumePlaceholder": "നിങ്ങളുടെ കോഡ് ഒട്ടിക്കുക",
    "restore": "എന്റെ ഉത്തരങ്ങൾ പുനഃസ്ഥാപിക്കുക",
    "neverMind": "ശ്രദ്ധിക്കരുത്",
    "resumeInvalid": "ആ കോഡ് ശരിയായി കാണുന്നില്ല. അത് പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
    "resumeWelcome": "സ്വാഗതം - നിങ്ങളുടെ ഉത്തരങ്ങൾ പുനഃസ്ഥാപിച്ചു.",
    "codeCopied": "റിസ്യൂം കോഡ് പകർത്തി - എപ്പോൾ വേണമെങ്കിലും ഇത് ഇവിടെ ഒട്ടിച്ച് തുടരുക.",
    "codeIs": "നിങ്ങളുടെ റിസ്യൂം കോഡ്: {code}",
    "fillRequired": "തുടരുന്നതിന് മുമ്പ് ഇത് പൂരിപ്പിക്കുക.",
    "chooseAnswer": "ഒരു ഉത്തരം തിരഞ്ഞെടുക്കുക - “എനിക്ക് ഉറപ്പില്ല” എന്നത് എല്ലായ്പ്പോഴും ശരിയാണ്.",
    "numberRange": "{min} നും {max} നും ഇടയിൽ ഒരു സംഖ്യ ഇവിടെ നൽകുക.",
    "yes": "അതെ",
    "no": "ഇല്ല",
    "notSure": "എനിക്ക് ഉറപ്പില്ല"
  },
  "results": {
    "preparing": "നിങ്ങളുടെ റിപ്പോർട്ട് തയ്യാറാക്കുന്നു",
    "preparingBody": "ഉത്തരങ്ങൾ ഔദ്യോഗിക നിയമങ്ങൾക്കെതിരെ പരിശോധിക്കുന്നു {count} സ്കീമുകൾ - ഇത് സാധാരണയായി അര मिनटത്തിൽ താഴെ എടുക്കും.",
    "reportLabel": "യോഗ്യത റിപ്പോർട്ട്",
    "entitledTitleOne": "നിങ്ങൾ 1 സ്കീമിന് യോഗ്യനായിരിക്കാം",
    "entitledTitleMany": "നിങ്ങൾ {count} സ്കീമുകൾക്ക് യോഗ്യനായിരിക്കാം",
    "noEntitlementTitle": "ഞങ്ങളால്‍ ഇതുവരെ ഒരു അര്‍ഹതയും സ്ഥിരീകരിക്കാനായിട്ടില്ല",
    "entitledLead": "നിങ്ങൾ ഞങ്ങളോട് പറഞ്ഞതും ഔദ്യോഗിക നിയമങ്ങളും അനുസരിച്ച്, നിങ്ങളുടെ സ്ഥിതി ഇതാണ് - എന്തുകൊണ്ട്, എന്ത് കൊണ്ടുവരണം, എവിടെ അപേക്ഷിക്കണം എന്നിവ ഉള്‍പ്പെടെ.",
    "moreInfoLead": "കൂടുതൽ ഒരു വിശദാംശം ഓരോ പദ്ധതിക്കും ആവശ്യമാണ്, അതിനുമുമ്പ് ഞങ്ങളால്‍ പറയാന്‍ കഴിയില്ല - ഏതൊക്കെയാണ് സ്ഥിരീകരിക്കേണ്ടതെന്ന് അവ താഴെ ലിസ്റ്റ് ചെയ്തിരിക്കുന്നു.",
    "noneLead": "നിങ്ങൾ ഞങ്ങളോട് പറഞ്ഞതിന്റെ അടിസ്ഥാനത്തില്‍, ഉള്‍ക്കൂടിയ {count} പദ്ധതികള്‍ ഏതെങ്കിലും നിങ്ങളുമായി പൊരുത്തപ്പെട്ടില്ല - കാരണങ്ങള്‍ താഴെ, അവ resting നിയമങ്ങൾ ലിങ്ക് ചെയ്തിരിക്കുന്നു.",
    "print": "പിഡിഎഫായി പ്രിന്‍റ് ചെയ്യുക അല്ലെങ്കില്‍ സംരക്ഷിക്കുക",
    "copyLink": "പങ്കിടാവുന്ന ലിങ്ക് പകര്‍ത്തുക",
    "changeAnswers": "എന്റെ ഉത്തരങ്ങള്‍ മാറ്റുക",
    "linkCopied": "ലിങ്ക് പകര്‍ത്തി - ഇത് റിപ്പോര്‍ട്ട് കാണുന്ന ആരൊക്കെയുമായും പങ്കിടുക, അതിനാല്‍ ശ്രദ്ധയോടെ പങ്കിടുക.",
    "linkCopyFailed": "യാന്ത്രികമായി പകർത്താൻ കഴിഞ്ഞില്ല - നിങ്ങൾക്ക് വിലാസ ബാർ പകർത്താം.",
    "entitledSection": " നിങ്ങൾക്ക് അർഹതയുണ്ടെന്ന് തോന്നുന്നു",
    "entitledSectionLead": "“സാധ്യത” എന്ന് അടയാളപ്പെടുത്തിയ വിധികൾ, ഓഫീസ് പരിശോധിക്കുന്ന വസ്തുതകളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്, BPL ലിസ്റ്റ് പോലുള്ളവ.",
    "moreInfoSection": "പരിശോധിക്കേണ്ടതാണ് - ഒരു വിശദാംശം കാണുന്നില്ല",
    "moreInfoSectionLead": "ഞങ്ങൾ ഊഹിക്കാതിരിക്കാൻ ആഗ്രഹിക്കുന്നു. ഓരോ കാർഡിലും എന്താണ് സ്ഥിരീകരിക്കേണ്ടതെന്ന് കൃത്യമായി പറയുന്നു.",
    "notEligibleSection": "ഇപ്പോൾ ഒരു പൊരുത്തമില്ല",
    "notEligibleSectionLead": "ഓരോ കാർഡും പ്രസക്തമായ നിയമം കാണിക്കുന്നു - സാഹചര്യങ്ങൾ മാറുന്നു, ഇതും മാറാം.",
    "emptyTitle": " പരിശോധിക്കാൻ ഇതുവരെ ഉത്തരങ്ങളൊന്നുമില്ല",
    "emptyBody": "നിങ്ങളുടെ സാഹചര്യത്തെക്കുറിച്ച് ആദ്യം ഞങ്ങളോട് പറയുക - ഇതിന് ഏകദേശം മൂന്ന് മിനിറ്റ് എടുക്കും, ഒന്നും സംഭരിക്കില്ല.",
    "emptyAction": "നിങ്ങളുടെ അർഹത പരിശോധിക്കുക",
    "errorTitle": "നിങ്ങളുടെ റിപ്പോർട്ട് പൂർത്തിയാക്കാൻ ഞങ്ങൾക്ക് കഴിഞ്ഞില്ല",
    "errorFallback": "എന്തെങ്കിലും അപ്രതീക്ഷിത സംഭവം സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.",
    "needInfoTitle": "നിങ്ങളുടെ റിപ്പോർട്ടിന് മുമ്പ് ഒരു കാര്യം കൂടി",
    "needInfoFallback": "നിങ്ങളുടെ പ്രായം, ജോലി, കുടുംബ വരുമാനത്തെക്കുറിച്ച് ക 조금 കൂടി പറയാമോ?",
    "yourAnswer": "നിങ്ങളുടെ ഉത്തരം",
    "plainWords": "സാധാരണ വാക്കുകൾ തികഞ്ഞതാണ്.",
    "typeAnswer": "നിങ്ങളുടെ ഉത്തരം ടൈപ്പ് ചെയ്യുക",
    "continueToReport": "എന്റെ റിപ്പോർട്ടിലേക്ക് തുടരുക",
    "checklistTitle": "ശേഖരിക്കേണ്ട രേഖകൾ",
    "checklistLead": "മുകളിലെ പദ്ധതികൾക്കായി ആവശ്യമായ എല്ലാം, ഒരു പട്ടികയിൽ - ശേഖരിക്കുമ്പോൾ അവയുടെ ഇടയിൽ ടിക്ക് ചെയ്യുക. അച്ചടിച്ചാൽ, ഒരു ചെക്ക്‌ലിസ്റ്റ് ഉണ്ടാകും, അത് ഓഫീസിലേക്ക് കൊണ്ടുപോകാം.",
    "shareWhatsApp": "Share on WhatsApp",
    "whatsappMessage": "My scheme eligibility report from Adhikaar — every verdict explained and cited to the official rules:",
    "valueTitle": "What this could be worth",
    "valueTotal": "about {amount} a year",
    "valuePerYear": "{amount} a year",
    "valueCover": "{amount} insurance cover",
    "valueOneTime": "{amount} one-time",
    "valueVaries": "amount varies",
    "valueNote": "Estimates from the official benefit text, shown only where a person has verified the amount against it. The implementing office's calculation is always final."
  },
  "nearMiss": {
    "title": "യോഗ്യതയ്ക്ക് സമീപം",
    "bodyEligible": "ഇതാണ് നിങ്ങൾ പാലിക്കാത്ത ഏക നിയമം — മറ്റെല്ലാ ആവശ്യകതകളും രൂപപ്പെടുത്തിയിരിക്കുന്നു.",
    "bodyLikely": "ഇതാണ് നിങ്ങൾ പാലിക്കാത്ത ഏക നിയമം — എല്ലാം ഓഫീസ് വെറിഫൈ ചെയ്യുന്ന വസ്തുതകൾ കാത്തിരിക്കുന്നു.",
    "needAgeAtLeast": "ഇത് {value} വയസ്സുമുതൽ ബാധകമാകും.",
    "needAgeAtMost": "ഇത് {value} വയസ്സുവരെ ബാധകമാകും.",
    "needIncomeAtMost": "ഇതിന് {amount} രൂപയോ അതിനേക്കാൾ കുറവോ ആയ കുടുംബ വരുമാനം ആവശ്യമാണ്.",
    "needIncomeAtLeast": "ഇതിന് കുറഞ്ഞത് {amount} രൂപ ആയ കുടുംബ വരുമാനം ആവശ്യമാണ്.",
    "ruleAsks": "തീരുമാനിക്കുന്ന നിയമം:"
  },
  "whatIf": {
    "title": "കാര്യങ്ങൾ വ്യത്യസ്തമായിരുന്നെങ്കിൽ?",
    "lead": "വ്യത്യസ്ത പ്രായം, വരുമാനം, അല്ലെങ്കിൽ BPL കാർഡ് പ്രയത്നിക്കുക, ഏത് വിധികൾ മാറുമെന്ന് കാണുക - അതേ ഔദ്യോഗിക നിയമങ്ങൾക്കെതിരെ പരിശോധിക്കുക. മുകളിലെ റിപ്പോർട്ട് അപ്രത്യക്ഷമായി തുടരുന്നു, ഒന്നും സംഭരിക്കില്ല.",
    "age": "പ്രായം",
    "income": "കുടുംബ വരുമാനം (₹)",
    "bplCard": "BPL കാർഡ് ഉണ്ട്",
    "run": "മാറ്റങ്ങൾ കാണുക",
    "running": "നിയമങ്ങൾ പരിശോധിക്കുന്നത്...",
    "noChange": "ഈ വിലുകൾ ഉപയോഗിച്ച് വിധികൾ മാറുന്നില്ല.",
    "changesHeading": "മാറുമെന്ന പ്രതീക്ഷിക്കുന്ന വിധികൾ",
    "error": "സിമുലേഷൻ പ്രവർത്തിക്കുന്നില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക."
  },
  "feedback": {
    "title": "ഈ റിപ്പോർട്ടിൽ ഒരു പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക",
    "lead": "തെറ്റായ വിധി, മോശം വിവർത്തനം, അല്ലെങ്കിൽ പഴയ പത്രങ്ങളുടെ പട്ടിക കണ്ടെത്തിയത്? ഞങ്ങളെ അറിയിക്കുക - ഇത് നേരിട്ട് പരിപാലകരിലേക്ക് പോകുന്നു.",
    "category": "ഏത് തരം പ്രശ്നം?",
    "categories": {
      "wrong_verdict": "ഒരു വിധി തെറ്റായി തോന്നുന്നു",
      "missing_scheme": "ഒരു പദ്ധതി ഇല്ല",
      "translation": "പരിഭാഷ തകരാറിലാണ്",
      "documents": "രേഖകൾ അല്ലെങ്കിൽ ഘട്ടങ്ങൾ പഴയതാണ്",
      "other": "മറ്റെന്തെങ്കിലും"
    },
    "scheme": "ഏത് പദ്ധതി?",
    "schemeNone": "ഒരു പദ്ധതിയെ കുറിച്ചല്ല",
    "message": "എന്താണ് തകരാറില്ലാത്തത്?",
    "noPii": "ദയവായി നിങ്ങളുടെ പേര്, ഫോൺ, അല്ലെങ്കിൽ ഏതെങ്കിലും ഐഡി നമ്പരുകൾ ഉൾപ്പെടുത്തരുത - റിപ്പോർട്ടുകൾ അജ്ഞാതമാണ്, തിരിച്ചറിയലുകൾ സ്വയമേവ നീക്കം ചെയ്യപ്പെടുന്നു.",
    "submit": "റിപ്പോർട്ട് അയയ്ക്കുക",
    "sending": "അയക്കുന്നത്...",
    "sent": "നന്ദി - നിങ്ങളുടെ റിപ്പോർട്ട് രേഖപ്പെടുത്തിയിരിക്കുന്നു.",
    "error": "നിങ്ങളുടെ റിപ്പോർട്ട് അയക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക."
  },
  "card": {
    "why": "എന്തുകൊണ്ട് - ഔദ്യോഗിക വാചകത്തിൽ അടിസ്ഥാനമാക്കിയുള്ളത്",
    "confirm": "പരിശോധിക്കാൻ, സ്ഥിരീകരിക്കുക:",
    "beforeApply": "അപേക്ഷിക്കുന്നതിന് മുമ്പ് - ഈ വിധി വസ്തുതകളിൽ അധിഷ്ഠിതമാണ്, ഓഫീസ് പരിശോധിക്കും:",
    "documents": "നിങ്ങൾക്ക് ആവശ്യമായ രേഖകൾ",
    "howToApply": "അപേക്ഷിക്കുന്നതെങ്ങനെ",
    "officialPage": "ഔദ്യോഗിക പദ്ധതി പേജ്"
  },
  "verdicts": {
    "eligible": "നിങ്ങൾക്ക് യോഗ്യത ఉన్నതായി തോന്നുന്നു",
    "likely_eligible": "ഉപയോഗയോഗ്യതയുള്ളതാണ്",
    "need_more_info": "ഒരു വിശദാംശം കൂടി ആവശ്യമാണ്",
    "not_eligible": "ഈ ആനുകൂല്യത്തിന് നിങ്ങൾക്ക് യോഗ്യത ഇല്ല"
  },
  "readAloud": {
    "listen": "ഈ ഭാഗം ശ്രദ്ധിക്കുക",
    "stop": "ഉറക്കുക"
  },
  "chips": {
    "heading": "നിങ്ങൾ ഞങ്ങളോട് പറഞ്ഞ കാര്യങ്ങളെ അടിസ്ഥാനമാക്കി",
    "ariaLabel": "ഈ റിപ്പോർട്ട് അടിസ്ഥാനമാക്കിയുള്ള വസ്തുതകൾ",
    "yearsOld": "{age} വയസ്സ്",
    "income": "{amount}/വർഷം കുടുംബ വരുമാനം",
    "bplCard": "BPL കാർഡ്",
    "ownsFarmland": "കൃഷി ഭൂമി ഉണ്ട്",
    "cultivatesCrops": "വിളകൾ കൃഷി ചെയ്യുന്നു",
    "disability": "{percent}% വൈകല്യം",
    "hasBankAccount": "ബാങ്ക് അക്കൗണ്ട് ഉണ്ട്",
    "noIncomeTax": "ഇൻകം ടാക്സ് ഇല്ല",
    "paysIncomeTax": "വരുമാന നികുതി അടയ്ക്കുന്നു",
    "govtJobInFamily": "കുടുംബത്തിൽ സർക്കാർ ജോലി",
    "ownsVehicle": "വാഹനം സ്വന്തമാക്കിയിട്ടുണ്ട്",
    "noLpg": "എൽപിജി കണക്ഷൻ ഇല്ല",
    "streetVendor": "തെരുവ് വെണ്ടർ",
    "vendingCertificate": "വിൽപ്പന സർട്ടിഫിക്കറ്റ്",
    "artisan": "പാരമ്പര്യ കലാകാരൻ",
    "postMatricStudent": "മാട്രിക് കഴിഞ്ഞ വിദ്യാർത്ഥി",
    "student": "വിദ്യാർത്ഥി",
    "daughter": "മകൾ, {age}",
    "gender": {
      "female": "സ്ത്രീ",
      "male": "പുരുഷൻ",
      "other": "മറ്റൊരു ലിംഗഭേദം"
    },
    "marital": {
      "single": "അവിവാഹിത",
      "married": "വിവാഹിത",
      "widowed": "വിധവ",
      "divorced": "വൈവാഹിക ബന്ധം അവസാനിപ്പിച്ചവർ"
    },
    "area": {
      "rural": "ഗ്രാമീണ മേഖല",
      "urban": "നഗര മേഖല"
    },
    "house": {
      "kutcha": "അസ്ഥायी വീട്",
      "pucca": "സ്ഥിരം വീട്"
    },
    "occupation": {
      "farmer": "കർഷകൻ",
      "street vendor": "തെരുവ് വെണ്ടർ",
      "artisan": "പാരമ്പര്യ കലാകാരൻ",
      "daily wage": "ദിവസ വേതനക്കാരൻ",
      "salaried": "ശമ്പളം (സ്വകാര്യം)",
      "govt service": "സർക്കാർ സേവനം",
      "self employed": "സ്വയം ജോലി ചെയ്യുന്നവർ",
      "homemaker": "ഗൃഹിണി",
      "student": "വിദ്യാർത്ഥി",
      "retired": "വിരമിച്ചവർ",
      "unemployed": "ഇപ്പോൾ ജോലി ചെയ്യുന്നില്ല",
      "other": "മറ്റ് ജോലി"
    }
  },
  "marketing": {
    "home": {
      "heroTitle": "Find out exactly what government support you’re entitled to",
      "heroLead": "Answer a few plain questions. Adhikaar checks the official rules of {schemeCount} central government schemes and shows its work — every claim linked to the government’s own words.",
      "ctaCheck": "നിങ്ങളുടെ അർഹത പരിശോധിക്കുക",
      "ctaHow": "See how it works",
      "heroNote": "Free · No login · Takes about 3 minutes",
      "trustGrounded": "Grounded in official documents",
      "trustCited": "Every claim cited",
      "trustCovered": "{schemeCount} central schemes covered",
      "trustOpenSource": "Open source",
      "howTitle": "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
      "howLead": "നിങ്ങളുടെ സാഹചര്യത്തിൽ നിന്ന് ഒരു റിപ്പോർട്ടിലേക്ക് മൂന്ന് ഘട്ടങ്ങൾ.",
      "stepLabel": "ഘട്ടം {number}",
      "step1Title": "നിങ്ങളെക്കുറിച്ച് ഞങ്ങളോട് പറയുക",
      "step1Body": "നിങ്ങളുടെ പ്രായം, ജോലി, കുടുംബം എന്നിവയെക്കുറിച്ചുള്ള ചില സാധാരണ ചോദ്യങ്ങൾ. ലോഗിൻ ഇല്ല, രേഖകൾ ഇല്ല, ഒന്നും സംഭരിക്കില്ല.",
      "step2Title": "ഞങ്ങൾ ഔദ്യോഗിക നിയമങ്ങൾ പരിശോധിക്കുന്നു",
      "step2Body": "നിങ്ങളുടെ ഉത്തരങ്ങൾ ഓരോ പദ്ധതിയുടെയും യോഗ്യതാ ഖണ്ഡികകൾക്കെതിരെ പരിശോധിക്കപ്പെടുന്നു — സർക്കാരിന്റെ സ്വന്തം വാചകത്തിൽ നിന്ന് എഴുതിയ നിയമങ്ങൾ പ്രകാരം, അനുമാനത്താൽ അല്ല.",
      "step3Title": "നിങ്ങൾക്ക് ഒരു ഉദ്ധരണിയുള്ള റിപ്പോർട്ട് ലഭിക്കും",
      "step3Body": "ഓരോ പദ്ധതിക്കും: നിങ്ങൾക്ക് യോഗ്യത ഉണ്ടെന്തുകൊണ്ട്, നിങ്ങൾക്ക് എന്ത് ലഭിക്കും, ഏത് രേഖകൾ കൊണ്ടുവരണം, എവിടെ അപേക്ഷിക്കണം — ഓരോ അവകാശവാദവും അതിന്റെ ഔദ്യോഗിക സ്രോതസ്സുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു.",
      "differentTitle": "Most tools search and summarise. Adhikaar decides — and proves it.",
      "differentBody1": "A chatbot that merely retrieves scheme text can sound confident and still be wrong — and a wrong “you qualify” costs real people real time and hope. Adhikaar works differently: every eligibility rule is written down from the official clause, your answers are checked against those rules deterministically, and a verifier confirms every sentence of the explanation against the source before you see it.",
      "differentBody2": "When we tested both approaches on the same cases, the plain-language AI invented 16 entitlements that didn’t exist.",
      "differentBody2Strong": "Adhikaar’s rules engine invented zero.",
      "differentBody2End": "And when it doesn’t have enough information, it asks — it never guesses.",
      "flowSituation": "Your situation",
      "flowRetrieved": "Official rules retrieved from government text",
      "flowDecides": "Deterministic rules engine decides",
      "flowVerifier": "വെരിഫയർ ഓരോ അവകാശവാദവും ഉറവിടത്തിനെതിരെ പരിശോധിക്കുന്നു",
      "flowCited": "ഉദ്ധരിച്ച ഉത്തരം നിങ്ങൾക്ക് സൂക്ഷിക്കാം",
      "readFull": "പൂർണ്ണ വിശദീകരണം വായിക്കുക",
      "closingTitle": "മൂന്ന് മിനിറ്റ്. ലോഗിൻ ഇല്ല. ഒഫീസിൽ കൊണ്ടുപോകാവുന്ന ഒരു റിപ്പോർട്ട്"
    },
    "about": {
      "title": "അധികാരം എന്നാൽ “അവകാശം” — ഇവ അതാണ്",
      "intro1": "ഇന്ത്യ ലോകത്തിലെ ഏറ്റവും വലിയ സാമൂഹ്യ ക്ഷേമ പരിപാടികൾ ചിലത് നടത്തുന്നു, എന്നാൽ നിങ്ങൾക്ക് എന്തിനർഹമാണെന്ന് അറിയുന്നതിന് ഇപ്പോഴും പലരും അറിവ് ഇല്ല: നിയമങ്ങൾ പോർട്ടലുകളിലും പിഡിഎഫുകളിലും ഭാഷയിൽ എഴുതിയിരിക്കുന്നു. അധികാരങ്ങൾ അറിയാതെ പോകുന്നത് യോഗ്യതയില്ലാത്തതിനാൽ അല്ല, പകരം തങ്ങൾക്ക് അർഹതയുണ്ടെന്ന് അറിയാത്തതിനാലാണ്",
      "intro2": "അധികാരം ഈ അന്തരം ശ്രദ്ധാപൂർവ്വം അടയ്ക്കാൻ ഒരു ശ്രമമാണ്. ഒരു ചോദ്യത്തിന് ഉത്തരം നൽകുന്നു — “എന്തിനാണ് ഞാൻ അർഹനാകുന്നത്?” — {schemeCount} കേന്ദ്ര പദ്ധതികൾക്കായി, സാധാരണ ഭാഷയിൽ, ഓരോ അവകാശവാദവും ഗവൺമെന്റിന്റെ സ്വന്തം വാചകത്തിലേക്ക് തുടങ്ങുന്നു. തെറ്റായതായിരിക്കാൻ സാഹചര്യമുണ്ടെങ്കിൽ “ഇത് ഓഫീസിൽ ചോദിക്കുക” എന്ന് പറയുന്നതിനേക്കാൾ നിഷ്ചിതമായി തെറ്റായിരിക്കില്ല",
      "openTitle": "ഓപ്പൺ സോഴ്സ്, പരിശോധിക്കാവുന്നത്",
      "openBody": "The whole system is open: the rules files (one clause of official text per rule), the evaluation dataset and results, and this site. If you find a rule that’s wrong or out of date, you can point at the exact line — and fix it.",
      "linkSource": "Source code and rule files on GitHub",
      "linkMyscheme": "myScheme — the official scheme portal",
      "privacyTitle": "Privacy, simply",
      "privacyBody": "There are no accounts and no database of people. Your answers live in your browser and in the link or resume code you choose to keep; they are sent to the eligibility engine only to compute your report, and are not stored there.",
      "finePrintTitle": "The honest fine print",
      "contactTitle": "Contact",
      "contactBody": "Found a mistake in a rule, or want to help cover more schemes?",
      "contactLink": "GitHub-ൽ ഒരു പ്രശ്നം തുറക്കുക",
      "contactEnd": "— തിരുത്തലുകൾ ഈ പ്രോജക്റ്റിന് ലഭിക്കാവുന്ന ഏറ്റവും വിലയേറിയ സംഭാവനയാണ്.",
      "closing": "നിങ്ങൾക്ക് എത്ര കിട്ടുമെന്ന് കണ്ടെത്തുക"
    },
    "howItWorks": {
      "title": "അതിന്റെ പ്രവർത്തനങ്ങൾ പരിശോധിക്കാൻ വേണ്ടി നിർമ്മിച്ചത്",
      "intro": "മിക്ക AI ഉപകരണങ്ങളും പ്രമാണീകരണ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുന്നത് രേഖകൾ തിരയുകയും കണ്ടെത്തിയത് സംഗ്രഹിക്കുകയും ചെയ്യുന്നു. അത് ശരിയായതുപോലെ തോന്നാം, പക്ഷേ തെറ്റായിരിക്കും. അധികാരം ജോലികൾ വേർതിരിക്കുന്നു: ഭാഷാ മോഡലുകൾ മാത്രം വായിക്കുകയും വിശദീകരിക്കുകയും ചെയ്യുന്നു — ഒരു നിർണായക നിയമ എഞ്ചിൻ തീരുമാനിക്കുന്നു, ഒരു വെറിഫയർ നിങ്ങൾക്ക് കാണുന്നതിനുമുമ്പ് ഓരോ അവകാശവാദവും ഔദ്യോഗിക വാചകത്തിനെതിരെ പരിശോധിക്കുന്നു.",
      "pipelineTitle": "നിങ്ങളുടെ ഉത്തരങ്ങളിൽ നിന്ന് ഉദ്ധരിച്ച റിപ്പോർട്ട്",
      "pipe1Title": "നിങ്ങളുടെ സാഹചര്യം",
      "pipe1Body": "നിങ്ങൾ ഒരു ചെറിയ സംഖ്യക്ക് സാധാരണ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുന്നു — പ്രായം, ജോലി, കുടുംബം. ലോഗിൻ ഇല്ല, ഒന്നും ഒരിടത്തും സംഭരിച്ചിട്ടില്ല",
      "pipe2Title": "Official rules are retrieved",
      "pipe2Body": "The scheme text comes straight from government sources — myScheme and official guidelines — kept with its section labels and source links. {schemeCount} central schemes, {ruleCount} encoded rules.",
      "pipe3Title": "A rules engine decides — not the AI",
      "pipe3Body": "Each eligibility clause is written down as an executable rule. Your answers are checked against them deterministically: met, not met, or unknown. Unknown never becomes a guess — it becomes a question.",
      "pipe4Title": "A verifier checks every claim",
      "pipe4Body": "Before anything reaches you, every sentence of the explanation is checked against the official text it cites. Claims that can’t be verified are dropped.",
      "pipe5Title": "You get a cited answer",
      "pipe5Body": "Every verdict comes with the exact clause it rests on, a link to the official source, and honest “likely” wording where the office still has to verify a fact.",
      "measuredTitle": "അളക്കപ്പെട്ട, യഥാർത്ഥമായി",
      "measuredLead": "ഞങ്ങൾ നിയമങ്ങളുടെ എഞ്ചിൻ ഒരു സാധാരണ എഐ ബേസ്ലൈനുമായി അതേ 41 ലേബൽ ചെയ്ത കേസുകളിൽ പരീക്ഷിച്ചു - അതേ ശേഖരണം, അതേ അടിസ്ഥാന മോഡൽ, വ്യത്യസ്തമായ തീരുമാനമെടുക്കുന്നവരാണ് മാത്രം.",
      "statFpCaption": "നിയമങ്ങളുടെ എഞ്ചിൻ (എഐ ബേസ്ലൈൻ 16 പ്രസ്താവിച്ചു) അസ്ഥിരമായി അവകാശപ്പെട്ടിരിക്കുന്ന തട്ടിപ്പുകൾ",
      "statAccCaption": "യോഗ്യതാ കൃത്യത, എഐ-ഒന്നിച്ച് ബേസ്ലൈന്റെ 57% നുള്ളിലേക്ക്",
      "statFaithCaption": "അതിന്റെ ആവശ്യപ്പെടൽ ഉദ്ധരിച്ച ഔദ്യോഗിക വാചകത്താൽ പിന്തുണയ്ക്കുന്നത്",
      "measuredNote": "ചെറിയ ലേബൽ ചെയ്ത മൂല്യനിർണ്ണയ സെറ്റ് - ഇവയെ എഞ്ചിനീയറിംഗ് എണ്ണങ്ങളായി കണക്കാക്കുക, ജനസംഖ്യാ സംഖ്യകളല്ല. പൂർണ്ണ രീതിശാസ്ത്രവും കഠിനമായ ഫലങ്ങളും ഓപ്പൺ സോഴ്സ് റിപ്പോസിറ്ററിയിലാണ്.",
      "principlesTitle": "അതിന്റെ പിന്നിലെ തത്വങ്ങൾ",
      "prin1Title": "ഞങ്ങൾ ഒരു അവകാശവാദം ഉണ്ടാക്കുന്നില്ല",
      "prin1Body": "A wrong “you qualify” costs real people bus fare, queues, and hope. The rules engine can only conclude what the encoded official clauses support. In our evaluation it asserted zero false entitlements across 92 judgments — the AI-only baseline asserted 16.",
      "prin2Title": "“Not sure” is a first-class answer",
      "prin2Body": "Eligibility rules have three outcomes here: met, not met, and unknown. Anything unknown turns into a question or an honest “needs one more detail” — never a silent assumption.",
      "prin3Title": "Some facts only the office can verify",
      "prin3Body": "Whether your family is on the BPL or SECC list can’t be checked from a conversation. Verdicts that rest on such facts are marked “likely eligible” and the report says exactly what to confirm.",
      "prin4Title": "Freshness is visible",
      "prin4Body": "Every scheme page shows the date its official text was fetched and verified. If the text is a transcription (one scanned PDF is), that’s disclosed too.",
      "limitsTitle": "What this can’t do (yet)",
      "limitCoverage": "യോഗ്യതാ പരിശോധന ഇന്ന് {schemeCount} കേന്ദ്ര പദ്ധതികൾ തീരുമാനിക്കുന്നു. {pendingCount} കൂടുതൽ കാറ്റലോഗിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട് - മെഷീൻ ഡ്രാഫ്റ്റ് ചെയ്ത നിയമങ്ങൾ മനുഷ്യ വെരിഫിക്കേഷൻ കാത്തിരിക്കുന്നു - ഓരോ വ്യക്തിയും അതിന്റെ ഔദ്യോഗിക സ്രോതസ്സിനെതിരെ ഓരോ നിയമവും പ്രമാണീകരിക്കുന്നതിന് ശേഷമാണ് പരിശോധനയിൽ ചേരുന്നത്.",
      "limitOutOfScope": "ഒന്ന് കൂടി റഫറൻസിനായി പട്ടികയിൽ ഉണ്ട്: അതിന്റെ അപേക്ഷകന് ഒരു സ്ഥാപനമാണ്, വ്യക്തിയല്ല, അതിനാൽ വ്യക്തിഗത പരിശോധന ബാധകമല്ല.",
      "limitStates": "സംസ്ഥാന പദ്ധതികൾ - പലപ്പോഴും ഏറ്റവും പ്രസക്തമായവ - ഇപ്പോഴും ഉൾപ്പെടുത്തിയിട്ടില്ല, അതിനാൽ 'ഇവിടെ യോഗ്യതയില്ല' എന്നത് 'ഏതെങ്കിലും സ്ഥലത്ത് യോഗ്യതയില്ല' എന്നതല്ല.",
      "limitSelfReported": "ഉത്തരങ്ങൾ സ്വയം റിപ്പോർട്ട് ചെയ്യുന്നവയാണ്. നിയമനം നടപ്പിലാക്കുന്ന അധികാരിയുടെ അധികാരപരിധിയിൽ എല്ലായ്പ്പോഴും അവസാന തീരുമാനം വരുന്നു, ഈ റിപ്പോർട്ട് അവരെ കാണാൻ രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു - അവരെ മാറ്റിസ്ഥാപിക്കാൻ അല്ല. ഒരു വിധി ഒരു വസ്തുതയെ ആശ്രയിക്കുമ്പോൾ, ഓഫീസ് മാത്രം സ്ഥിരീകരിക്കാൻ കഴിയും (BPL അല്ലെങ്കിൽ SECC പട്ടിക), റിപ്പോർട്ട് ഇപ്പോൾ ഏത് സ്ഥിരീകരിക്കണം, എവിടെയെന്ന് പറയുന്നു.",
      "limitSimplified": "ചില വിരളമായി സജ്ജമാക്കിയ മാനദണ്ഡങ്ങൾ ലളിതമാക്കിയിരിക്കുന്നു - ഉദാഹരണത്തിന്, PM-KISAN-ന്റെ ഭരണഘടനാ പോസ്റ്റ് ഹോൾഡർമാരും പ്രാക്ടീസിംഗ് പ്രൊഫഷണലുകളും ഒഴിവാക്കലുകൾ ഇപ്പോൾ എൻകോഡ് ചെയ്തിരിക്കുന്നു, അതേസമയം നോട്ടിഫൈഡ്-ക്രോപ്പ് മേഖലകൾ (PMFBY) ഉം രണ്ട് അക്കൗണ്ടുകൾ-പർ-ഫാമിലി ക്യാപ്പ് (സുകന്യ സമൃദ്ധി) ഉം അല്ല. ബാക്കി ലളിതവത്കരണങ്ങൾ എല്ലാം ഓപ്പൺ-സോഴ്സ് നിയമ ഫയലുകളിൽ പട്ടികയിൽ ഉണ്ട്, ബാധിക്കുന്ന നിയമത്തിന് വശത്ത്.",
      "limitLanguages": "ഇംഗ്ലീഷ്, ഹിന്ദി എന്നിവയ്ക്ക് പുറമേ, മറ്റ് ഒമ്പത് ഭാഷകൾ മെഷീൻ വിവർത്തനം ചെയ്തിരിക്കുന്നു, ഇപ്പോഴും സ്വദേശി സ്പീക്കറുടെ അവലോകനം കാത്തിരിക്കുന്നു - ചില സ്ഥലങ്ങളിൽ വാക്കാലിന്റെ വാചകം പൂർണ്ണമായും ആയിരിക്കില്ല.",
      "closing": "അത് മനസ്സിലാക്കാൻ ഏറ്റവും നല്ല മാർഗം അത് പ്രയത്നിക്കുക എന്നതാണ്."
    },
    "lifeEvents": {
      "eyebrow": "A check for this moment",
      "relevantTitle": "This check covers, among others:",
      "ctaNote": "About 3 minutes · No login · Answers stay on your device",
      "startCheck": "Start the check",
      "widowedTitle": "Support after losing your spouse",
      "widowedLead": "A monthly widow pension and survivor benefits exist, but many go unclaimed simply because nobody says so at the office. Answer a few plain questions and see exactly what you can claim — every answer backed by the official rules.",
      "pregnantTitle": "Expecting a child? Check what support you can claim now",
      "pregnantLead": "Health cover and family-support schemes have specific windows — some must be claimed during pregnancy or soon after birth. A few questions show what applies to you, with the official text to take along.",
      "farmerTitle": "Farming a small holding? Some support is yours by right",
      "farmerLead": "Income support, crop insurance, and pension schemes exist for farming families — with exclusions that are hard to guess. Check which ones your household can actually claim, cited to the official rules.",
      "studentTitle": "Scholarships your family may be missing",
      "studentLead": "Post-matric scholarships and education support depend on category, income, and course — rules that are easy to misread. Answer for the student in your family and see what applies, with sources.",
      "seniorTitle": "Past 60? A monthly pension may already be yours",
      "seniorLead": "Old-age pensions are small but real, and the eligibility rules are precise. Two minutes of questions show whether you or a parent can claim one — and exactly what to take to the office.",
      "disabilityTitle": "Living with a disability? Check your entitlements",
      "disabilityLead": "Disability pensions and support schemes depend on the certified disability percentage and a few facts about your household. See what the official rules say you can claim."
    }
  },
  "citation": {
    "sections": {
      "eligibility": "യോഗ്യതാ വ്യവസ്ഥ",
      "exclusions": "ഒഴിവാക്കൽ വ്യവസ്ഥ",
      "benefits": "പ്രയോജനങ്ങൾ",
      "details": "പദ്ധതി വിശദാംശങ്ങൾ",
      "application": "അപേക്ഷിക്കുന്നതെങ്ങനെ",
      "documents": "രേഖകൾ",
      "faq": "ഔദ്യോഗിക FAQ"
    },
    "officialText": "ഔദ്യോഗിക വാചകം",
    "viewSource": "ഔദ്യോഗിക ഉറവിടം കാണുക"
  },
  "voice": {
    "speak": "Answer by speaking",
    "stop": "Stop listening"
  },
  "family": {
    "addMember": "Add a family member",
    "addMemberHelp": "One report for the whole household: add a family member and the shared details — income, home, ration card — carry over, so only their personal questions remain.",
    "reportLabel": "Family entitlement report",
    "entitledTitle": "Together, your family may be entitled to {count} benefits",
    "noEntitlementTitle": "We couldn't confirm an entitlement for the family yet",
    "lead": "Each person was checked separately against the same official rules — household facts were shared, everything personal is their own answers. Every verdict below is cited, exactly as in a single report.",
    "memberLabel": "Family member {n}",
    "needInfo": "One more detail is needed to finish this member's check:",
    "noneForMember": "No scheme matched for this member — circumstances change, and so can this.",
    "notMatchedCount": "{count} schemes didn't match for this member."
  },
  "docGuides": {
    "title": "How to get these documents",
    "lead": "Practical notes for the documents your schemes ask for. Fees and timelines vary by state — treat these as typical, not exact.",
    "whereLabel": "Where",
    "costLabel": "Cost",
    "timeLabel": "Time",
    "aadhaar": {
      "name": "Aadhaar card",
      "where": "Any Aadhaar Seva Kendra or Common Service Centre (CSC); book or locate one on uidai.gov.in.",
      "cost": "First enrolment is free; most updates cost about ₹50.",
      "time": "Enrolment takes minutes; the card arrives by post within about 30 days. The enrolment slip works as proof sooner."
    },
    "bank_account": {
      "name": "Bank account / passbook",
      "where": "Any bank branch, India Post Payments Bank, or a banking correspondent. Ask for a Jan Dhan (PMJDY) account — zero balance, no charges.",
      "cost": "Free for Jan Dhan accounts.",
      "time": "Usually opened the same day with Aadhaar."
    },
    "caste_certificate": {
      "name": "Caste / category certificate",
      "where": "Your tehsil / SDM office, or your state’s e-district portal online.",
      "cost": "Free to about ₹50 depending on the state.",
      "time": "Typically 2–4 weeks."
    },
    "income_certificate": {
      "name": "Income certificate",
      "where": "Tehsil / revenue office, or your state’s e-district portal.",
      "cost": "Nominal (usually under ₹50).",
      "time": "Typically 1–3 weeks. Note: most states treat it as valid for 6–12 months, so check yours is current."
    },
    "bpl_card": {
      "name": "BPL listing",
      "where": "Your gram panchayat or the district food & civil supplies office keeps the BPL / SECC list; ask them to check your family’s inclusion.",
      "cost": "Checking the list is free.",
      "time": "The check itself is quick; adding a family to the list is a state process that can take much longer."
    },
    "ration_card": {
      "name": "Ration card",
      "where": "Your state food & civil supplies department — online portal or the local ration office.",
      "cost": "Free to nominal, by state.",
      "time": "Typically 2–4 weeks."
    },
    "land_records": {
      "name": "Land records (khasra / khatauni)",
      "where": "Your patwari or tehsil office; most states also give instant online copies on their bhulekh / land-records portal.",
      "cost": "Online copies are free or a few rupees; certified copies cost a small fee.",
      "time": "Online: immediate. Certified copy: a few days."
    },
    "disability_certificate": {
      "name": "Disability certificate / UDID",
      "where": "The medical board at a government hospital; apply for the UDID card on swavlambancard.gov.in.",
      "cost": "Free.",
      "time": "A few weeks including the medical assessment."
    },
    "photo": {
      "name": "Passport-size photographs",
      "where": "Any photo studio.",
      "cost": "About ₹30–100 for a set.",
      "time": "Same day."
    },
    "age_proof": {
      "name": "Proof of age / birth certificate",
      "where": "The municipal body or gram panchayat where the birth was registered; a school-leaving certificate usually also works.",
      "cost": "Free to nominal.",
      "time": "Typically 1–2 weeks for a fresh copy."
    },
    "residence_proof": {
      "name": "Residence / domicile certificate",
      "where": "Tehsil office or your state’s e-district portal.",
      "cost": "Nominal.",
      "time": "Typically 1–3 weeks."
    },
    "death_certificate": {
      "name": "Death certificate",
      "where": "The municipal body or gram panchayat where the death was registered.",
      "cost": "Free to nominal (first copy is often free).",
      "time": "Typically 1–2 weeks."
    }
  }
,
"catalog": {
    "title": "Explore the schemes",
    "lead": "Every central scheme documented here carries its benefits, official sources, and — for the {schemeCount} schemes the eligibility check decides today — the exact rules we check. Schemes marked “check coming soon” have machine-drafted rules awaiting human verification; we don’t judge eligibility for them until a person has certified every rule.",
    "freshnessUnchanged": "Freshness: all {checked} myScheme-sourced pages were re-fetched and diffed against our audited text on {date} — no changes found.",
    "freshnessChanged": "Freshness: all {checked} myScheme-sourced pages were re-fetched and diffed against our audited text on {date} — {changed} changed and are flagged on their pages.",
    "searchLabel": "Search schemes",
    "searchPlaceholder": "Search by name or benefit",
    "filterCategoryLabel": "Filter by category",
    "filterAudienceLabel": "Filter by who it's for",
    "allCategories": "All categories",
    "everyone": "Everyone",
    "showing": "Showing {shown} of {total} schemes",
    "emptyTitle": "No schemes match",
    "emptyBody": "Try a different word, or clear the filters — every scheme will come back.",
    "emptyClear": "Clear search and filters",
    "individualsOnly": "Individuals only",
    "comingSoon": "Check coming soon",
    "viewDetails": "View details",
    "categories": {
      "farmers": "Farming",
      "pension": "Pensions",
      "insurance": "Insurance",
      "health": "Health",
      "housing": "Housing",
      "education": "Education",
      "livelihood": "Livelihood",
      "household": "Household",
      "savings": "Savings"
    },
    "audiences": {
      "women": "Women & daughters",
      "farmers": "Farmers",
      "workers": "Workers & vendors",
      "students": "Students",
      "seniors": "Older adults",
      "disability": "Persons with disabilities",
      "families": "Low-income families"
    }
  }
};

export const mlWizard: WizardOverlay = {
  "steps": {
    "about": {
      "title": "ഉള്പ്പടുത്തിയവ ൊപ്പം",
      "lead": "മിക്ക പദ്ധതികളും പ്രായം ജീവിത സാഹചര്യത്തെ ആശ്രയിച്ചിരിക്കുന്നു — ഇത് നിങ്ങളുടെ റിപ്പോർട്ടിന്റെ അടിത്തറയാണ്."
    },
    "place": {
      "title": "നിങ്ങൾ താമസിക്കുന്ന സ്ഥലം",
      "lead": "ചില പദ്ധതികൾ ഗ്രാമങ്ങളിലും നഗരങ്ങളിലും വ്യത്യസ്തമായി പ്രവർത്തിക്കുന്നു."
    },
    "work": {
      "title": "നിങ്ങളുടെ ജോലിയും വരുമാനവും",
      "lead": "ഇത് ഞങ്ങളെ കർഷകൻ, വെണ്ടർ, കലാകാരൻ, വരുമാനം ബന്ധപ്പെട്ട പദ്ധതികൾ പരിശോധിക്കാൻ സഹായിക്കുന്നു."
    },
    "work-details": {
      "title": "നിങ്ങളുടെ ജോലിയെക്കുറിച്ച്  കൂടുതൽ"
    },
    "household": {
      "title": "നിങ്ങളുടെ കുടുംബം",
      "lead": "ഈ ഉത്തരങ്ങൾ നിങ്ങളുടെ ഭവന, ആരോഗ്യം, പാചക വാതക പദ്ധതികളുടെ യോഗ്യത നിർണ്ണയിക്കുന്നു."
    },
    "family": {
      "title": "നിങ്ങളും നിങ്ങളുടെ കുടുംബവും",
      "lead": "അവസാന സെറ്റ് - പെൻഷൻ, ഇൻഷുറൻസ്, സമ്പാദ്യം, ആരോഗ്യ പരിരക്ഷ."
    }
  },
  "fields": {
    "age": {
      "label": "നിങ്ങളുടെ പ്രായം",
      "help": "വയസ్సിൽ. മിക്ക പദ്ധതികൾക്കും ഒരു പ്രായ പരിധി ഉണ്ട്, അതിനാൽ ഇത് വളരെ പ്രധാനമാണ്.",
      "errorText": "നിങ്ങളുടെ പ്രായം ദയവായി നൽകുക - മിക്ക പദ്ധതികളും ഇതിനെ ആശ്രയിച്ചിരിക്കുന്നു.",
      "placeholder": "ഉദാ. 45"
    },
    "gender": {
      "label": "ലിംഗം",
      "whyWeAsk": "ചില പദ്ധതികൾ സ്ത്രീകൾക്ക് മാത്രമാണ് - വിധവ പെൻഷൻ, പെൺകുട്ടികളുടെ സമ്പാദ്യ പദ്ധതി പോലെ. ഞങ്ങൾ ഇത് ഒരിക്കലും സംഭരിക്കുന്നില്ല.",
      "options": {
        "female": {
          "label": "സ്ത്രീ"
        },
        "male": {
          "label": "പുരുഷൻ"
        },
        "other": {
          "label": "മറ്റൊരു ലിംഗഭേദം"
        },
        "unsure": {
          "label": "ഉത്തരം നൽകാൻ ആഗ്രഹിക്കുന്നില്ല"
        }
      }
    },
    "marital_status": {
      "label": "വിവാഹ നില",
      "whyWeAsk": "ഇന്ദിരാഗാന്ധി വിധവ പെൻഷൻ വിവാഹ നിലയെ ആശ്രയിച്ചിരിക്കുന്നു. ഒരു നിയമം പരിശോധിക്കാൻ ഞങ്ങൾ ഇത് ഉപയോഗിക്കുന്നു.",
      "options": {
        "single": {
          "label": "അവിവാഹിതൻ"
        },
        "married": {
          "label": "വിവാഹിതൻ"
        },
        "widowed": {
          "label": "വിധവ"
        },
        "divorced_separated": {
          "label": "വൈവാഹിക വേർപാട്ടോ വിവാഹമോചനമോ"
        },
        "unsure": {
          "label": "ഉത്തരം നൽകാൻ ആഗ്രഹിക്കുന്നില്ല"
        }
      }
    },
    "state": {
      "label": "സംസ്ഥാനം അല്ലെങ്കിൽ കേന്ദ്രഭരണ പ്രദേശം",
      "help": "നിലവിൽ ഞങ്ങൾ കേന്ദ്ര സർക്കാർ പദ്ധതികൾ ഉൾക്കൊള്ളുന്നു, ഇത് ഇന്ത്യയ بأంతയും ബന്ധപ്പെട്ടതാണ്.",
      "placeholder": "നിങ്ങളുടെ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക"
    },
    "area": {
      "label": "നിങ്ങൾ ഒരു ഗ്രാമത്തിലോ നഗരത്തിലോ താമസிக்கുന്നുണ്ടോ?",
      "help": "ഉദാഹരണത്തിന്, ഭവന സഹായം ഇപ്പോൾ ഗ്രാമീണ മേഖലകൾക്കാണ്.",
      "options": {
        "rural": {
          "label": "ഗ്രാമം (ഗ്രാമീണ)"
        },
        "urban": {
          "label": "നഗരം അല്ലെങ്കിൽ പട്ടണം (നഗര)"
        }
      }
    },
    "occupation": {
      "label": "നിങ്ങളുടെ പ്രധാന ജോലി ഏതാണ്?",
      "placeholder": "ഒന്ന് തിരഞ്ഞെടുക്കുക",
      "options": {
        "farmer": {
          "label": "കർഷകൻ"
        },
        "street_vendor": {
          "label": "തെരുവ് വെണ്ടർ അല്ലെങ്കിൽ ഹോക്കർ"
        },
        "artisan": {
          "label": "പരമ്പരാഗത കലാകാരൻ അല്ലെങ്കിൽ കരകൗശല വിദഗ്ദ്ധൻ"
        },
        "daily_wage": {
          "label": "ദിവസവേതന അല്ലെങ്കിൽ കൈവേലക്കാരൻ"
        },
        "salaried": {
          "label": "സ്വകാര്യ മേഖലയിലെ ശമ്പള ജോലി"
        },
        "govt_service": {
          "label": "സർക്കാർ സേവനം"
        },
        "self_employed": {
          "label": "സ്വയം തൊഴിൽ അല്ലെങ്കിൽ ചെറുകിട ബിസിനസ്സ്"
        },
        "homemaker": {
          "label": "വീട്ടമ്മ"
        },
        "student": {
          "label": "വിദ്യാർത്ഥി"
        },
        "retired": {
          "label": "വിരമിച്ച വ്യക്തി"
        },
        "unemployed": {
          "label": "ഇപ്പോൾ ജോലി ചെയ്യുന്നില്ല"
        },
        "other": {
          "label": "മറ്റെന്തെങ്കിലും"
        }
      }
    },
    "annual_family_income_inr": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിന്റെ വാർഷിക വരുമാനം (₹)",
      "help": "നികുതി എടുക്കുന്നതിന് മുമ്പ് വീട്ടിലെ എല്ലാവരുടെയും വരുമാനം. ഏകദേശം കണക്ക് മതി.",
      "whyWeAsk": "ചില പദ്ധതികൾക്ക് വരുമാന പരിധി ഉണ്ട് — ഉദാഹരണത്തിന് എസ്‌സി സ്കോളർഷിപ്പിനായി പ്രതിവർഷം ₹2.5 ലക്ഷം. നിങ്ങളുടെ ഉത്തരം ആ പരിധികളുമായി മാത്രം താരതമ്യം ചെയ്യുകയും ഒരിക്കലും സംഭരിക്കപ്പെടുകയും ചെയ്യുന്നില്ല.",
      "placeholder": "ഉദാ. 120000"
    },
    "pays_income_tax": {
      "label": "കഴിഞ്ഞ വർഷം നിങ്ങളുടെ കുടുംബത്തിലെ ആരെങ്കിലും വരുമാന നികുതി അടച്ചിട്ടുണ്ടോ?",
      "help": "ചില പദ്ധതികൾ വരുമാന നികുതി അടയ്ക്കുന്നവരെ ഒഴിവാക്കുന്നു. “എനിക്ക് ഉറപ്പില്ല” എന്നത് ഒരു നല്ല ഉത്തരമാണ്.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "is_farmer_with_land": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിന് സ്വന്തമായി കൃഷിക്ക് യോഗ്യമായ ഭൂമി ഉണ്ടോ?",
      "help": "PM-KISAN സഹായം ഭൂമി കൈവശമുള്ള കർഷക കുടുംബങ്ങളെത്തേക്ക് പോകുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "cultivates_crops": {
      "label": "ആ ഭൂമിയിൽ നിങ്ങൾ വിളകൾ കൃഷി ചെയ്യാറുണ്ടോ?",
      "help": "വിള ഇൻഷുറൻസ് അറിയിപ്പുള്ള വിളകൾ യഥാർത്ഥത്തിൽ കൃഷി ചെയ്യുന്ന കർഷകർക്ക് ബാധകമാണ്.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "has_land_ownership_or_tenure_docs": {
      "label": "നിങ്ങളുടെ പക്കൽ ഭൂമി രേഖകൾ ഉണ്ടോ - ഉടമസ്ഥതയുടെയോ വാടകയുടെയോ രേഖകൾ?",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "holds_constitutional_or_political_post": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിലെ ആരെങ്കിലും ഒരു മന്ത്രി, എംപി, എംഎൽഎ, മേയർ അല്ലെങ്കിൽ ജില്ലാ പഞ്ചായത്ത് അധ്യക്ഷൻ പോലുള്ള ഒരു ഭരണഘടനാ പദവി അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കപ്പെട്ട ഓഫീസ് വഹിച്ചിട്ടുണ്ടോ?",
      "help": "PM-KISAN അത്തരം ഓഫീസ് ഉടമകളുടെ കുടുംബങ്ങളെ ഒഴിവാക്കുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "is_practicing_registered_professional": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിലെ ആരെങ്കിലും ഡോക്ടർ, എഞ്ചിനീയർ, അഭിഭാഷകൻ, ചാർട്ടേഡ് അക്കൗണ്ടന്റ് അല്ലെങ്കിൽ ആർക്കിടെക്റ്റ് പോലുള്ള ഒരു പ്രാക്ടീസ് ചെയ്യുന്ന രജിസ്റ്റർ ചെയ്ത പ്രൊഫഷണലായിട്ടുണ്ടോ?",
      "help": "PM-KISAN പ്രാക്ടീസ് ചെയ്യുന്ന രജിസ്റ്റർ ചെയ്ത പ്രൊഫഷണലുകളുടെ കുടുംബങ്ങളെ ഒഴിവാക്കുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "has_vending_certificate_or_lor": {
      "label": "നിങ്ങളുടെ പക്കൽ ഒരു വെണ്ടിംഗ് സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ നിങ്ങളുടെ ടൗൺ ബോഡിയിൽ നിന്നുള്ള ഒരു ശുപാർശ കത്ത് ഉണ്ടോ?",
      "help": "PM SVANidhi വായ്പകൾ ഇവയിലൊന്നിനാണ് ആവശ്യപ്പെടുന്നത്. ഇല്ലെങ്കിൽ, നിങ്ങളുടെ പട്ടണത്തിലെ വെണ്ടിംഗ് കമ്മിറ്റിക്ക് അത് ഇഷ്യൂ ചെയ്യാൻ കഴിയും.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "is_vishwakarma_trade_artisan": {
      "label": "നിങ്ങളുടെ കല 18 പരമ്പരാഗത കലകളിൽ ഒന്നാണോ - മരപ്പണിക്കാരൻ, കറുത്തവൻ, തയ്യൽക്കാരൻ, കുയ്യൻ, ചെരിപ്പുവേലക്കാരൻ, സ്വർണ്ണപ്പണിക്കാരൻ പോലുള്ളവ?",
      "help": "PM വിശ്വകർമ്മ ഈ ലിസ്റ്റുചെയ്ത കുടുംബ കലകളെ പിന്തുണയ്ക്കുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "is_post_matric_student": {
      "label": "10-ാം ക്ലാസിന് ശേഷം നിങ്ങൾ പഠിക്കുന്നു (മാറ്റ്രിക്കുലേഷൻ കഴിഞ്ഞ്)?",
      "help": "SC സ്കോളർഷിപ്പ് 10-ാം ക്ലാസിന് ശേഷമുള്ള കോഴ്സുകൾ ഉൾക്കൊള്ളുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "social_category": {
      "label": "സാമൂഹിക വിഭാഗം",
      "whyWeAsk": "പോസ്റ്റ്-മാറ്റ്രിക് സ്കോളർഷിപ്പ് പ്രത്യേകിച്ച് SC വിദ്യാർത്ഥികൾക്കുള്ളതാണ്, അതിനാൽ ഈ ഉത്തരവുമായി മാത്രം ഞങ്ങൾക്ക് അത് പരിശോധിക്കാൻ കഴിയും. അത് ഒരിക്കലും സൂക്ഷിക്കുകയോ പങ്കിടുകയോ ചെയ്യുന്നില്ല.",
      "options": {
        "general": {
          "label": "പൊതുവായത്"
        },
        "obc": {
          "label": "ഒബിസി"
        },
        "sc": {
          "label": "എസ്‌സി"
        },
        "st": {
          "label": "എസ്‌ടി"
        },
        "ews": {
          "label": "ഇവിഎസ് (സാമ്പത്തികമായി ദുർബലരായ വിഭാഗം)"
        },
        "dnt": {
          "label": "ഡിഎൻടി (അടയാളപ്പെടുത്തിയ അല്ലാത്തതോ അല്ലാത്തതോ ആയ ഗോത്രവർഗക്കാർ)"
        },
        "safai_mitra": {
          "label": "ശുചിത്വ മിത്ര (ശുചിത്വ പ്രവർത്തകർ അല്ലെങ്കിൽ മാലിന്യം ശേഖരിക്കുന്നവർ)"
        },
        "minority": {
          "label": "ന്യൂനപക്ഷ (മുസ്ലീം, ക്രിസ്ത്യൻ, സിഖ്, ബുദ്ധ, ജൈന, പാഴ്സി)"
        },
        "unsure": {
          "label": "ഉത്തരം നൽകാൻ ആഗ്രഹിക്കുന്നില്ല"
        }
      }
    },
    "has_bpl_card": {
      "label": "ബിപിഎൽ പട്ടികയിൽ നിങ്ങളുടെ കുടുംബം ഉണ്ടോ, അല്ലെങ്കിൽ നിങ്ങൾക്ക് ബിപിഎൽ / മുൻഗണനാ റേഷൻ കാർഡ് ഉണ്ടോ?",
      "whyWeAsk": "പെൻഷൻ, പാചക വാതക പദ്ധതികൾ ബിപിഎൽ പട്ടിക ഉപയോഗിക്കുന്നു. ഞങ്ങൾക്ക് പട്ടിക തന്നെ പരിശോധിക്കാൻ കഴിയാത്തതിനാൽ, ഒരു“അതെ” ആയാൽ ആ വിധികൾ“സാധ്യതയുള്ള യോഗ്യത” ആക്കി, ഓഫീസിൽ സ്ഥിരീകരിക്കണം.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "house_type": {
      "label": "നിങ്ങൾ താമസിക്കുന്ന വീട് ഏതുതരം വീടാണ്?",
      "help": "ഗ്രാമീണ ഭവന സഹായം കുച്ഛ വീടുകളിലെ കുടുംബങ്ങൾക്ക് ലഭിക്കുന്നു.",
      "options": {
        "kutcha": {
          "label": "കുച്ഛ",
          "description": "മണ്ണ്, വേപ്പ, അല്ലെങ്കിൽ മറ്റ് താൽക്കാലിക വസ്തുക്കൾ"
        },
        "pucca": {
          "label": "പുക്ക",
          "description": "ഇഷ്ടിക, സിമന്റ്, അല്ലെങ്കിൽ കോൺക്രീറ്റ്"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "has_lpg_connection": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിന് ഇതിനകം എൽപിജി ഗ്യാസ് കണക്ഷൻ ഉണ്ടോ?",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "owns_motorized_vehicle": {
      "label": "കുടുംബത്തിലെ ആരെങ്കിലും ഒരു മോട്ടോറൈസ്ഡ് വാഹനം - ഒരു കാർ, ട്രാക്ടർ അല്ലെങ്കിൽ ടു-വീലർ - ഉടമയാണോ?",
      "help": "ചില പദ്ധതികൾ ഈ കാര്യം ഉപയോഗിച്ച് കൂടുതൽ സ 경제적മായ കുടുംബങ്ങളെ 식별 ചെയ്യുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "has_bank_account": {
      "label": "നിങ്ങൾക്ക് ഒരു ബാങ്ക് അക്കൗണ്ട് ഉണ്ടോ?",
      "help": "ഇൻഷുറൻസ്, പെൻഷൻ പദ്ധതികൾ ഒരു ബാങ്ക് അക്കൗണ്ട് വഴി പണം നൽകുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "family_member_in_govt_service": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിലെ ആരെങ്കിലും സർക്കാർ ഉദ്യോഗസ്ഥനായി സേവനമനുഷ്ഠിക്കുന്നു അല്ലെങ്കിൽ വിരമിച്ചു?",
      "help": "ചില പദ്ധതികൾ സർക്കാർ ഉദ്യോഗസ്ഥരുടെ കുടുംബങ്ങളെ ഒഴിവാക്കുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "receives_govt_pension_over_10k": {
      "label": "കുടുംബത്തിലെ ആരെങ്കിലും പ്രതിമാസം ₹10,000 അല്ലെങ്കിൽ അതിൽ കൂടുതൽ സർക്കാർ പെൻഷൻ സ്വീകരിക്കുന്നുണ്ടോ?",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "daughter_age": {
      "label": "നിങ്ങൾക്ക് 10 വയസ്സിന് താഴെയുള്ള ഒരു മകളുണ്ടെങ്കിൽ, അവൾക്ക് എത്ര വയസ്സുണ്ട്?",
      "help": "സുകന്യ സമൃദ്ധി സേവിംഗ്സ് അക്കൗണ്ട് അവൾക്ക് 10 വയസ്സ് ആകുന്നതുവരെ തുറക്കാവുന്നതാണ്. ഇത് നിങ്ങൾക്ക് ബാധകമല്ലെങ്കിൽ ഈ ചോദ്യം ഒഴിവാക്കുക.",
      "placeholder": "പ്രായം (വയസ്സിൽ)"
    },
    "is_pregnant": {
      "label": "നിങ്ങൾ നിലവിൽ ഗർഭിണിയാണോ?",
      "help": "യോഗ്യത പരിശോധിക്കുന്നതിന് മാതൃത്വ ആനുകൂല്യ പദ്ധതികൾക്ക് ഇത് ആവശ്യമാണ്.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "single_girl_child": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിൽ ഒരേയൊരു പെൺകുട്ടിയാണോ നിങ്ങൾ (ഉള്ളത് സഹോദരൻ ഇല്ല)?",
      "whyWeAsk": "ചില സ്കോളർഷിപ്പുകൾ ഒരു കുടുംബത്തിലെ ഒരേയൊരു പെൺകുട്ടിയെ സംബന്ധിച്ചാണ്. ഞങ്ങൾ ഇത് ആ പദ്ധതികൾ പരിശോധിക്കാൻ മാത്രം ഉപയോഗിക്കുന്നു, ഒന്നും സംഭരിച്ചിട്ടില്ല.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "disability_percent": {
      "label": "നിങ്ങൾ ഒരു വൈകല്യത്തോടെ താമസിക്കുന്നുണ്ടെങ്കിൽ, നിങ്ങളുടെ സർട്ടിഫിക്കറ്റിൽ എന്ത് ശതമാനമാണ്?",
      "whyWeAsk": "ഇന്ദിരാഗാന്ധി വൈകല്യ പെൻഷനുവേണ്ടത് 80% അല്ലെങ്കിൽ അതിൽ കൂടുതലാണ്. ഞങ്ങൾ ഈ നിയമം പരിശോധിക്കാൻ മാത്രം എണ്ണം ചോദിക്കുന്നു, അത് ഒരിക്കലും സൂക്ഷിക്കില്ല.",
      "placeholder": "ഉദാ. 80"
    },
    "disability_type": {
      "label": "വൈകല്യ സർട്ടിഫിക്കറ്റിൽ ഏത് വിഭാഗമാണ്?",
      "whyWeAsk": "ചില വികലാംഗ പദ്ധതികൾ ദേശീയ ട്രസ്റ്റ് ആക്ടിൽ പേരിട്ടിരിക്കുന്ന പ്രത്യേക വിഭാഗങ്ങൾക്ക് മാത്രമേ ബാധകമാകൂ. നിങ്ങൾക്ക് ഉറപ്പില്ലെങ്കിൽ ഇത് ശൂന്യമായി വിടുക.",
      "options": {
        "": {
          "label": " പറയരുത് / ഉറപ്പില്ല"
        },
        "autism": {
          "label": "ഓട്ടിസം"
        },
        "cerebral_palsy": {
          "label": "സെറിബ്രൽ പാൾസി"
        },
        "intellectual_disability": {
          "label": "ബുദ്ധിപരമായ വികലാംഗത"
        },
        "multiple_disabilities": {
          "label": "ഒന്നിലധികം വികലാംഗതകൾ"
        },
        "other": {
          "label": "മറ്റൊരു വികലാംഗത"
        }
      }
    },
    "bereavement_event": {
      "label": "നിങ്ങളുടെ കുടുംബത്തിലെ പ്രധാന വരുമാനക്കാരൻ മരിച്ചുപോയിട്ടുണ്ടോ?",
      "whyWeAsk": "ദേശീയ കുടുംബ ആനുകൂല്യ പദ്ധതി മരിച്ചുപോയ ഒരു പാവപ്പെട്ട കുടുംബത്തിന്റെ പ്രധാന വരുമാനദാതാവിന് ഒരു പേയ്‌മെന്റ് നൽകുന്നു. ഈ പദ്ധതി പരിശോധിക്കാൻ ഞങ്ങൾ മാത്രം ചോദിക്കുന്നു.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    },
    "is_pmjay_priority_category": {
      "label": "നിങ്ങളുടെ കുടുംബം ഒരു പിന്നോക്കം അല്ലെങ്കിൽ മുൻഗണനാ വിഭാഗത്തിൽ ഉണ്ടോ - ഉദാഹരണത്തിന് ഭൂരഹിത തൊഴിലാളികൾ, അല്ലെങ്കിൽ SECC സർവേയിൽ പട്ടികപ്പെടുത്തിയിട്ടുണ്ടോ?",
      "help": "ആയുഷ്മാൻ ഭാരത് ആരോഗ്യ കവറേജ് ഈ വിഭാഗങ്ങൾ ഉപയോഗിക്കുന്നു. “എനിക്ക് ഉറപ്പില്ല” എന്നത് ശരിയാണ് - പല കുടുംബങ്ങളും അറിഞ്ഞുകൂടാതെ പട്ടികപ്പെടുത്തിയിട്ടുണ്ട്.",
      "options": {
        "yes": {
          "label": "അതെ"
        },
        "no": {
          "label": "ഇല്ല"
        },
        "unsure": {
          "label": "എനിക്ക് ഉറപ്പില്ല"
        }
      }
    }
  }
};
