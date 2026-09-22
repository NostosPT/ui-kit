<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DataList from "./DataList.svelte";
  import DataListRow from "./DataListRow.svelte";
  import Card from "../Card/Card.svelte";
  import CardBody from "../Card/CardBody.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";

  const { Story } = defineMeta({
    title: "Data display/Summary",
    component: DataList,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Key/value rows: order summaries, payout breakdowns, spec panels. A real `<dl>`, so a screen reader announces \"Subtotal, $2.99\" as one pair rather than two loose strings — which matters most here, because these are the numbers a user is about to agree to."
        }
      }
    }
  });
</script>

<Story
  name="Payout breakdown"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "The leader dots are a repeating radial gradient on a flexible middle cell, not a dotted border on the label. A dotted border is only as wide as the text, so it stops where the label stops instead of running to the number."
      }
    }
  }}
>
  <div style="max-width: 340px">
    <Card>
      <CardBody padding="md">
        <div class="head">
          <h3>Payout details</h3>
          <Button variant="ghost" tone="neutral" size="sm" iconOnly icon="x" label="Close" />
        </div>
        <div class="meta">
          <Badge tone="success" variant="dot">Paid</Badge>
          <span>#49503</span>
          <span>28 Apr 2024</span>
        </div>

        <DataList leader>
          <DataListRow label="Earnings" value="$98.40" />
          <DataListRow label="Refunds" value="$0.00" muted />
          <DataListRow label="Tax" value="−$11.33" />
          <DataListRow label="Fees" value="−$12.22" />
          <DataListRow variant="sub" label="Payments" hint="Processor fee" value="−$7.74" />
          <DataListRow variant="sub" label="Payout" hint="Transfer fee" value="−$4.48" />
          <DataListRow variant="total" label="Payout total" value="$74.85" />
        </DataList>
      </CardBody>
    </Card>
  </div>
</Story>

<Story name="Order summary" asChild>
  <div style="max-width: 340px">
    <DataList>
      <DataListRow label="Subtotal" value="$2.99" />
      <DataListRow label="Tax" hint="Calculated from the billing address." value="Enter address to calculate" muted />
      <DataListRow variant="total" label="Total due today" value="$2.99" />
    </DataList>
  </div>
</Story>

<Story name="Variants" asChild>
  <Showcase width="340px">
    <DataList dividers>
      <DataListRow label="Plan" value="Team" />
      <DataListRow label="Seats" value="12" />
      <DataListRow label="Renews" value="14 May 2024" />
    </DataList>
  </Showcase>
</Story>

<style>
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }
  .head h3 {
    margin: 0;
    font-size: var(--ui-text-xl);
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-snug);
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 8px 12px;
    border-radius: var(--ui-radius-lg);
    background: var(--ui-bg-sunken);
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-muted);
  }
</style>
