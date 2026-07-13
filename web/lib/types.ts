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
  confirm_before_applying?: string[];
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
  family_member_in_govt_service?: boolean | null;
  receives_govt_pension_over_10k?: boolean | null;
  holds_constitutional_or_political_post?: boolean | null;
  is_practicing_registered_professional?: boolean | null;
  cultivates_crops?: boolean | null;
  has_land_ownership_or_tenure_docs?: boolean | null;
  house_type?: "kutcha" | "pucca" | null;
  owns_motorized_vehicle?: boolean | null;
  is_pmjay_priority_category?: boolean | null;
  has_lpg_connection?: boolean | null;
  is_street_vendor?: boolean | null;
  has_vending_certificate_or_lor?: boolean | null;
  is_vishwakarma_trade_artisan?: boolean | null;
  is_post_matric_student?: boolean | null;
  notes?: string;
}

export interface AssessResponse {
  status: "ok" | "need_info";
  question: string | null;
  profile: UserProfile;
  results: SchemeResult[];
}
