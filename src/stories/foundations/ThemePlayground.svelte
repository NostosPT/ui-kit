<script>
  import Button from "../../lib/components/Button/Button.svelte";
  import Badge from "../../lib/components/Badge/Badge.svelte";
  import Input from "../../lib/components/Input/Input.svelte";
  import Checkbox from "../../lib/components/Toggle/Checkbox.svelte";
  import Switch from "../../lib/components/Toggle/Switch.svelte";
  import SegmentedControl from "../../lib/components/Segmented/SegmentedControl.svelte";
  import Avatar from "../../lib/components/Avatar/Avatar.svelte";
  import Card from "../../lib/components/Card/Card.svelte";
  import CardHeader from "../../lib/components/Card/CardHeader.svelte";
  import CardBody from "../../lib/components/Card/CardBody.svelte";
  import CardFooter from "../../lib/components/Card/CardFooter.svelte";
  import Progress from "../../lib/components/Progress/Progress.svelte";
  import Alert from "../../lib/components/Alert/Alert.svelte";

  /**
   * Live proof that nothing in the kit is tied to a colour: every control
   * below is an ordinary component, and the only thing changing is five custom
   * properties on the wrapper.
   */
  let accentH = $state(262);
  let accentC = $state(0.19);
  let neutralH = $state(258);
  let neutralC = $state(0.012);
  let radius = $state(1);
  let scheme = $state("light");
  let seg = $state("15M");

  const vars = $derived(
    [
      `--ui-accent-h: ${accentH}`,
      `--ui-accent-c: ${accentC}`,
      `--ui-neutral-h: ${neutralH}`,
      `--ui-neutral-c: ${neutralC}`,
      `--ui-radius-scale: ${radius}`
    ].join("; ")
  );

  const PRESETS = [
    { name: "Indigo", h: 262, c: 0.19, nh: 258, nc: 0.012 },
    { name: "Forest", h: 150, c: 0.14, nh: 150, nc: 0.01 },
    { name: "Amber", h: 80, c: 0.16, nh: 80, nc: 0.014 },
    { name: "Crimson", h: 18, c: 0.19, nh: 20, nc: 0.012 },
    { name: "Ocean", h: 215, c: 0.14, nh: 220, nc: 0.014 },
    { name: "Mono", h: 262, c: 0.02, nh: 0, nc: 0 }
  ];

  function apply(p) {
    accentH = p.h;
    accentC = p.c;
    neutralH = p.nh;
    neutralC = p.nc;
  }
</script>

<div class="tp">
  <div class="tp__controls">
    <div class="tp__presets">
      {#each PRESETS as p (p.name)}
        <button
          type="button"
          class="tp__preset"
          style:--swatch="oklch(57% {p.c} {p.h})"
          onclick={() => apply(p)}
        >
          <span class="tp__dot"></span>{p.name}
        </button>
      {/each}
    </div>

    <label class="tp__row">
      <span>Accent hue</span>
      <input type="range" min="0" max="360" bind:value={accentH} />
      <output>{accentH}</output>
    </label>
    <label class="tp__row">
      <span>Accent chroma</span>
      <input type="range" min="0" max="0.3" step="0.005" bind:value={accentC} />
      <output>{accentC}</output>
    </label>
    <label class="tp__row">
      <span>Neutral hue</span>
      <input type="range" min="0" max="360" bind:value={neutralH} />
      <output>{neutralH}</output>
    </label>
    <label class="tp__row">
      <span>Neutral chroma</span>
      <input type="range" min="0" max="0.05" step="0.002" bind:value={neutralC} />
      <output>{neutralC}</output>
    </label>
    <label class="tp__row">
      <span>Radius scale</span>
      <input type="range" min="0" max="2" step="0.1" bind:value={radius} />
      <output>{radius}</output>
    </label>
    <label class="tp__row tp__row--check">
      <input type="checkbox" checked={scheme === "dark"} onchange={(e) => (scheme = e.currentTarget.checked ? "dark" : "light")} />
      <span>Dark scheme</span>
    </label>

    <pre class="tp__code">:root {"{"}
  --ui-accent-h: {accentH};
  --ui-accent-c: {accentC};
  --ui-neutral-h: {neutralH};
  --ui-neutral-c: {neutralC};
  --ui-radius-scale: {radius};
{"}"}</pre>
  </div>

  <div class="ui-root tp__preview" data-ui-theme={scheme} style={vars}>
    <Card>
      <CardHeader title="Subscribe to Custom Domain" description="Billed yearly · renews automatically">
        {#snippet actions()}<Badge tone="success" icon="check-circle">Active</Badge>{/snippet}
      </CardHeader>
      <CardBody>
        <div class="tp__stack">
          <SegmentedControl items={["15M", "30M", "1H", "4H", "1D"]} bind:value={seg} ariaLabel="Timeframe" />
          <Input placeholder="info@pixsellz.io" icon="mail" />
          <Progress value={64} label="Storage used" showValue />
          <div class="tp__inline">
            <Checkbox label="Email me a receipt" checked />
            <Switch label="Auto-renew" checked />
          </div>
          <Alert tone="success" title="Your order has been successfully placed">
            It will be delivered within 2–3 days.
          </Alert>
          <div class="tp__inline">
            <Avatar name="Kristin Watson" presence="online" />
            <Avatar name="Ronald Richards" />
            <Avatar name="Annette Black" shape="square" />
            <Badge tone="accent" variant="dot">Monthly</Badge>
            <Badge tone="danger" icon="x-circle">Cancelled</Badge>
          </div>
        </div>
      </CardBody>
      <CardFooter muted>
        <Button variant="ghost" tone="neutral">Cancel</Button>
        <Button icon="link">Copy app link</Button>
      </CardFooter>
    </Card>
  </div>
</div>

<style>
  .tp {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 28px;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 760px) {
    .tp { grid-template-columns: 1fr; }
  }

  .tp__controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: var(--ui-font-sans);
    font-size: 12px;
  }
  .tp__presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4px;
  }
  .tp__preset {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 9px 4px 6px;
    border: 1px solid var(--ui-border-default);
    border-radius: 99px;
    background: var(--ui-bg-surface);
    font-size: 11px;
    cursor: pointer;
  }
  .tp__preset:hover { background: var(--ui-bg-hover); }
  .tp__dot {
    width: 10px;
    height: 10px;
    border-radius: 99px;
    background: var(--swatch);
  }

  .tp__row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2px 8px;
    align-items: center;
  }
  .tp__row span { color: var(--ui-fg-muted); }
  .tp__row input[type="range"] { grid-column: 1 / -1; width: 100%; accent-color: var(--ui-accent-solid); }
  .tp__row output {
    font-variant-numeric: tabular-nums;
    color: var(--ui-fg-faint);
    font-size: 11px;
  }
  .tp__row--check {
    grid-template-columns: auto 1fr;
    gap: 8px;
    margin-top: 4px;
  }
  .tp__row--check input { accent-color: var(--ui-accent-solid); }

  .tp__code {
    margin: 4px 0 0;
    padding: 10px 12px;
    background: var(--ui-bg-sunken);
    border: 1px solid var(--ui-border-subtle);
    border-radius: 8px;
    font-family: var(--ui-font-mono);
    font-size: 11px;
    line-height: 1.6;
    color: var(--ui-fg-muted);
    overflow-x: auto;
  }

  .tp__preview {
    padding: 22px;
    border-radius: 14px;
    background: var(--ui-bg-canvas);
    border: 1px solid var(--ui-border-default);
  }
  .tp__stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .tp__inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
</style>
