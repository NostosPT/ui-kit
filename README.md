# Nostos UI

A Svelte 5 component kit for dense product interfaces — tables, forms, side
panels, checkout flows — built around a single constraint:

> **No component may reference a colour.**

Components speak only in semantic tokens. Those map to ramps, and the ramps are
generated in OKLCH from a hue and a chroma. Re-skinning the whole kit is a few
numbers, not a fork.

```css
.ui-root {
  --ui-accent-h: 150;      /* every accent surface is now green */
  --ui-accent-c: 0.15;
  --ui-radius-scale: 1.6;  /* …and every corner is softer */
}
```

## Install

```bash
npm install @nostos/ui
```

```js
import "@nostos/ui/styles.css";
```

```svelte
<script>
  import { Button, Input, Field } from "@nostos/ui";
</script>

<div class="ui-root">
  <Field label="Work email">
    {#snippet control({ id, describedBy })}
      <Input {id} aria-describedby={describedBy} placeholder="info@pixsellz.io" />
    {/snippet}
  </Field>
  <Button icon="send">Send invite</Button>
</div>
```

`class="ui-root"` scopes the base styles and opens a theme scope. Add
`data-ui-theme="dark"` to it — or to any ancestor, including `<html>` — to flip
the scheme.

## Develop

```bash
npm run dev     # Storybook on :6006
npm run build   # static Storybook
npm run check   # svelte-check
```

## Architecture

| Layer | File | Contents |
| --- | --- | --- |
| Palette inputs | `src/lib/styles/tokens.css` | Hue + chroma per ramp |
| Ramps | `src/lib/styles/tokens.css` | 50–950 steps, generated |
| Scales | `src/lib/styles/scale.css` | Spacing, type, radius, elevation, motion, control scale |
| Semantic | `src/lib/styles/semantic.css` | `bg-surface`, `fg-muted`, `accent-solid`… |
| Base | `src/lib/styles/base.css` | Small reset, scoped to `.ui-root` |
| Components | `src/lib/components/**` | Consume semantic tokens only |

The semantic layer is what does the work: because a component asks for
`--ui-border-default` rather than `--ui-neutral-200`, the dark theme is a pure
remap and a consumer can restyle one surface without auditing every component.

### Theme scopes

Ramps and semantic tokens are re-declared on `:root`, `.ui-root`,
`[data-ui-theme]` and `[data-ui-scope]`. This is deliberate and load-bearing: a
custom property containing `var()` resolves those references **where it is
declared**, not where it is used. If the ramps lived only on `:root` they would
permanently bake in `:root`'s hue, and overriding `--ui-accent-h` further down
the tree would silently do nothing. Re-declaring them per scope is what lets a
subtree carry its own accent.

### One control scale, four numbers per step

A size name has to mean the same thing to every control, or a form ends up with
a 36px button next to a 42px field. So height, inline padding, icon-to-label
gap and corner radius are published per step and consumed by name:

| Step | Height | Padding | Gap | Radius | Icon | Label |
| --- | --- | --- | --- | --- | --- | --- |
| `xs` | 28px | 10px | 6px | 12px | 14px | 12px |
| `sm` | 34px | 12px | 8px | 14px | 16px | 13px |
| `md` | 40px | 16px | 10px | 14px | 18px | 14px |
| `lg` | 48px | 20px | 12px | 14px | 20px | 15px |

Button, InputFrame, Tabs, SegmentedControl, Pagination, PinInput and the
Calendar's month stepper all resolve these rather than picking spacing steps of
their own, so none of them can drift alone.

Radius is the number that is easiest to get wrong, and it is not a ratio.
Measuring the reference's buttons at four heights returns a near-constant
corner — 12px at h30, 14px at h37, h40 and h46 — so a proportional corner makes
small controls look square and large ones look like pills. The full derivation,
and the method that produced it, is in [DESIGN.md](DESIGN.md).

A SegmentedControl is the one control that resolves a step *down*: the track is
the control, so an `md` track holds `sm`-height segments plus its own 3px of
padding and lands back on 40px.

### Contrast is a property of the scale, not of each colour

Solid fills all land on the `600` step, which sits at **53% lightness**. That
number is measured, not chosen by eye. Sampling the hue wheel shows a dead band
roughly between 56% and 67% lightness where a fill clears 4.5:1 against
*neither* white nor dark text — cyan at 60% tops out near 3.5:1 either way. So
the solid step has to sit below the band.

With the step where it is, every tone at every accent hue, in both themes,
measures at least **4.65:1** against its derived label colour. Contrast stops
being something to re-check per palette.

### Derived foregrounds

Solid fills compute their own label colour with relative colour syntax, so a
light accent (amber, lime) flips to dark text automatically rather than shipping
white-on-yellow. The mechanism is documented at the bottom of `tokens.css`.

## Components

**Primitives** — Icon, Button, ButtonGroup, Badge, Avatar, AvatarGroup, Tag,
Kbd, Spinner, Divider, Skeleton, Trend, Price

**Surfaces** — Card (+ Header/Body/Footer), Toolbar, Popover, Modal, Tooltip

**Forms** — Field, InputFrame, Input, Textarea, Select, Listbox, Checkbox,
Radio, Switch, SegmentedControl, NumberInput, TagInput, PhoneInput,
CurrencyInput, Dropzone, Calendar, DatePicker, PinInput, OptionCard

**Data display** — List, ListItem, Thumbnail, Table (+ Row/Cell/HeaderCell),
Pagination, Progress, EmptyState, DataList (+ Row), Stat, Sparkline

**Navigation** — Tabs, TabPanel, Menu (+ Item/Separator/Label), Breadcrumb,
Accordion

**Feedback** — Alert, Toaster + `toast()`

## Browser support

`oklch()` and relative colour syntax (`oklch(from … l c h)`): Chrome 119+,
Safari 16.4+, Firefox 128+. An `@supports` fallback disables the derived
foreground, in which case you set `--ui-fg-on-solid` yourself.

## Design language

[DESIGN.md](DESIGN.md) is the companion to this file: how the numbers were
measured off the reference designs, what the colour, weight and motion rules
are, and the conventions and checklist for building a new component in the same
language. Read it before adding a component.

## Licence

MIT
