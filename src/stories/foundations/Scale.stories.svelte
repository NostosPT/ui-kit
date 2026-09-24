<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Icon from "../../lib/components/Icon/Icon.svelte";
  import { iconNames } from "../../lib/icons.js";
  import Showcase from "../util/Showcase.svelte";

  const { Story } = defineMeta({
    title: "Foundations/Scale",
    component: Icon,
    parameters: { layout: "padded" }
  });

  const TYPE = [
    ["5xl", "48px", "Display"],
    ["4xl", "36px", "Page title"],
    ["3xl", "28px", "Price"],
    ["2xl", "22px", "Section title"],
    ["xl", "18px", "Card title"],
    ["lg", "16px", "Subtitle"],
    ["base", "15px", "Large control"],
    ["md", "14px", "Body / control label"],
    ["sm", "13px", "Meta"],
    ["xs", "12px", "Badge"],
    ["2xs", "11px", "Micro"]
  ];

  const SPACE = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 32];
  const RADIUS = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];
  const SHADOW = ["xs", "sm", "md", "lg", "xl"];
  const CONTROL = [
    ["xs", "28px", "10px", "8px", "14px"],
    ["sm", "34px", "12px", "10px", "16px"],
    ["md", "40px", "16px", "12px", "18px"],
    ["lg", "48px", "20px", "14px", "20px"]
  ];
</script>

<Story
  name="Typography"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "Product-UI sizing: 14px carries body text and control labels, 15px the large controls, 13px metadata, 12px badges. Larger sizes carry negative tracking so headings optically match the tight body text around them."
      }
    }
  }}
>
  <div class="type">
    {#each TYPE as [token, px, use]}
      <div class="type__row">
        <code>--ui-text-{token}</code>
        <span class="type__px">{px}</span>
        <span class="type__sample" style:font-size="var(--ui-text-{token})">
          Subscribe to Custom Domain
        </span>
        <span class="type__use">{use}</span>
      </div>
    {/each}
  </div>
</Story>

<Story
  name="Typefaces"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "The Nostos typography pairing: Lora provides editorial character for headings, titles, and display statements, while Raleway provides clean, functional structure for UI, forms, navigation, and body text."
      }
    }
  }}
>
  <div class="type">
    <div class="type__row">
      <code>--ui-font-heading</code>
      <span class="type__px">Lora</span>
      <span
        class="type__sample"
        style:font-family="var(--ui-font-heading)"
        style:font-size="var(--ui-text-2xl)"
      >
        A photographic archive
      </span>
      <span class="type__use">Headings & display</span>
    </div>
    <div class="type__row">
      <code>--ui-font-sans</code>
      <span class="type__px">Raleway</span>
      <span
        class="type__sample"
        style:font-family="var(--ui-font-sans)"
        style:font-size="var(--ui-text-md)"
      >
        Functional navigation, form inputs, buttons and data tables
      </span>
      <span class="type__use">UI, controls & body</span>
    </div>
    <div class="type__row">
      <code>--ui-font-mono</code>
      <span class="type__px">SF Mono</span>
      <span
        class="type__sample"
        style:font-family="var(--ui-font-mono)"
        style:font-size="var(--ui-text-sm)"
      >
        N° 482 · --token-scale: 1.0;
      </span>
      <span class="type__use">Technical & code</span>
    </div>
  </div>
</Story>

<Story name="Weights" asChild>
  <div class="type">
    {#each [["normal", 400], ["medium", 500], ["semibold", 600], ["bold", 700]] as [name, w]}
      <div class="type__row">
        <code>--ui-weight-{name}</code>
        <span class="type__px">{w}</span>
        <span class="type__sample" style:font-weight={w} style:font-size="var(--ui-text-lg)">
          Your order has been placed
        </span>
        <span class="type__use"></span>
      </div>
    {/each}
  </div>
</Story>

<Story
  name="Controls"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "The layer that keeps a Button, an Input, a Select, a Tab and a segment the same object at the same size. Height, inline padding, icon-to-label gap, corner radius and icon size are published per step and consumed by name, so none of the five can drift on its own. Radius is a constant ~0.29 of the height at every step — the ratio that makes a row of mixed controls read as one family."
      }
    }
  }}
>
  <div class="controls">
    {#each CONTROL as [step, h, px, radius, icon] (step)}
      <div class="controls__row">
        <code>{step}</code>
        <span
          class="controls__box"
          style:height="var(--ui-control-h-{step})"
          style:padding-inline="var(--ui-control-px-{step})"
          style:border-radius="var(--ui-control-radius-{step})"
          style:gap="var(--ui-control-gap-{step})"
          style:font-size="var(--ui-text-{step === 'lg' ? 'base' : step === 'md' ? 'md' : step === 'sm' ? 'sm' : 'xs'})"
        >
          <Icon name="folder" size={Number(icon.replace("px", ""))} />
          Documents
        </span>
        <span class="controls__spec">h {h} · px {px} · r {radius} · icon {icon}</span>
      </div>
    {/each}
  </div>
</Story>

<Story name="Spacing" asChild>
  <div class="space">
    {#each SPACE as n (n)}
      <div class="space__row">
        <code>--ui-space-{n}</code>
        <span class="space__bar" style:width="var(--ui-space-{n})"></span>
      </div>
    {/each}
  </div>
</Story>

<Story
  name="Radius"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "Every radius is a multiple of `--ui-radius-scale`, so setting that one value to 0 squares off the entire kit and 1.6 rounds it all off — without touching a component."
      }
    }
  }}
>
  <Showcase>
    <div class="tiles">
      {#each RADIUS as r (r)}
        <div class="tile" style:border-radius="var(--ui-radius-{r})">
          <code>{r}</code>
        </div>
      {/each}
    </div>
    <div class="tiles">
      {#each [0, 0.6, 1, 1.4, 1.9] as scale (scale)}
        <div class="scope" style:--ui-radius-scale={scale} data-ui-scope>
          <div class="tile tile--lg"><code>scale {scale}</code></div>
        </div>
      {/each}
    </div>
  </Showcase>
</Story>

<Story name="Elevation" asChild>
  <div class="tiles tiles--wide">
    {#each SHADOW as s (s)}
      <div class="tile tile--card" style:box-shadow="var(--ui-shadow-{s})">
        <code>shadow-{s}</code>
      </div>
    {/each}
  </div>
</Story>

<Story
  name="Icons"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "Drawn on a 24-unit grid with a 2px round stroke. Shipped inline rather than as a dependency — swap `Icon` for your own renderer if you already pay for an icon library."
      }
    }
  }}
>
  <div class="icons">
    {#each iconNames as name (name)}
      <div class="icons__cell">
        <Icon {name} size={18} />
        <span>{name}</span>
      </div>
    {/each}
  </div>
</Story>

<style>
  .type {
    display: flex;
    flex-direction: column;
  }
  .type__row {
    display: grid;
    grid-template-columns: 140px 46px 1fr 110px;
    align-items: baseline;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid var(--ui-border-subtle);
  }
  .type code,
  .space code {
    font-family: var(--ui-font-mono);
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
  }
  .type__px {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
    font-variant-numeric: tabular-nums;
  }
  .type__sample {
    letter-spacing: var(--ui-tracking-snug);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .type__use {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-subtle);
    text-align: end;
  }

  .space {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .space__row {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    gap: 16px;
  }
  .controls {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-6);
    align-items: flex-start;
  }
  .controls__row {
    display: flex;
    align-items: center;
    gap: var(--ui-space-8);
  }
  .controls__row > code {
    width: 24px;
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
  }
  .controls__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border-default);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    white-space: nowrap;
  }
  .controls__spec {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
    font-variant-numeric: tabular-nums;
  }

  .space__bar {
    height: 14px;
    background: var(--ui-accent-soft);
    border-inline-start: 2px solid var(--ui-accent-solid);
    border-radius: 2px;
  }

  .tiles {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .tiles--wide { gap: 20px; }
  .tile {
    display: grid;
    place-items: center;
    width: 84px;
    height: 68px;
    background: var(--ui-bg-muted);
    border: 1px solid var(--ui-border-default);
  }
  /* Reads whatever --ui-radius-scale its enclosing scope sets. */
  .tile--lg {
    width: 104px;
    border-radius: var(--ui-radius-xl);
  }
  .tile--card {
    background: var(--ui-bg-surface);
    border-radius: var(--ui-radius-xl);
    width: 108px;
    height: 76px;
  }
  .tile code {
    font-family: var(--ui-font-mono);
    font-size: var(--ui-text-2xs);
    color: var(--ui-fg-subtle);
  }
  .scope { display: contents; }

  .icons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
    gap: 4px;
  }
  .icons__cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 6px;
    border: 1px solid var(--ui-border-subtle);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-bg-surface);
    color: var(--ui-fg-default);
  }
  .icons__cell span {
    font-size: var(--ui-text-2xs);
    color: var(--ui-fg-subtle);
    text-align: center;
    word-break: break-word;
  }
</style>
