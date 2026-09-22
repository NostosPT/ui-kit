<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Swatches from "./Swatches.svelte";
  import Showcase from "../util/Showcase.svelte";

  const { Story } = defineMeta({
    title: "Foundations/Colour",
    component: Swatches,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Every ramp is generated from a hue and a chroma. Lightness steps are fixed across all of them, which is what makes contrast predictable no matter which hue a consumer picks — swap the accent from indigo to amber and the 600 step is still the 600 step."
        }
      }
    }
  });

  const FULL = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const STATUS = [50, 100, 200, 500, 600, 700, 900];

  const SEMANTIC = [
    ["Surfaces", ["bg-canvas", "bg-surface", "bg-raised", "bg-sunken", "bg-subtle", "bg-muted", "bg-emphasis", "bg-inverse"]],
    ["Foreground", ["fg-default", "fg-muted", "fg-subtle", "fg-faint", "fg-inverse"]],
    ["Borders", ["border-subtle", "border-default", "border-strong"]],
    ["Accent", ["accent-solid", "accent-solid-hover", "accent-soft", "accent-border", "accent-text"]],
    ["Status", ["success-solid", "success-soft", "warning-solid", "warning-soft", "danger-solid", "danger-soft", "info-solid", "info-soft"]]
  ];
</script>

<Story name="Ramps" asChild>
  <Showcase gap={26}>
    <Swatches title="Accent" prefix="accent" steps={FULL} note="Driven by --ui-accent-h and --ui-accent-c." />
    <Swatches title="Neutral" prefix="neutral" steps={[0, ...FULL]} note="A near-grey with a small hue tint, so surfaces feel warm or cool rather than dead." />
    <Swatches title="Success" prefix="success" steps={STATUS} />
    <Swatches title="Warning" prefix="warning" steps={STATUS} />
    <Swatches title="Danger" prefix="danger" steps={STATUS} />
    <Swatches title="Info" prefix="info" steps={STATUS} />
  </Showcase>
</Story>

<Story
  name="Semantic tokens"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "The only layer components are allowed to touch. A component never names a ramp step — it asks for `border-default` or `bg-hover`, which is what makes the dark theme a pure remap and lets a consumer restyle one surface without auditing anything."
      }
    }
  }}
>
  <div class="sem">
    {#each SEMANTIC as [group, tokens]}
      <h4>{group}</h4>
      <ul>
        {#each tokens as token (token)}
          <li>
            <span class="sem__chip" style:background="var(--ui-{token})"></span>
            <code>--ui-{token}</code>
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</Story>

<style>
  .sem h4 {
    margin: 20px 0 8px;
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-semibold);
  }
  .sem h4:first-child { margin-top: 0; }
  .sem ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 6px;
  }
  .sem li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid var(--ui-border-subtle);
    border-radius: var(--ui-radius-md);
    background: var(--ui-bg-surface);
  }
  .sem__chip {
    width: 22px;
    height: 22px;
    flex: none;
    border-radius: var(--ui-radius-sm);
    box-shadow: inset 0 0 0 1px oklch(0% 0 0 / 0.1);
  }
  .sem code {
    font-family: var(--ui-font-mono);
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-muted);
  }
</style>
