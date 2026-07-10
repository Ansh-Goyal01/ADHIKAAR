/** Mirrors backend/app/agent/state.py + app/api/schemas.py */

export type Verdict = "eligible" | "likely_eligible" | "not_eligible" | "need_more_info";

export interface VerifiedCitation {
  chunk_id: string;
  quote: string;
  section: string;
  source_url: string;
}

export interface VerifiedReason {
  text: string;
  citations: VerifiedCitation[];
}

export interface SchemeResult {
  scheme_id: string;
  scheme_name: string;
  short_name: string;
  verdict: Verdict;
  summary: string;
  reasons: VerifiedReason[];
  missing_info: string[];
  documents: string;
  how_to_apply: string;
  page_url: string;
  references: { title: string; url: string }[];
  dropped_claims: number;
}

export interface UserProfile {
  age?: number | null;
  gender?: string | null;
  marital_status?: string | null;
  state?: string | null;
  area?: string | null;
  occupation?: string | null;
  is_farmer_with_land?: boolean | null;
  annual_family_income_inr?: number | null;
  social_category?: string | null;
  has_bpl_card?: boolean | null;
  disability_percent?: number | null;
  has_bank_account?: boolean | null;
  pays_income_tax?: boolean | null;
  is_student?: boolean | null;
  daughter_age?: number | null;
  notes?: string;
}

export interface AssessResponse {
  status: "ok" | "need_info";
  question: string | null;
  profile: UserProfile;
  results: SchemeResult[];
}
