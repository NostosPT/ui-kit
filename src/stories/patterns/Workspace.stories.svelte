<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "../../lib/components/Card/Card.svelte";
  import CardHeader from "../../lib/components/Card/CardHeader.svelte";
  import CardBody from "../../lib/components/Card/CardBody.svelte";
  import CardFooter from "../../lib/components/Card/CardFooter.svelte";
  import Button from "../../lib/components/Button/Button.svelte";
  import ButtonGroup from "../../lib/components/ButtonGroup/ButtonGroup.svelte";
  import Dropzone from "../../lib/components/Dropzone/Dropzone.svelte";
  import List from "../../lib/components/List/List.svelte";
  import ListItem from "../../lib/components/List/ListItem.svelte";
  import Thumbnail from "../../lib/components/List/Thumbnail.svelte";
  import Checkbox from "../../lib/components/Toggle/Checkbox.svelte";
  import Radio from "../../lib/components/Toggle/Radio.svelte";
  import OptionCard from "../../lib/components/OptionCard/OptionCard.svelte";
  import Badge from "../../lib/components/Badge/Badge.svelte";
  import Tabs from "../../lib/components/Tabs/Tabs.svelte";
  import TabPanel from "../../lib/components/Tabs/TabPanel.svelte";
  import Input from "../../lib/components/Input/Input.svelte";
  import Field from "../../lib/components/Field/Field.svelte";
  import Divider from "../../lib/components/Divider/Divider.svelte";
  import Avatar from "../../lib/components/Avatar/Avatar.svelte";
  import SegmentedControl from "../../lib/components/Segmented/SegmentedControl.svelte";
  import Calendar from "../../lib/components/Calendar/Calendar.svelte";
  import Table from "../../lib/components/Table/Table.svelte";
  import TableRow from "../../lib/components/Table/TableRow.svelte";
  import TableCell from "../../lib/components/Table/TableCell.svelte";
  import TableHeaderCell from "../../lib/components/Table/TableHeaderCell.svelte";
  import DataList from "../../lib/components/DataList/DataList.svelte";
  import DataListRow from "../../lib/components/DataList/DataListRow.svelte";
  import Menu from "../../lib/components/Menu/Menu.svelte";
  import MenuItem from "../../lib/components/Menu/MenuItem.svelte";
  import MenuSeparator from "../../lib/components/Menu/MenuSeparator.svelte";
  import Kbd from "../../lib/components/Kbd/Kbd.svelte";
  import Icon from "../../lib/components/Icon/Icon.svelte";
  import Sidebar from "../../lib/components/Sidebar/Sidebar.svelte";
  import SidebarHeader from "../../lib/components/Sidebar/SidebarHeader.svelte";
  import SidebarSearch from "../../lib/components/Sidebar/SidebarSearch.svelte";
  import SidebarNav from "../../lib/components/Sidebar/SidebarNav.svelte";
  import SidebarSection from "../../lib/components/Sidebar/SidebarSection.svelte";
  import SidebarItem from "../../lib/components/Sidebar/SidebarItem.svelte";
  import SidebarFooter from "../../lib/components/Sidebar/SidebarFooter.svelte";
  import QrPlaceholder from "./QrPlaceholder.svelte";
  import { FILES, PEOPLE } from "../util/data.js";

  const { Story } = defineMeta({
    title: "Patterns/Workspace",
    component: Card,
    parameters: {
      layout: "fullscreen",
      docs: {
        description: {
          component:
            "Complete product screens assembled from the Nostos UI kit, faithful to the design references: sidebar layout, hierarchical tables, payouts & billing cards, and share modals."
        }
      }
    }
  });

  let picked = $state(new Set(["neom-bA32w6lebJg-unsplash.jpg"]));
  let shareTab = $state("Share");
  let invite = $state("");
  let day = $state(new Date(2023, 10, 21));
  let grid = $state("grid");

  // Application Layout State (Image 4)
  let sidebarCollapsed = $state(false);
  let activeNav = $state("overview");
  let viewMode = $state("Table");
  let paymentMethod = $state("bank");

  function toggle(name) {
    const next = new Set(picked);
    next.has(name) ? next.delete(name) : next.add(name);
    picked = next;
  }
</script>

<Story name="Team Application Layout">
  <div class="app-layout">
    <!-- Left Navigation Sidebar -->
    <Sidebar bind:collapsed={sidebarCollapsed}>
      <SidebarHeader
        logo="diamond"
        title="Workspace"
        subtitle="team.nostos.dev"
      >
        {#snippet action()}
          <button
            type="button"
            class="icon-btn"
            onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            <Icon name="sidebar-toggle" size={16} />
          </button>
        {/snippet}
      </SidebarHeader>

      <SidebarSearch placeholder="Search" shortcut="⌘K" />

      <SidebarNav>
        <SidebarItem
          icon="inbox"
          label="Inbox"
          badge={2}
          active={activeNav === "inbox"}
          onclick={() => (activeNav = "inbox")}
        />
        <SidebarItem
          icon="more-horizontal"
          label="More"
          active={activeNav === "more"}
          onclick={() => (activeNav = "more")}
        />

        <SidebarSection title="Spaces">
          {#snippet action()}
            <button type="button" aria-label="Add space"><Icon name="plus" size={13} /></button>
            <button type="button" aria-label="More options"><Icon name="more-horizontal" size={13} /></button>
          {/snippet}

          <SidebarItem
            icon="user"
            label="Personal"
            active={activeNav === "personal"}
            onclick={() => (activeNav = "personal")}
          />
          <SidebarItem
            icon="users"
            label="Team"
            active={activeNav === "overview"}
            onclick={() => (activeNav = "overview")}
          >
            {#snippet action()}
              <button type="button" aria-label="Space settings"><Icon name="settings" size={13} /></button>
            {/snippet}
          </SidebarItem>

          <SidebarItem
            icon="folder"
            label="Tools"
            collapsible
            open
          >
            {#snippet action()}
              <button type="button" aria-label="Add tool"><Icon name="plus" size={12} /></button>
            {/snippet}
            <SidebarItem
              icon="bar-chart"
              label="Analytics"
              depth={1}
              active={activeNav === "analytics"}
              onclick={() => (activeNav = "analytics")}
            />
            <SidebarItem
              icon="grid"
              label="Dashboard"
              depth={1}
              active={activeNav === "dashboard"}
              onclick={() => (activeNav = "dashboard")}
            />
          </SidebarItem>

          <SidebarItem
            icon="folder"
            label="Projects"
            collapsible
            open
          >
            {#snippet action()}
              <button type="button" aria-label="Add project"><Icon name="plus" size={12} /></button>
            {/snippet}
            <SidebarItem
              icon="file"
              label="Project"
              depth={1}
              active={activeNav === "project"}
              onclick={() => (activeNav = "project")}
            />
          </SidebarItem>
        </SidebarSection>
      </SidebarNav>

      <SidebarFooter
        user={{
          name: "Sienna Hewitt",
          email: "sienna@nostos.dev"
        }}
      >
        <SidebarItem icon="share-2" label="Shared with me" />
        <SidebarItem icon="diamond" label="Blueprints" />
      </SidebarFooter>
    </Sidebar>

    <!-- Main Content Area -->
    <main class="app-main">
      <!-- Team Page Header -->
      <header class="app-header">
        <div class="team-title-row">
          <div class="team-icon">
            <Icon name="users" size={18} />
          </div>
          <h1 class="team-heading">Team</h1>
        </div>

        <div class="team-meta-row">
          <span class="meta-item"><Icon name="users" size={14} /> Public</span>
          <span class="meta-divider">|</span>
          <span class="meta-item">2 members</span>
          <span class="meta-divider">|</span>
          <button type="button" class="meta-btn"><Icon name="bookmark" size={14} /> Add bookmark</button>
          <span class="meta-divider">|</span>
          <button type="button" class="meta-icon-btn"><Icon name="info" size={14} /></button>
          <button type="button" class="meta-icon-btn"><Icon name="settings" size={14} /></button>
          <button type="button" class="meta-icon-btn"><Icon name="more-horizontal" size={14} /></button>
        </div>
      </header>

      <!-- View Switcher Tabs -->
      <div class="view-tabs-bar">
        <Tabs
          items={[
            { value: "Table", label: "Table", icon: "table" },
            { value: "Board", label: "Board", icon: "board" },
            { value: "Chart", label: "Chart", icon: "bar-chart" },
            { value: "All", label: "All ∨" }
          ]}
          bind:value={viewMode}
          variant="pill"
        />
      </div>

      <!-- Hierarchical Table (Image 4) -->
      <div class="table-container">
        <Table bordered>
          <thead>
            <tr>
              <TableHeaderCell width="50px">#</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Assignee</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell muted>1</TableCell>
              <TableCell>
                <div class="tree-name">
                  <Icon name="chevron-down" size={13} class="tree-chevron" />
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>Project</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Jack Reed" />
                  <span>Jack Reed</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="accent" toneText>In Progress</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>2</TableCell>
              <TableCell>
                <div class="tree-name">
                  <Icon name="chevron-down" size={13} class="tree-chevron" />
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>Research</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Jack Reed" />
                  <span>Jack Reed</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="success" toneText>Completed</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>3</TableCell>
              <TableCell depth={1}>
                <div class="tree-name">
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>Stakeholder Research</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Jack Reed" />
                  <span>Jack Reed</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="success" toneText>Completed</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>4</TableCell>
              <TableCell depth={1}>
                <div class="tree-name">
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>User Research</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Jack Reed" />
                  <span>Jack Reed</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="success" toneText>Completed</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>5</TableCell>
              <TableCell>
                <div class="tree-name">
                  <Icon name="chevron-right" size={13} class="tree-chevron" />
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>Requirement Gathering</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Mary Shelley" presence="online" />
                  <span>Mary Shelley</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="warning" toneText>In Progress</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>6</TableCell>
              <TableCell>
                <div class="tree-name">
                  <Icon name="chevron-right" size={13} class="tree-chevron" />
                  <Icon name="file" size={15} class="tree-icon" />
                  <span>Initial Design</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Mary Shelley" presence="online" />
                  <span>Mary Shelley</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="purple" toneText>Planned</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell muted>7</TableCell>
              <TableCell>
                <div class="tree-name">
                  <Icon name="file" size={15} class="tree-icon" style="margin-inline-start: 17px" />
                  <span>Design Review</span>
                </div>
              </TableCell>
              <TableCell>
                <div class="assignee">
                  <Avatar size="xs" name="Anne Frank" />
                  <span>Anne Frank</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="dot" tone="warning" toneText>New</Badge>
              </TableCell>
            </TableRow>
          </tbody>

          {#snippet footer()}
            <Button size="sm" variant="outline" icon="plus">
              Add Item <Kbd size="xs">⌃N</Kbd>
            </Button>
          {/snippet}
        </Table>
      </div>
    </main>
  </div>
</Story>

<Story name="Payouts & Billing (Image 1)">
  <div style="padding: 32px; background: var(--ui-bg-canvas); min-height: 100vh; display: flex; flex-direction: column; gap: 24px;">
    <!-- Top Table: Payout History -->
    <div style="max-width: 680px">
      <Table bordered>
        <thead>
          <tr>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Payout method</TableHeaderCell>
            <TableHeaderCell>
              <span style="display:inline-flex; align-items:center; gap:4px">Status <Icon name="info" size={13} /></span>
            </TableHeaderCell>
            <TableHeaderCell sortable direction="desc">Amount</TableHeaderCell>
            <TableHeaderCell width="48px"></TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>
              <div style="display:flex; flex-direction:column">
                <span style="font-weight:var(--ui-label-weight)">14 May 2024</span>
                <span style="font-size:var(--ui-text-xs); color:var(--ui-fg-subtle)">#49504</span>
              </div>
            </TableCell>
            <TableCell>
              <div style="display:inline-flex; align-items:center; gap:8px">
                <Icon name="credit-card" size={16} />
                <span>•••• 8490</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="dot" tone="warning" toneText>Pending</Badge>
            </TableCell>
            <TableCell numeric style="font-weight:var(--ui-label-weight)">$150.54</TableCell>
            <TableCell align="end">
              <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="more-horizontal" label="Options" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <div style="display:flex; flex-direction:column">
                <span style="font-weight:var(--ui-label-weight)">28 Apr 2024</span>
                <span style="font-size:var(--ui-text-xs); color:var(--ui-fg-subtle)">#49503</span>
              </div>
            </TableCell>
            <TableCell>
              <div style="display:inline-flex; align-items:center; gap:8px">
                <Icon name="credit-card" size={16} />
                <span>•••• 8490</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="dot" tone="success" toneText>Paid</Badge>
            </TableCell>
            <TableCell numeric style="font-weight:var(--ui-label-weight)">$74.85</TableCell>
            <TableCell align="end">
              <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="more-horizontal" label="Options" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <div style="display:flex; flex-direction:column">
                <span style="font-weight:var(--ui-label-weight)">14 Apr 2024</span>
                <span style="font-size:var(--ui-text-xs); color:var(--ui-fg-subtle)">#49502</span>
              </div>
            </TableCell>
            <TableCell>
              <div style="display:inline-flex; align-items:center; gap:8px">
                <Icon name="credit-card" size={16} />
                <span>•••• 8490</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="dot" tone="success" toneText>Paid</Badge>
            </TableCell>
            <TableCell numeric style="font-weight:var(--ui-label-weight)">$163.50</TableCell>
            <TableCell align="end">
              <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="more-horizontal" label="Options" />
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>

    <!-- Bottom Row: Payout Details Breakdown + Payment Methods Card + Dropdown -->
    <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
      <!-- Payout Details Card -->
      <Card style="width: 320px;">
        <CardHeader title="Payout details">
          {#snippet action()}
            <button type="button" class="icon-btn" aria-label="Close"><Icon name="x" size={15} /></button>
          {/snippet}
        </CardHeader>
        <CardBody padding="sm">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <Badge tone="success" dot>Paid | #49503</Badge>
            <span style="font-size:var(--ui-text-xs); color:var(--ui-fg-muted)">28 Apr 2024</span>
            <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="more-horizontal" label="Options" />
          </div>

          <DataList leader>
            <DataListRow label="Earnings" value="$98.40" />
            <DataListRow label="Refunds" value="$0.00" />
            <DataListRow label="Tax" value="-$11.33" />
            <DataListRow label="Fees" value="-$12.22" />
            <DataListRow variant="sub" label="Payments" hint="Processor fees" value="-$7.74" />
            <DataListRow variant="sub" label="Payout" hint="Payout transfer fee" value="-$4.48" />
            <DataListRow variant="total" label="Payout total" value="$74.85" />
          </DataList>
        </CardBody>
      </Card>

      <!-- Payment Method Choices Panel -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        <Card style="width: 380px;">
          <OptionCard
            control="radio"
            name="payout-method"
            value="bank"
            variant="row"
            bind:group={paymentMethod}
            icon="credit-card"
            title="Bank account"
            description="•••• 8490"
          >
            {#snippet titleSlot()}
              <span>Bank account</span>
              <Icon name="check-circle" size={14} style="color:var(--ui-success-solid)" />
            {/snippet}
            {#snippet action()}
              <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="more-horizontal" label="Options" />
            {/snippet}
          </OptionCard>

          <Divider />

          <OptionCard
            control="radio"
            name="payout-method"
            value="paypal"
            variant="row"
            bind:group={paymentMethod}
            icon="paypal"
            title="Paypal"
            description="Connect your PayPal account"
          >
            {#snippet action()}
              <Button size="sm" variant="outline">Connect</Button>
            {/snippet}
          </OptionCard>
        </Card>

        <!-- Dropdown Menu Reference -->
        <Card style="width: 180px;" padding="xs">
          <MenuItem icon="receipt" trailingIcon="arrow-up-right">Receipt</MenuItem>
          <MenuItem icon="file" trailingIcon="arrow-up-right">Invoice</MenuItem>
        </Card>
      </div>
    </div>
  </div>
</Story>

<Story name="Share Modal (Image 2)">
  <div style="padding: 40px; background: var(--ui-bg-canvas); min-height: 100vh; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <Button variant="outline" icon="share">Share</Button>
    </div>

    <div style="width: 420px">
      <Card>
        <CardBody padding="md">
          <Tabs items={["Share", "Privacy", "Publishing", "Domain"]} bind:value={shareTab} variant="pill" block ariaLabel="Share settings">
            <TabPanel value="Share">
              <div class="stack">
                <div class="share">
                  <QrPlaceholder seed="admin-dashboard" size={72} />
                  <div class="share__link">
                    <Input value="admin-dashboard-8o2q..." readonly icon="lock" size="sm">
                      {#snippet end()}
                        <div class="flush ui-frame-flush">
                          <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="external-link" label="Open link" />
                          <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="pencil" label="Edit link" />
                        </div>
                      {/snippet}
                    </Input>
                    <Button block icon="link">Copy app link</Button>
                  </div>
                </div>

                <Divider />

                <Field label="Invite users" hint="We'll email them instructions and a magic link to sign in.">
                  {#snippet control({ id, describedBy })}
                    <Input {id} aria-describedby={describedBy} bind:value={invite} placeholder="info@pixsellz.io">
                      {#snippet end()}
                        <div class="flush ui-frame-flush">
                          <Button size="sm" variant="outline" tone="neutral">Send invite</Button>
                        </div>
                      {/snippet}
                    </Input>
                  {/snippet}
                </Field>

                <div class="invited-box">
                  <Avatar size="sm" name="Kuchkarov" presence="online" />
                  <span class="invited-email">kuchkarov@pixsellz.io</span>
                  <Badge variant="outline" icon="check">Invited</Badge>
                </div>

                <div class="links">
                  <Button variant="link" tone="accent" icon="link">Copy private invite link</Button>
                  <Button variant="link" tone="neutral" icon="trash">Remove link</Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="Privacy">
              <p class="prose">Choose who can discover this project and whether search engines may index it.</p>
            </TabPanel>
            <TabPanel value="Publishing">
              <p class="prose">Publish a snapshot to a public URL. Drafts stay private until you publish.</p>
            </TabPanel>
            <TabPanel value="Domain">
              <p class="prose">Connect a custom domain, or register one for $2.99 a year.</p>
            </TabPanel>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  </div>
</Story>

<style>
  .app-layout {
    display: flex;
    height: 100vh;
    background: var(--ui-bg-canvas);
    color: var(--ui-fg-default);
    overflow: hidden;
  }
  .app-main {
    flex: 1;
    overflow-y: auto;
    padding: 32px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .app-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .team-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .team-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--ui-radius-lg);
    background: var(--ui-accent-soft);
    color: var(--ui-accent-solid);
  }
  .team-heading {
    margin: 0;
    font-size: 24px;
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-tight);
  }
  .team-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-muted);
  }
  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .meta-divider {
    color: var(--ui-border-default);
  }
  .meta-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    font: inherit;
    color: var(--ui-fg-muted);
    cursor: pointer;
  }
  .meta-btn:hover {
    color: var(--ui-fg-default);
  }
  .meta-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: var(--ui-radius-sm);
    background: none;
    border: none;
    color: var(--ui-fg-muted);
    cursor: pointer;
  }
  .meta-icon-btn:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .view-tabs-bar {
    display: flex;
    align-items: center;
  }
  .table-container {
    background: var(--ui-bg-surface);
    border-radius: var(--ui-radius-2xl);
  }
  .tree-name {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: var(--ui-label-weight);
  }
  :global(.tree-chevron) {
    color: var(--ui-fg-subtle);
  }
  :global(.tree-icon) {
    color: var(--ui-fg-muted);
  }
  .assignee {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 4px;
    border-radius: var(--ui-radius-sm);
    color: var(--ui-fg-muted);
    cursor: pointer;
  }
  .icon-btn:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .share {
    display: flex;
    gap: 14px;
    align-items: stretch;
  }
  .share__link {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }
  .flush {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-inline-end: 4px;
  }
  .invited-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: var(--ui-radius-lg);
    background: var(--ui-bg-sunken);
  }
  .invited-email {
    flex: 1;
    min-width: 0;
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-label-weight);
    color: var(--ui-fg-default);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .prose {
    margin: 0;
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
</style>
