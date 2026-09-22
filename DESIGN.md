# Nostos UI — design and construction

Two halves, and they are different kinds of document.

**Part I** is the design language: the numbers, and where they came from. It is
descriptive. Nothing in it was chosen by eye — every figure was measured off
the reference designs, and the method is written down beside the result so a
later reader can disagree with the measurement rather than with the taste.

**Part II** is how a component gets built in that language. It is prescriptive.
It is the thing to read before opening a new `.svelte` file, and the checklist
at the end is the thing to run before opening a pull request.

---

# Part I — The design language

## 1. How these numbers were arrived at

Design references are pictures, and a picture will not tell you its font size.
Three techniques did the work here, and they are worth knowing because they are
how you should settle the next argument too.

**Ratios, not absolutes.** A screenshot has an unknown scale factor. A *ratio*
inside one screenshot does not. Every rule below is stated as a ratio of the
control height where it can be, because that survives not knowing whether the
source was exported at 1×, 1.2× or 2×.

**Corner radius by area, not by profile.** Walking down from the top edge
looking for where the corner "ends" gives a different answer every time,
because antialiasing smears the last three pixels. Integrating instead is
exact: a rounded corner removes `r²(1 − π/4)` from its bounding box, so sum the
background coverage in a corner box and solve for `r`. Sampling the reference's
buttons this way returned 16.7px twice in a row on two different buttons — the
kind of agreement a profile walk never produces.

**Weight from stem-to-cap ratio.** You cannot read a font weight off a picture,
but you can measure the stem width of a lowercase `n` and divide it by the cap
height. For a grotesque that ratio is stable per cut: **0.103** Regular, **0.118**
Medium, **0.135** SemiBold, **0.154** Bold. The reference's button labels
measured 0.154. That is not an opinion about whether the buttons look bold.

## 2. The control scale

A size name has to mean the same thing to every control. Height, inline
padding, icon-to-label gap, icon size and corner radius are published per step
in `scale.css` and consumed by name — never re-derived per component.

| Step | Height | Padding | Gap | Radius | Icon | Label |
| --- | --- | --- | --- | --- | --- | --- |
| `xs` | 28px | 10px | 6px | 12px | 14px | 12px |
| `sm` | 34px | 12px | 8px | 14px | 16px | 13px |
| `md` | 40px | 16px | 10px | 14px | 18px | 14px |
| `lg` | 48px | 20px | 12px | 14px | 20px | 15px |

Measured ratios against control height, for reference when adding a step:

| Quantity | Ratio of height |
| --- | --- |
| Inline padding | **0.40** |
| Icon-to-label gap | **0.23** |
| Label size | **0.36** |
| Corner radius | *not a ratio — see below* |

### Corner radius is a constant, not a ratio

This is the single number the kit had most wrong, and it is worth stating
plainly because it is counter-intuitive. Measuring four buttons at four heights
across three source images:

```
h30 → r12      h37 → r14      h40 → r14      h46 → r14
```

The corner does **not** scale with the control. A proportional corner makes
small controls look square and large ones look like pills, and the reference is
neither. So `--ui-control-radius-*` is 14px at `sm`/`md`/`lg`, stepping down to
12px only at `xs`, where 14 on a 28px box starts to read as a pill.

### The segmented control is the one exception

Its **track** is the control, not its segments. An `md` track holds `sm`-height
segments (34px) plus 3px of padding either side and lands back on exactly 40px,
flush with the `md` Button beside it. Any component with an inner pressable
surface should resolve one step down and make up the difference in padding.

## 3. Weight is a role, not a number

The reference speaks a heavy UI language. Anything that is an **action**, a
**label**, a **heading** or a **number** sits well above body weight; only
running prose stays at 400. Four role tokens carry that, so a Tab cannot drift
away from a Button:

| Token | Value | Used by |
| --- | --- | --- |
| `--ui-control-weight` | 700 | Button, Tabs, SegmentedControl, Pagination |
| `--ui-label-weight` | 600 | field labels, column headers, row keys, menu items |
| `--ui-heading-weight` | 700 | card, modal and section titles |
| `--ui-numeric-weight` | 700 | prices, metrics, totals |

Never hard-code a numeric `font-weight` in a component. Reach for a role token
first. The raw ladder (`--ui-weight-normal` … `--ui-weight-bold`) stays
available for the deliberate exceptions, and at the time of writing there are
exactly five in the kit: four pieces of text that must stay at 400 — a price's
unit, a field's "optional" marker, a dot badge's text, a muted summary value —
and one sub-row that must sit a step below the row above it.

## 4. Colour has rules, and they are not "use the accent"

The accent is the loudest thing on the page, so the language spends it
carefully. Three rules, all visible in the reference and all easy to break:

**The accent is a fill or a link, never an outline label.** Every secondary
action in the reference — Copy link, Login, Documents, Export, Cancel, Forward
— carries a near-black label on a white surface with a neutral border. Blue
text on white means *link*. A blue-on-white outline button is the single change
that makes a row of buttons stop looking like the reference, which is why
`Button` excludes `accent` from its toned-outline rule while keeping it for
`success` / `warning` / `danger`, where the tone is genuinely semantic.

**Icons sit one step below their label.** In the reference a leading icon reads
around `--ui-fg-muted` while its label is effectively black. Matching them
makes a toolbar look heavier and flatter than the source. Solid, soft and link
buttons opt out — there the icon and label are the same ink — as do icon-only
buttons, which have no label to contrast against.

**A coloured fill casts a coloured shadow.** A blue button dropping a grey
shadow is the tell that separates a kit from a designed product. Solid buttons
derive their elevation from their own fill with relative colour syntax, so it
stays right at every accent hue.

Beyond that, the rule inherited from `README.md` still governs everything: **no
component may reference a colour.** Components speak in semantic tokens
(`--ui-bg-surface`, `--ui-fg-muted`, `--ui-accent-solid`); the semantic layer
maps those onto ramps; the ramps are generated in OKLCH from a hue and a
chroma. That is what makes a re-skin four numbers rather than a fork.

## 5. Surfaces

| Surface | Radius | Elevation |
| --- | --- | --- |
| Page-level panel, card, table, list, toast, popover | `--ui-radius-2xl` (16px) | `sm` bordered, `lg`+ floating |
| Modal | `--ui-radius-2xl` | `xl` |
| Nested panel inside a card | `--ui-radius-xl` (12px) | `xs` or none |
| Controls | `--ui-control-radius-*` | `xs` |

Card gutters are 24px at `md`. The earlier 12/16 made a card look like a table
row with rounded corners: content that close to a 16px corner reads as
crowding it.

## 6. Type

`--ui-text-md` (14px) carries body text and control labels; 15px the large
controls; 13px metadata; 12px badges. Sizes above 18px carry
`--ui-tracking-tight` so headings optically match the tight body text around
them.

Numbers that a user will compare down a column — prices, quantities, code
digits, table figures — set `font-variant-numeric: tabular-nums`. Numbers in
prose do not.

### A note on the typeface

The reference is not set in Inter. Stem-to-cap and the shape of the `g` put it
in the geometric-grotesque family (Aeonik and its relatives). The kit ships
Inter and **the Nostos brand specifies Raleway for UI and Lora for headings**
(`docs/brand/TYPOGRAPHY.md`), which is a third answer again. That gap is a
brand decision, not a proportions one — it is deliberately not resolved here,
and `--ui-font-sans` is the single place to resolve it when it is.

## 7. Motion

Motion in this language is short and almost entirely about state, not entrance.
`--ui-duration-fast` (130ms) for hover and focus, `--ui-duration-normal`
(200ms) for anything that travels — a segmented indicator, a popover. Ease with
`--ui-ease-out`; `--ui-ease-spring` is for a deliberate overshoot and almost
never right. Everything collapses to 0ms under `prefers-reduced-motion`, which
is handled centrally in `scale.css` — a component should never write its own
media query for it.

## 8. Focus

One focus treatment for the whole kit: the border goes to `--ui-accent-solid`
and a 3px `--ui-accent-ring` sits outside it. Use `:focus-visible`, never
`:focus`, so a mouse click does not leave a ring behind. Where the focusable
element and the element that *looks* like the control differ — a Listbox's
button versus its frame — put the ring on the one that looks like the control.

---

# Part II — Building a component

## 9. Where it goes

One directory per component under `src/lib/components/<Feature>/`, named for
the feature rather than the file. Sub-parts live beside their parent:
`Card/CardHeader.svelte`, `DataList/DataListRow.svelte`. Stories live next to
the component they document, and may cover a group — `PinInput/Choice.stories.svelte`
documents PinInput and OptionCard together, because that is how a reader meets
them.

Every component is exported from `src/lib/index.js`, in the section that
matches how a person would look for it.

## 10. The prop API

**Two independent axes, not a flat list of variants.** `variant` is how much
surface the thing occupies; `tone` is what it means. Every combination is
valid. Resolve the tone to a handful of local custom properties first, then let
each variant pick from them — adding a tone is then six lines and zero new
variant code.

```svelte
.ui-btn[data-tone="danger"] { --btn-solid: var(--ui-danger-solid); /* … */ }
.ui-btn[data-variant="solid"] { background: var(--btn-solid); }
```

**State goes on `data-*`, not in class strings.** `data-variant`, `data-size`,
`data-tone`, `data-open`, `data-selected`, `data-invalid`. Booleans are written
`data-open={open || undefined}` so a false value removes the attribute
entirely and `[data-open]` works as a selector.

**Always accept and forward.** Every component takes `class: klass = ""` and
spreads `...rest` onto its root. A consumer who cannot add an `id`, an
`aria-describedby` or a `data-testid` will fork you.

**Snippets, not slots, and not markup-in-props.** Anywhere a caller might pass
more than a string, take a snippet: `action`, `media`, `trigger`, `titleSlot`.
A `title` string prop with a `titleIcon` companion is the beginning of a long
and unhappy road.

**Two-way state uses `$bindable`.** `value = $bindable("")`, `group =
$bindable(undefined)`. Fire the matching callback too (`onchange`), because
half your consumers will want the event and not the binding.

**Composition over configuration.** `Stat` does not format currency — it hands
the figure to `Price`. `Input` does not draw a border — it renders into
`InputFrame`. When two components would need the same visual decision, extract
the thing that owns it. This is the single most load-bearing rule in the kit:
because `InputFrame` exists, Input, Select, Listbox, TagInput, PhoneInput,
CurrencyInput and NumberInput cannot disagree about height, radius, focus ring
or invalid styling, even by accident.

## 11. Tokens only

A component may not contain:

- a colour literal, in any notation
- a control height, padding, gap or radius that is not `var(--ui-control-*)`
- a `font-weight` number, rather than a role token
- a duration or easing curve that is not `var(--ui-duration-*)` / `var(--ui-ease-*)`

Pixel literals are allowed for things that are genuinely intrinsic to the
component and belong to no scale — a 7px status dot, a 1.5px checkbox stroke, a
100×32 sparkline user space. If you find yourself writing the same literal in
two components, it was a token.

## 12. Accessibility is part of the component, not a later pass

- **Use the real element.** A `<dl>` for key/value rows, so a screen reader
  announces "Subtotal, $2.99" as a pair. Real `<input>`s in a PinInput, so
  password managers and iOS one-time-code autofill have something to target.
  A `<label>` wrapping an OptionCard, so the card is the hit target.
- **Hide visually, never functionally.** A control you are replacing with your
  own chrome is `position: absolute; clip-path: inset(50%)`, never
  `display: none` — the latter drops it from the tab order and from the form.
- **Name everything that has no text.** `iconOnly` buttons require `label`.
- **Respect the platform's keyboard contract.** A radiogroup is one tab stop
  with arrow keys inside it. A menu closes on Escape and returns focus to its
  trigger. If you are building something the platform already has, inherit its
  keyboard behaviour rather than inventing one.
- **Never remove an outline without replacing it.** `outline: none` is only
  acceptable on the same line as a `box-shadow` ring.

## 13. Comment the decisions, not the code

The house style is that a comment explains *why a thing is the way it is*,
especially when the obvious alternative is wrong. `// set the height` is noise.
This is not:

```js
// The indicator is measured rather than computed from a percentage so that
// options of different widths ("15M" vs "Annually") still get an exact fit.
```

If you found something out the hard way — that a `display: contents` anchor has
no layout box, that a dotted border only runs as far as its text — write it
down where the next person will hit it.

## 14. Checklist

Before opening a pull request:

- [ ] Sizes resolve from `--ui-control-*`, not from spacing steps.
- [ ] `font-weight` is a role token.
- [ ] No colour literal anywhere in the file.
- [ ] `class` and `...rest` are accepted and forwarded to the root.
- [ ] Variants and state are on `data-*`, with `|| undefined` for booleans.
- [ ] Focus is `:focus-visible` and uses the standard border + ring.
- [ ] The underlying element is the semantically correct one.
- [ ] Works at every size the component advertises, and in dark mode.
- [ ] Exported from `src/lib/index.js`.
- [ ] Has a story, with a description saying what decision the component makes.
- [ ] `npm run check` is clean.

## 15. Adding something to the design language

If a component needs a number the scale does not have, the answer is almost
never a literal in that component.

1. Find it in the reference and **measure it**, with the methods in §1.
2. State it as a ratio of something that already exists, if it is one.
3. Add it to `scale.css` with a comment recording the measurement.
4. Only then consume it.

The point of the whole arrangement is that the kit can be re-skinned from a
handful of numbers. Every literal that escapes into a component is one more
place a re-skin quietly fails.
