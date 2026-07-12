import type { UserProfile } from "@/lib/types";

function describe(profile: UserProfile): string[] {
  const chips: string[] = [];
  if (profile.age != null) chips.push(`${profile.age} years old`);
  if (profile.gender) chips.push(profile.gender);
  if (profile.marital_status) chips.push(profile.marital_status);
  if (profile.occupation) chips.push(profile.occupation);
  if (profile.state) chips.push(profile.state);
  if (profile.area) chips.push(`${profile.area} area`);
  if (profile.annual_family_income_inr != null)
    chips.push(`₹${profile.annual_family_income_inr.toLocaleString("en-IN")}/year family income`);
  if (profile.social_category && profile.social_category !== "general")
    chips.push(profile.social_category.toUpperCase());
  if (profile.has_bpl_card) chips.push("BPL card");
  if (profile.is_farmer_with_land) chips.push("owns farmland");
  if (profile.cultivates_crops) chips.push("cultivates crops");
  if (profile.disability_percent != null) chips.push(`${profile.disability_percent}% disability`);
  if (profile.has_bank_account) chips.push("has bank account");
  if (profile.pays_income_tax === false) chips.push("no income tax");
  if (profile.pays_income_tax) chips.push("pays income tax");
  if (profile.family_member_in_govt_service) chips.push("govt job in family");
  if (profile.house_type) chips.push(`${profile.house_type} house`);
  if (profile.owns_motorized_vehicle) chips.push("owns vehicle");
  if (profile.has_lpg_connection === false) chips.push("no LPG connection");
  if (profile.is_street_vendor) chips.push("street vendor");
  if (profile.has_vending_certificate_or_lor) chips.push("vending certificate");
  if (profile.is_vishwakarma_trade_artisan) chips.push("traditional artisan");
  if (profile.is_post_matric_student) chips.push("post-matric student");
  if (profile.is_student) chips.push("student");
  if (profile.daughter_age != null) chips.push(`daughter, ${profile.daughter_age}`);
  return chips;
}

/** The structured facts this report is based on. */
export function ProfileChips({ profile }: { profile: UserProfile }) {
  const chips = describe(profile);
  if (chips.length === 0) return null;
  return (
    <div aria-label="The facts this report is based on">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Based on what you told us
      </span>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
