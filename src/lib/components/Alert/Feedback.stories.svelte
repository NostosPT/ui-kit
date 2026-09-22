<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Alert from "./Alert.svelte";
  import Button from "../Button/Button.svelte";
  import Modal from "../Modal/Modal.svelte";
  import Tooltip from "../Tooltip/Tooltip.svelte";
  import Popover from "../Popover/Popover.svelte";
  import Toaster from "../Toast/Toaster.svelte";
  import EmptyState from "../EmptyState/EmptyState.svelte";
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

  let confirmOpen = $state(false);
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

<Story name="Modal" asChild>
  <div style="min-height: 120px">
    <Button onclick={() => (confirmOpen = true)}>Delete project</Button>

    <Modal
      bind:open={confirmOpen}
      size="sm"
      title="Delete this project?"
      description="This removes the project and everything in it. This cannot be undone."
    >
      {#snippet footer({ close })}
        <Button variant="ghost" tone="neutral" onclick={close}>Cancel</Button>
        <Button tone="danger" icon="trash" onclick={close}>Delete project</Button>
      {/snippet}
    </Modal>
  </div>
</Story>

<Story name="Tooltip" asChild>
  <div style="padding: 60px 0">
    <Showcase>
      <Spec label="sides">
        <Tooltip content="Top" placement="top-center"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip content="Bottom" placement="bottom-center"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip content="Left" placement="left-center"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip content="Right" placement="right-center"><Button variant="outline">Right</Button></Tooltip>
      </Spec>
      <Spec label="icons">
        <Tooltip content="Download original"><Button variant="ghost" iconOnly icon="download" label="Download" /></Tooltip>
        <Tooltip content="Copy share link"><Button variant="ghost" iconOnly icon="link" label="Copy link" /></Tooltip>
        <Tooltip content="Move to trash"><Button variant="ghost" tone="danger" iconOnly icon="trash" label="Delete" /></Tooltip>
      </Spec>
      <Spec label="long">
        <Tooltip content="Tax is calculated once a billing address is added to the account.">
          <Button variant="ghost" iconOnly icon="info" label="About tax" />
        </Tooltip>
      </Spec>
    </Showcase>
  </div>
</Story>

<Story name="Popover" asChild>
  <div style="padding: 20px 0 240px">
    <Popover placement="bottom-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" icon="sliders" trailingIcon="chevron-down" onclick={toggle} aria-expanded={open}>
          Filters
        </Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 8px 10px; width: 240px">
          <p style="margin:0 0 6px; font-size: var(--ui-text-md); font-weight: 600">Filter orders</p>
          <p style="margin:0; font-size: var(--ui-text-sm); color: var(--ui-fg-muted); line-height:1.5">
            Any content works here — Popover only handles anchoring, outside-click and Escape.
          </p>
        </div>
      {/snippet}
    </Popover>
  </div>
</Story>

<Story name="Empty state" asChild>
  <Showcase width="480px">
    <EmptyState
      bordered
      icon="folder"
      title="No files yet"
      description="Drop files here or browse your computer to get started."
    >
      {#snippet actions()}
        <Button icon="upload">Upload files</Button>
        <Button variant="outline">Import from URL</Button>
      {/snippet}
    </EmptyState>
    <EmptyState size="sm" icon="search" title="No matching orders" description="Try a different search or clear your filters." />
  </Showcase>
</Story>
