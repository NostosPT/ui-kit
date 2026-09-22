<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PinInput from "./PinInput.svelte";
  import OptionCard from "../OptionCard/OptionCard.svelte";
  import Field from "../Field/Field.svelte";
  import Button from "../Button/Button.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Choice and code",
    component: PinInput,
    parameters: { layout: "padded" }
  });

  let code = $state("485");
  let short = $state("");
  let method = $state("bank");
  let plan = $state("team");
  let extras = $state(false);
</script>

<Story
  name="Code entry"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "One real `<input>` per cell, not one hidden input behind fake boxes. The hidden-input trick looks identical and then fails every way that matters: password managers have nothing to fill, iOS one-time-code autofill has nothing to target, and tapping the fourth box puts the caret at the end of the string. Paste, arrow keys and backspace-through are handled so the real inputs stay usable."
      }
    }
  }}
>
  <Showcase>
    <Spec label="grouped"><PinInput bind:value={code} length={6} separatorAfter={3} /></Spec>
    <Spec label="plain"><PinInput bind:value={short} length={4} type="number" /></Spec>
    <Spec label="sizes">
      <PinInput value="12" length={4} size="sm" />
      <PinInput value="12" length={4} size="md" />
      <PinInput value="12" length={4} size="lg" />
    </Spec>
    <Spec label="invalid"><PinInput value="1234" length={4} invalid /></Spec>
    <Spec label="disabled"><PinInput value="1234" length={4} disabled /></Spec>
    <Spec label="in a field">
      <div style="width: 300px">
        <Field label="Verification code" hint="We texted a 6-digit code to ••• 4821.">
          {#snippet control({ id, describedBy })}
            <PinInput {id} aria-describedby={describedBy} length={6} separatorAfter={3} />
          {/snippet}
        </Field>
      </div>
    </Spec>
  </Showcase>
</Story>

<Story
  name="Option cards"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "A choice that is a whole row rather than a word beside a dot. The card is the `<label>`, so the hit target is the card; the input is visually hidden but never removed, which is what keeps arrow-key navigation, form submission and focus rings working."
      }
    }
  }}
>
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
          Bank account <Icon name="verified" size={15} class="verified" />
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
          <span class="tile tile--accent"><Icon name="dollar" size={18} /></span>
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
        icon="users"
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
        icon="sparkles"
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

    <div class="group">
      <OptionCard
        control="checkbox"
        bind:checked={extras}
        icon="bell"
        title="Subscribe to newsletter"
        description="Notifications only about new products and updates."
      />
    </div>
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
