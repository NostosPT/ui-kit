<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import SegmentedControl from "./SegmentedControl.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/SegmentedControl",
    component: SegmentedControl,
    tags: ["autodocs"],
    args: {
      items: ["15M", "30M", "1H", "4H", "1D"],
      value: "15M",
      size: "md",
      variant: "solid"
    },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      variant: { control: "inline-radio", options: ["solid", "accent", "ghost"] },
      pill: { control: "boolean" },
      block: { control: "boolean" },
      disabled: { control: "boolean" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "A radiogroup, not tabs — it picks a value rather than swapping a panel. The indicator is measured from the active button, so options of very different widths still get an exact fit. Arrow keys move the selection and wrap."
        }
      }
    }
  });

  const TIMEFRAMES = ["15M", "30M", "1H", "4H", "1D"];
  const BILLING = [
    { value: "monthly", label: "Monthly", icon: "calendar" },
    { value: "annually", label: "Annually", icon: "star" }
  ];
  const VIEWS = [
    { value: "grid", label: "Grid", icon: "grid" },
    { value: "list", label: "List", icon: "list" }
  ];

  let tf = $state("15M");
  let billing = $state("monthly");
  let view = $state("grid");
  let wide = $state("overview");
</script>

<Story name="Playground">
  {#snippet template(args)}
    <SegmentedControl {...args} />
  {/snippet}
</Story>

<Story name="Variants" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="solid">
      <SegmentedControl items={TIMEFRAMES} bind:value={tf} ariaLabel="Timeframe" />
    </Spec>
    <Spec label="pill">
      <SegmentedControl items={TIMEFRAMES} bind:value={tf} pill ariaLabel="Pill timeframe" />
    </Spec>
    <Spec label="accent">
      <SegmentedControl items={BILLING} bind:value={billing} variant="accent" ariaLabel="Billing period" />
    </Spec>
    <Spec label="ghost">
      <SegmentedControl items={VIEWS} bind:value={view} variant="ghost" ariaLabel="Layout" />
    </Spec>
  </Showcase>
</Story>

<Story name="Sizes" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="sm"><SegmentedControl items={TIMEFRAMES} value="1H" size="sm" ariaLabel="Timeframe" /></Spec>
    <Spec label="md"><SegmentedControl items={TIMEFRAMES} value="1H" size="md" ariaLabel="Timeframe" /></Spec>
    <Spec label="lg"><SegmentedControl items={TIMEFRAMES} value="1H" size="lg" ariaLabel="Timeframe" /></Spec>
  </Showcase>
</Story>

<Story
  name="Uneven labels"
  asChild
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "The case a percentage-based indicator gets wrong. Each option is measured, so the indicator matches whichever label is active."
      }
    }
  }}
>
  <div style="width: 440px">
    <SegmentedControl
      block
      bind:value={wide}
      ariaLabel="Section"
      items={[
        { value: "overview", label: "Overview" },
        { value: "billing", label: "Billing & invoices" },
        { value: "team", label: "Team" },
        { value: "api", label: "API", disabled: true }
      ]}
    />
  </div>
</Story>
