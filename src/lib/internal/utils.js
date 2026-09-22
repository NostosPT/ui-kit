/** Join conditional class names. Falsy entries drop out. */
export function cx(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(" ");
}

let seq = 0;
/** Stable-enough unique id for label/aria wiring. */
export function uid(prefix = "ui") {
  seq += 1;
  return `${prefix}-${seq.toString(36)}`;
}

/** Clamp n into [min, max]. */
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/** Initials for an avatar fallback: "Kristin Watson" -> "KW". */
export function initials(name = "", max = 2) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * Deterministically pick one of N buckets from a string. Used to give
 * avatars a stable colour without storing one per user.
 */
export function hashIndex(str = "", buckets = 1) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % buckets;
}
