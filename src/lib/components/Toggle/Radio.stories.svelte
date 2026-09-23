<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Radio from "./Radio.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Radio",
    component: Radio,
    tags: ["autodocs"],
    args: { size: "md", disabled: false },
    parameters: {
      docs: {
        description: {
          component:
            "Radio button control for selecting one option from a mutually exclusive list, preserving native keyboard navigation."
        }
      }
    }
  });

  let plan = $state("monthly");
</script>

<Story name="States" asChild parameters={{ layout: "padded" }}>
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

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
</style>
