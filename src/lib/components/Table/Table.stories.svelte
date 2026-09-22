<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Table from "./Table.svelte";
  import TableRow from "./TableRow.svelte";
  import TableCell from "./TableCell.svelte";
  import TableHeaderCell from "./TableHeaderCell.svelte";
  import Checkbox from "../Toggle/Checkbox.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Button from "../Button/Button.svelte";
  import Menu from "../Menu/Menu.svelte";
  import MenuItem from "../Menu/MenuItem.svelte";
  import MenuSeparator from "../Menu/MenuSeparator.svelte";
  import Pagination from "../Pagination/Pagination.svelte";
  import { ORDERS, STATUS_TONE } from "../../../stories/util/data.js";

  const { Story } = defineMeta({
    title: "Data Display/Table",
    component: Table,
    tags: ["autodocs"],
    args: { density: "comfortable", hoverable: true, bordered: true, stickyHeader: false },
    argTypes: {
      density: { control: "inline-radio", options: ["compact", "comfortable", "spacious"] },
      hoverable: { control: "boolean" },
      bordered: { control: "boolean" },
      stickyHeader: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Presentation only — sorting, selection and paging stay in your state, which is what makes this usable against a server-driven data source. The scroll container lives inside the component so `stickyHeader` actually works."
        }
      }
    }
  });

  let selected = $state(new Set(["#PAD4620"]));
  let sort = $state({ key: "date", dir: "desc" });
  let page = $state(1);

  const allSelected = $derived(selected.size === ORDERS.length);

  function toggle(id) {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    selected = next;
  }
  function toggleAll() {
    selected = allSelected ? new Set() : new Set(ORDERS.map((o) => o.id));
  }
</script>

<Story name="Orders" asChild>
  <div style="width: 100%; max-width: 920px">
    <Table bordered stickyHeader>
      <thead>
        <tr>
          <TableHeaderCell width="44px">
            <Checkbox
              checked={allSelected}
              indeterminate={selected.size > 0 && !allSelected}
              onchange={toggleAll}
              aria-label="Select all orders"
            />
          </TableHeaderCell>
          <TableHeaderCell
            sortable
            direction={sort.key === "id" ? sort.dir : undefined}
            onsort={(dir) => (sort = { key: "id", dir })}
          >
            Order
          </TableHeaderCell>
          <TableHeaderCell
            sortable
            direction={sort.key === "date" ? sort.dir : undefined}
            onsort={(dir) => (sort = { key: "date", dir })}
          >
            Date
          </TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Customer</TableHeaderCell>
          <TableHeaderCell>Billing</TableHeaderCell>
          <TableHeaderCell width="150px" align="end">Actions</TableHeaderCell>
        </tr>
      </thead>

      <tbody>
        {#each ORDERS as order (order.id)}
          {@const status = STATUS_TONE[order.status]}
          <TableRow selected={selected.has(order.id)}>
            <TableCell>
              <Checkbox
                checked={selected.has(order.id)}
                onchange={() => toggle(order.id)}
                aria-label={`Select ${order.id}`}
              />
            </TableCell>
            <TableCell><span class="id">{order.id}</span></TableCell>
            <TableCell muted>{order.date}</TableCell>
            <TableCell>
              <Badge tone={status.tone} icon={status.icon}>{status.label}</Badge>
            </TableCell>
            <TableCell>
              <div class="customer">
                <Avatar size="sm" name={order.person.name} presence="online" />
                <div class="customer__text">
                  <span class="customer__name">{order.person.name}</span>
                  <span class="customer__email">{order.person.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="dot" tone={order.billing === "Monthly" ? "accent" : "warning"}>
                {order.billing}
              </Badge>
            </TableCell>
            <TableCell align="end">
              <div class="actions">
                <Button size="sm" variant="outline" icon="download">Download</Button>
                <Menu placement="bottom-end">
                  {#snippet trigger({ toggle: t, open })}
                    <Button
                      size="sm"
                      variant="ghost"
                      tone="neutral"
                      iconOnly
                      icon="more-horizontal"
                      label={`Actions for ${order.id}`}
                      onclick={t}
                      aria-expanded={open}
                    />
                  {/snippet}
                  {#snippet children({ close })}
                    <MenuItem icon="eye" {close}>View order</MenuItem>
                    <MenuItem icon="mail" {close}>Email receipt</MenuItem>
                    <MenuSeparator />
                    <MenuItem icon="rotate-ccw" tone="danger" {close}>Refund</MenuItem>
                  {/snippet}
                </Menu>
              </div>
            </TableCell>
          </TableRow>
        {/each}
      </tbody>
    </Table>

    <div class="footer">
      <span class="count">{selected.size} of {ORDERS.length} selected</span>
      <Pagination bind:page total={9} />
    </div>
  </div>
</Story>

<Story name="Density" asChild>
  {#each ["compact", "comfortable", "spacious"] as density}
    <div style="max-width: 520px; margin-bottom: 20px">
      <p class="label">{density}</p>
      <Table bordered {density}>
        <thead>
          <tr>
            <TableHeaderCell>Order</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell numeric>Amount</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {#each ORDERS.slice(0, 3) as order (order.id)}
            {@const status = STATUS_TONE[order.status]}
            <TableRow>
              <TableCell><span class="id">{order.id}</span></TableCell>
              <TableCell><Badge size="sm" tone={status.tone}>{status.label}</Badge></TableCell>
              <TableCell numeric>$2.99</TableCell>
            </TableRow>
          {/each}
        </tbody>
      </Table>
    </div>
  {/each}
</Story>

<style>
  .id {
    font-weight: var(--ui-weight-medium);
    font-variant-numeric: tabular-nums;
  }
  .customer {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .customer__text {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }
  .customer__name {
    font-weight: var(--ui-weight-medium);
  }
  .customer__email {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 16px;
  }
  .count {
    font-size: var(--ui-text-md);
    color: var(--ui-fg-muted);
  }
  .label {
    margin: 0 0 8px;
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
  }
</style>
