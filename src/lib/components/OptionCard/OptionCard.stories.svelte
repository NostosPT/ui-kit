<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import OptionCard from "./OptionCard.svelte";
  import Button from "../Button/Button.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Icon from "../Icon/Icon.svelte";

  const { Story } = defineMeta({
    title: "Forms/OptionCard",
    component: OptionCard,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Selectable card options where the card is the `<label>`, keeping hit targets generous while maintaining native accessibility."
        }
      }
    }
  });

  let method = $state("bank");
  let plan = $state("team");
  let extras = $state(false);
</script>

<Story name="Radio Options" asChild>
  <div class="stack">
    <div class="group">
      <OptionCard bind:group={method} value="bank" name="payout" icon="credit-card" description="•••• 8490">
        {#snippet media()}
          <span class="tile"><Icon name="credit-card" size={18} /></span>
        {/snippet}
        {#snippet action()}
          <Button variant="ghost" tone="neutral" size="sm" iconOnly icon="more-horizontal" label="More" />
        {/snippet}
        {#snippet titleSlot()}
          Bank account <Icon name="check" size={15} class="verified" />
        {/snippet}
      </OptionCard>

      <OptionCard
        bind:group={method}
        value="paypal"
        name="payout"
        title="Paypal"
        description="Connect your PayPal account"
      >
        {#snippet media()}
          <span class="tile tile--accent"><Icon name="mail" size={18} /></span>
        {/snippet}
        {#snippet action()}
          <Button variant="outline" tone="neutral" size="sm">Connect</Button>
        {/snippet}
      </OptionCard>
    </div>

    <div class="group">
      <OptionCard
        bind:group={plan}
        value="team"
        name="plan"
        align="start"
        icon="user"
        title="Team"
        description="Up to 20 seats, shared billing and a single invoice."
      >
        {#snippet action()}<Badge tone="accent">Current</Badge>{/snippet}
      </OptionCard>
      <OptionCard
        bind:group={plan}
        value="enterprise"
        name="plan"
        align="start"
        icon="star"
        title="Enterprise"
        description="SSO, audit log and a named support contact."
      />
      <OptionCard
        bind:group={plan}
        value="legacy"
        name="plan"
        align="start"
        icon="lock"
        title="Legacy"
        description="No longer available to new workspaces."
        disabled
      />
    </div>
  </div>
</Story>

<Story name="Checkbox Option" asChild>
  <div class="stack">
    <OptionCard
      control="checkbox"
      bind:checked={extras}
      icon="clock"
      title="Subscribe to updates"
      description="Notifications only about new features and scheduled maintenance."
    />
  </div>
</Story>

<style>
  .stack { display: flex; flex-direction: column; gap: 28px; max-width: 460px; }
  .group { display: flex; flex-direction: column; gap: 10px; }
  .stack :global(.verified) { color: var(--ui-success-solid); }
  .tile {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-sm);
    height: var(--ui-control-h-sm);
    border-radius: var(--ui-control-radius-sm);
    background: var(--ui-bg-muted);
    color: var(--ui-fg-muted);
  }
  .tile--accent {
    background: var(--ui-accent-soft);
    color: var(--ui-accent-text);
  }
</style>
