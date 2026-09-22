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

<Story
  name="Reference sheet"
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "A one-to-one rebuild of the badges and tags reference sheet from the source design."
      }
    }
  }}
  asChild
>
  <div class="sheet">
    <!-- Row 1: Avatars with Dismiss -->
    <div class="row">
      <Badge size="lg" variant="surface" avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" pill removable>Alex</Badge>
      <Badge size="lg" variant="surface" avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" pill removable>Anna</Badge>
      <Badge size="lg" variant="surface" avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" pill removable>Pixsellz</Badge>
    </div>

    <!-- Row 2: Status Pills (Paid, Declined, Pending, Refunded) -->
    <div class="row">
      <Badge size="lg" variant="solid" tone="success" icon="check">Paid</Badge>
      <Badge size="lg" variant="solid" tone="danger" icon="x">Declined</Badge>
      <Badge size="lg" variant="solid" tone="neutral" icon="clock">Pending</Badge>
      <Badge size="lg" variant="solid" tone="orange" icon="arrow-left">Refunded</Badge>
    </div>

    <!-- Row 3: Country Flag Chips -->
    <div class="row">
      <Badge size="lg" variant="surface" pill removable>
        {#snippet imageSnippet()}
          <span style="font-size: 16px; line-height: 1; margin-inline-start: -2px;">🇺🇸</span>
        {/snippet}
        United States
      </Badge>
      <Badge size="lg" variant="surface" pill removable>
        {#snippet imageSnippet()}
          <span style="font-size: 16px; line-height: 1; margin-inline-start: -2px;">🇨🇳</span>
        {/snippet}
        China
      </Badge>
      <Badge size="lg" variant="surface" pill removable>
        {#snippet imageSnippet()}
          <span style="font-size: 16px; line-height: 1; margin-inline-start: -2px;">🇫🇷</span>
        {/snippet}
        France
      </Badge>
      <Badge size="lg" variant="surface" pill removable>
        {#snippet imageSnippet()}
          <span style="font-size: 16px; line-height: 1; margin-inline-start: -2px;">🇵🇹</span>
        {/snippet}
        Portugal
      </Badge>
    </div>

    <!-- Row 4: Category Tags -->
    <div class="row">
      <Badge size="lg" variant="soft" tone="accent" icon="monitor">Web Design</Badge>
      <Badge size="lg" variant="soft" tone="accent" icon="mobile">Mobile</Badge>
      <Badge size="lg" variant="soft" tone="accent" icon="typography">Typography</Badge>
    </div>

    <!-- Row 5: Dot Statuses -->
    <div class="row">
      <Badge size="lg" variant="soft" tone="danger" dot>Offline</Badge>
      <Badge size="lg" variant="soft" tone="success" dot>Online</Badge>
    </div>
  </div>
</Story>

<style>
  .sheet {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 48px 32px;
    background: #fafafa;
    border-radius: var(--ui-radius-2xl);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
