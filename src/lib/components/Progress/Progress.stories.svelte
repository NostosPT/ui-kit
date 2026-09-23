<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Progress from "./Progress.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Data Display/Progress",
    component: Progress,
    tags: ["autodocs"],
    args: {
      value: 42,
      label: "Uploading",
      showValue: true,
      size: "md"
    },
    argTypes: {
      tone: { control: "inline-radio", options: ["accent", "neutral", "success", "warning", "danger"] },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      showValue: { control: "boolean" },
      value: { control: "number" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Linear progress indicator showing task completion status, percentage value, and support for semantic tones and indeterminate pulse."
        }
      }
    }
  });
</script>

<Story name="Standard" asChild>
  <Showcase width="320px" gap={20}>
    <Spec label="value" align="stretch"><Progress value={42} label="Uploading" showValue /></Spec>
    <Spec label="tones" align="stretch">
      <Progress value={80} tone="success" />
    </Spec>
    <Spec label="sizes" align="stretch"><Progress value={60} size="lg" /></Spec>
    <Spec label="indeterminate" align="stretch"><Progress /></Spec>
  </Showcase>
</Story>
