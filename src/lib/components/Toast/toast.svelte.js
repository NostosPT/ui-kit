/**
 * Toast queue. A module-level rune store rather than context, because toasts
 * are fired from places that have no component ancestry — a fetch wrapper, a
 * keyboard shortcut handler, a service worker message.
 *
 * Mount exactly one <Toaster /> near the root; everything else calls `toast`.
 */
let seq = 0;
const items = $state([]);

export const toasts = {
  get items() {
    return items;
  }
};

function push(toast) {
  const id = ++seq;
  const entry = {
    id,
    tone: "neutral",
    duration: 5000,
    ...toast
  };
  items.push(entry);

  // duration: 0 means "sticky" — used for anything the user must acknowledge.
  if (entry.duration > 0) {
    entry.timer = setTimeout(() => dismiss(id), entry.duration);
  }
  return id;
}

export function dismiss(id) {
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return;
  clearTimeout(items[index].timer);
  items.splice(index, 1);
}

export function dismissAll() {
  for (const t of items) clearTimeout(t.timer);
  items.length = 0;
}

/** `toast("Saved")` or `toast({ title, description, tone, action })`. */
export function toast(input, options = {}) {
  return push(typeof input === "string" ? { title: input, ...options } : input);
}

toast.success = (input, o = {}) => toast(input, { ...o, tone: "success" });
toast.error = (input, o = {}) => toast(input, { ...o, tone: "danger", duration: 8000 });
toast.warning = (input, o = {}) => toast(input, { ...o, tone: "warning" });
toast.info = (input, o = {}) => toast(input, { ...o, tone: "info" });
toast.dismiss = dismiss;
toast.dismissAll = dismissAll;
