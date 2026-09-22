<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Checkbox from "./Checkbox.svelte";
  import Radio from "./Radio.svelte";
  import Switch from "./Switch.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Toggles",
    component: Checkbox,
    tags: ["autodocs"],
    args: { size: "md", disabled: false },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      disabled: { control: "boolean" },
      invalid: { control: "boolean" },
      indeterminate: { control: "boolean" },
      label: { control: "text" },
      description: { control: "text" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "All three keep a real focusable `<input>` in the DOM and paint a sibling element. Form submission, label clicks, the indeterminate property and screen-reader behaviour stay native — the CSS only reacts to `:checked`, `:focus-visible` and `:disabled`."
        }
      }
    }
  });

  let plan = $state("monthly");
  let selected = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Checkbox {...args} label={args.label ?? "Select all files"} />
  {/snippet}
</Story>

<Story name="Checkbox" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="states">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled on" checked disabled />
    </Spec>
    <Spec label="sizes">
      <Checkbox size="sm" label="Small" checked />
      <Checkbox size="md" label="Medium" checked />
      <Checkbox size="lg" label="Large" checked />
    </Spec>
    <Spec label="described" align="start">
      <Checkbox
        label="Email me about replies"
        description="You can turn this off at any time from notification settings."
      />
    </Spec>
    <Spec label="bare"><Checkbox bind:checked={selected} aria-label="Select row" /></Spec>
  </Showcase>
</Story>

<Story name="Radio" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="group" align="start">
      <div class="stack">
        <Radio name="plan" value="monthly" bind:group={plan} label="Monthly" description="$4.99 billed every month" />
        <Radio name="plan" value="annually" bind:group={plan} label="Annually" description="$2.99 billed yearly — save 40%" />
      </div>
    </Spec>
    <Spec label="states">
      <Radio label="Off" />
      <Radio label="On" group="a" value="a" />
      <Radio label="Disabled" disabled />
    </Spec>
  </Showcase>
</Story>

<Story name="Switch" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="states">
      <Switch label="Off" />
      <Switch label="On" checked />
      <Switch label="Disabled" disabled />
    </Spec>
    <Spec label="sizes">
      <Switch size="sm" checked label="Small" />
      <Switch size="md" checked label="Medium" />
      <Switch size="lg" checked label="Large" />
    </Spec>
    <Spec label="settings row" align="start">
      <div class="row">
        <Switch
          labelPosition="start"
          checked
          label="Public link"
          description="Anyone with the link can view this project."
        />
      </div>
    </Spec>
  </Showcase>
</Story>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .row {
    width: 320px;
    padding: 14px 16px;
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    background: var(--ui-bg-surface);
  }
</style>
