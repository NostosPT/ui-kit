<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "../../lib/components/Card/Card.svelte";
  import CardBody from "../../lib/components/Card/CardBody.svelte";
  import CardFooter from "../../lib/components/Card/CardFooter.svelte";
  import Button from "../../lib/components/Button/Button.svelte";
  import Badge from "../../lib/components/Badge/Badge.svelte";
  import Icon from "../../lib/components/Icon/Icon.svelte";
  import Divider from "../../lib/components/Divider/Divider.svelte";
  import Accordion from "../../lib/components/Accordion/Accordion.svelte";
  import AccordionItem from "../../lib/components/Accordion/AccordionItem.svelte";
  import Alert from "../../lib/components/Alert/Alert.svelte";
  import Input from "../../lib/components/Input/Input.svelte";
  import PhoneInput from "../../lib/components/PhoneInput/PhoneInput.svelte";
  import NumberInput from "../../lib/components/NumberInput/NumberInput.svelte";
  import SegmentedControl from "../../lib/components/Segmented/SegmentedControl.svelte";
  import Tooltip from "../../lib/components/Tooltip/Tooltip.svelte";
  import Toolbar from "../../lib/components/Toolbar/Toolbar.svelte";
  import ButtonGroup from "../../lib/components/ButtonGroup/ButtonGroup.svelte";
  import Menu from "../../lib/components/Menu/Menu.svelte";
  import MenuItem from "../../lib/components/Menu/MenuItem.svelte";
  import MenuSeparator from "../../lib/components/Menu/MenuSeparator.svelte";
  import Avatar from "../../lib/components/Avatar/Avatar.svelte";
  import TagInput from "../../lib/components/TagInput/TagInput.svelte";
  import Field from "../../lib/components/Field/Field.svelte";
  import Kbd from "../../lib/components/Kbd/Kbd.svelte";

  const { Story } = defineMeta({
    title: "Patterns/Checkout",
    component: Card,
    parameters: { layout: "padded" }
  });

  let billing = $state("annually");
  let promo = $state(false);
  let expanded = $state("domain");
  let qty = $state(45);
  let phone = $state("");
  let country = $state("US");
  let users = $state(["Jack", "Ann"]);
  let liked = $state(false);
  let likes = $state(2);
</script>

<Story name="Subscription" asChild>
  <div style="width: 400px">
    <Card>
      <CardBody padding="md">
        <div class="stack">
          <div><Button variant="link" tone="neutral" icon="chevron-left">Back</Button></div>

          <div>
            <p class="eyebrow">
              Subscribe to <Icon name="globe" size={14} /> <span class="eyebrow__name">Custom Domain</span>
            </p>
            <p class="price">
              $2.99<span class="price__unit">/year</span>
            </p>
          </div>

          <SegmentedControl
            block
            bind:value={billing}
            variant="accent"
            ariaLabel="Billing period"
            items={[
              { value: "monthly", label: "Monthly", icon: "calendar" },
              { value: "annually", label: "Annually", icon: "star" }
            ]}
          />

          <Accordion bind:value={expanded}>
            <AccordionItem id="domain" icon="globe" title="Custom Domain" value="$2.99">
              A 1-year registration of your custom domain name, ready to be used in your email
              address.
              <div style="margin-top: 10px">
                <Badge icon="calendar" pill={false}>Billed yearly</Badge>
              </div>
            </AccordionItem>
          </Accordion>

          <Divider />

          <dl class="summary">
            <div><dt>Subtotal</dt><dd>$2.99</dd></div>
            <div>
              <dt>
                <button type="button" class="promo" onclick={() => (promo = !promo)}>
                  <Icon name="plus" size={14} /> Add promocode
                </button>
              </dt>
              <dd></dd>
            </div>
            {#if promo}
              <div class="summary__full">
                <Input size="sm" placeholder="Promo code">
                  {#snippet end()}
                    <div class="flush ui-frame-flush">
                      <Button size="xs" variant="ghost" tone="accent">Apply</Button>
                    </div>
                  {/snippet}
                </Input>
              </div>
            {/if}
            <div>
              <dt>
                Tax
                <Tooltip content="Calculated once a billing address is added to the account.">
                  <span class="info"><Icon name="info" size={13} /></span>
                </Tooltip>
              </dt>
              <dd class="muted">Enter address to calculate</dd>
            </div>
          </dl>

          <Divider />

          <div class="total">
            <span>Total due today</span>
            <strong>$2.99</strong>
          </div>
        </div>
      </CardBody>
      <CardFooter muted align="between">
        <Button variant="ghost" tone="neutral">Cancel</Button>
        <Button icon="credit-card">Place order</Button>
      </CardFooter>
    </Card>
  </div>
</Story>

<Story name="Confirmation" asChild>
  <div style="width: 440px; display:flex; flex-direction:column; gap:16px">
    <Alert tone="success" title="Your order has been successfully placed">
      It will be delivered within 2–3 days.
    </Alert>

    <Card padding="md">
      <div class="stack">
        <Field label="Phone number" hint="We'll text you when it ships.">
          {#snippet control({ id, describedBy })}
            <PhoneInput {id} aria-describedby={describedBy} bind:value={phone} bind:country />
          {/snippet}
        </Field>

        <Field label="Users" hint="Select up to 3 users.">
          {#snippet control({ id })}
            <TagInput {id} bind:value={users} max={3} placeholder="Add a teammate" />
          {/snippet}
        </Field>

        <div class="row">
          <NumberInput bind:value={qty} min={0} max={99} />
          <Button icon="user-plus">Sign Up</Button>
          <Button
            variant="outline"
            icon="heart"
            onclick={() => {
              liked = !liked;
              likes += liked ? 1 : -1;
            }}
          >
            Like <Badge size="sm" tone={liked ? "accent" : "neutral"}>{likes}</Badge>
          </Button>
        </div>

        <div class="row">
          <Button variant="outline" icon="send">
            Send <Kbd size="sm" keys={["⌘", "⇧"]} />
          </Button>
          <Toolbar>
            <ButtonGroup ariaLabel="Document actions">
              <Button variant="outline" icon="folder">Documents</Button>
              <Button variant="outline" icon="upload">Export</Button>
              <Menu placement="bottom-end">
                {#snippet trigger({ toggle, open })}
                  <Button variant="outline" iconOnly icon="more-horizontal" label="More" onclick={toggle} aria-expanded={open} />
                {/snippet}
                {#snippet children({ close })}
                  <MenuItem icon="copy" {close}>Duplicate</MenuItem>
                  <MenuItem icon="link" {close}>Copy link</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon="trash" tone="danger" {close}>Delete</MenuItem>
                {/snippet}
              </Menu>
            </ButtonGroup>
          </Toolbar>
        </div>

        <div class="row">
          <Avatar name="Jenny Wilson" presence="online" />
          <div class="who">
            <span class="who__name">Jenny Wilson</span>
            <span class="who__role">UX Designer</span>
          </div>
          <Button size="sm" variant="outline">Follow</Button>
        </div>
      </div>
    </Card>
  </div>
</Story>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 0 2px;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-muted);
  }
  .eyebrow__name {
    color: var(--ui-accent-text);
    font-weight: var(--ui-weight-medium);
  }
  .price {
    margin: 0;
    font-size: var(--ui-text-4xl);
    font-weight: var(--ui-weight-bold);
    letter-spacing: var(--ui-tracking-tight);
    line-height: 1.1;
  }
  .price__unit {
    font-size: var(--ui-text-base);
    font-weight: var(--ui-weight-normal);
    color: var(--ui-fg-subtle);
    letter-spacing: var(--ui-tracking-normal);
    margin-inline-start: 4px;
  }

  .summary {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: var(--ui-text-md);
  }
  .summary > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .summary__full {
    display: block;
  }
  .summary dt {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--ui-fg-muted);
  }
  .summary dd {
    margin: 0;
    font-variant-numeric: tabular-nums;
    font-weight: var(--ui-weight-medium);
  }
  .summary dd.muted {
    font-weight: var(--ui-weight-normal);
    color: var(--ui-fg-subtle);
  }
  .promo {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--ui-accent-text);
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-medium);
  }
  .info {
    display: inline-flex;
    color: var(--ui-fg-faint);
    cursor: help;
  }

  .total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    font-size: var(--ui-text-lg);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-snug);
  }
  .total strong {
    font-variant-numeric: tabular-nums;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .flush {
    display: flex;
    align-items: center;
    padding-inline-end: 3px;
  }
  .who {
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: 1.3;
  }
  .who__name {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-medium);
  }
  .who__role {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
</style>
