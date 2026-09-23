<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Checkbox from "./Checkbox.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Checkbox",
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
            "Accessible checkbox control retaining native checkbox inputs with customized check and indeterminate icons."
        }
      }
    }
  });

  let selected = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Checkbox {...args} label={args.label ?? "Select all files"} />
  {/snippet}
</Story>

<Story name="States" asChild parameters={{ layout: "padded" }}>
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
