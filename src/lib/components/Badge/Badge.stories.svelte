<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Badge from "./Badge.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Primitives/Badge",
    component: Badge,
    tags: ["autodocs"],
    args: { tone: "success", variant: "soft", size: "md", pill: true },
    argTypes: {
      tone: {
        control: "inline-radio",
        options: ["neutral", "accent", "success", "warning", "danger", "info"]
      },
      variant: { control: "inline-radio", options: ["soft", "outline", "solid", "dot"] },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      icon: { control: "text" },
      dot: { control: "boolean" },
      pill: { control: "boolean" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "One component, four weights. Reach for `dot` inside tables — a row of tinted pills competes with the data it is annotating."
        }
      }
    }
  });

  const TONES = ["neutral", "accent", "success", "warning", "danger", "info"];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Badge {...args}>Paid</Badge>
  {/snippet}
</Story>

<Story name="Variants" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="soft">
      {#each TONES as tone}<Badge {tone}>Label</Badge>{/each}
    </Spec>
    <Spec label="outline">
      {#each TONES as tone}<Badge {tone} variant="outline">Label</Badge>{/each}
    </Spec>
    <Spec label="solid">
      {#each TONES as tone}<Badge {tone} variant="solid">Label</Badge>{/each}
    </Spec>
    <Spec label="dot">
      {#each TONES as tone}<Badge {tone} variant="dot">Label</Badge>{/each}
    </Spec>
  </Showcase>
</Story>

<Story name="Statuses" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="order">
      <Badge tone="success" icon="check-circle">Paid</Badge>
      <Badge tone="neutral" icon="rotate-ccw">Refunded</Badge>
      <Badge tone="danger" icon="x-circle">Cancelled</Badge>
      <Badge tone="warning" icon="clock">Pending</Badge>
    </Spec>
    <Spec label="invite">
      <Badge variant="outline" icon="check">Invited</Badge>
      <Badge variant="outline" icon="clock">Awaiting</Badge>
    </Spec>
    <Spec label="billing">
      <Badge tone="neutral" icon="calendar" pill={false}>Billed yearly</Badge>
      <Badge tone="accent" variant="dot">Monthly</Badge>
      <Badge tone="warning" variant="dot">Annually</Badge>
    </Spec>
    <Spec label="counts">
      <Badge tone="accent" variant="solid" size="sm">2</Badge>
      <Badge tone="danger" variant="solid" size="sm">12</Badge>
      <Badge tone="neutral" variant="soft" size="sm">99+</Badge>
    </Spec>
  </Showcase>
</Story>

<Story name="Sizes" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="sm"><Badge size="sm" icon="check-circle">Paid</Badge></Spec>
    <Spec label="md"><Badge size="md" icon="check-circle">Paid</Badge></Spec>
    <Spec label="lg"><Badge size="lg" icon="check-circle">Paid</Badge></Spec>
  </Showcase>
</Story>
