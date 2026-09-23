<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Alert from "./Alert.svelte";
  import Button from "../Button/Button.svelte";
  import Toaster from "../Toast/Toaster.svelte";
  import { toast } from "../Toast/toast.svelte.js";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Feedback/Overview",
    component: Alert,
    tags: ["autodocs"],
    args: { tone: "success", variant: "soft" },
    argTypes: {
      tone: { control: "inline-radio", options: ["neutral", "accent", "success", "warning", "danger", "info"] },
      variant: { control: "inline-radio", options: ["soft", "outline", "solid", "bar"] },
      dismissible: { control: "boolean" },
      title: { control: "text" }
    },
    parameters: { layout: "padded" }
  });

  let dismissed = $state(false);
</script>

<Story name="Alert" asChild>
  <Showcase width="520px" gap={12}>
    <Alert tone="success" title="Your order has been successfully placed">
      It will be delivered within 2–3 days.
    </Alert>
    <Alert tone="info" title="Heads up">Your trial ends in 4 days.</Alert>
    <Alert tone="warning" title="Payment method expiring">
      The card ending 4242 expires next month.
    </Alert>
    <Alert tone="danger" title="We couldn't process that refund">
      The original payment method is no longer valid.
    </Alert>
    {#if !dismissed}
      <Alert tone="accent" variant="outline" title="New: custom domains" dismissible ondismiss={() => (dismissed = true)}>
        Connect a domain you already own, or register one for $2.99/year.
      </Alert>
    {/if}
  </Showcase>
</Story>

<Story name="Alert variants" asChild>
  <Showcase width="480px" gap={12}>
    {#each ["soft", "outline", "solid", "bar"] as variant}
      <Alert tone="success" {variant} title="Order placed">Delivered within 2–3 days.</Alert>
    {/each}
  </Showcase>
</Story>

<Story name="Alert with actions" asChild>
  <div style="width: 480px">
    <Alert tone="warning" title="Your invite is about to expire">
      Resend it to give them another 7 days.
      {#snippet actions()}
        <Button size="sm" variant="outline">Resend invite</Button>
        <Button size="sm" variant="ghost" tone="neutral">Dismiss</Button>
      {/snippet}
    </Alert>
  </div>
</Story>

<Story name="Toast" asChild>
  <div style="min-height: 200px">
    <Showcase>
      <Spec label="fire">
        <Button variant="outline" onclick={() => toast.success("Order placed", { description: "It will be delivered within 2–3 days." })}>
          Success
        </Button>
        <Button variant="outline" onclick={() => toast.error("Refund failed", { description: "The original payment method is no longer valid." })}>
          Error
        </Button>
        <Button variant="outline" onclick={() => toast.info("Link copied")}>Info</Button>
        <Button
          variant="outline"
          onclick={() =>
            toast({
              title: "File moved to trash",
              tone: "neutral",
              action: { label: "Undo", onclick: () => toast.success("Restored") }
            })}
        >
          With action
        </Button>
      </Spec>
      <Spec label="clear">
        <Button variant="ghost" tone="neutral" onclick={() => toast.dismissAll()}>Dismiss all</Button>
      </Spec>
    </Showcase>
    <Toaster />
  </div>
</Story>
