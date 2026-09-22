/**
 * A small default country list. Flags are derived from the ISO code rather
 * than shipped as images: offsetting each letter into the Unicode regional
 * indicator block produces the emoji flag, so there are no assets to host and
 * nothing to keep in sync.
 */
export function flagOf(iso2) {
  return String.fromCodePoint(
    ...iso2.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

export const COUNTRIES = [
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" }
];
