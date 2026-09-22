<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Sidebar from "./Sidebar.svelte";
  import SidebarHeader from "./SidebarHeader.svelte";
  import SidebarSearch from "./SidebarSearch.svelte";
  import SidebarNav from "./SidebarNav.svelte";
  import SidebarSection from "./SidebarSection.svelte";
  import SidebarItem from "./SidebarItem.svelte";
  import SidebarFooter from "./SidebarFooter.svelte";
  import Button from "../Button/Button.svelte";
  import Icon from "../Icon/Icon.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    parameters: {
      layout: "fullscreen",
      docs: {
        description: {
          component:
            "Modern application sidebar supporting expanded navigation and collapsible mini-rail mode, hierarchical tree structures, badges, and user profile footer."
        }
      }
    }
  });

  let activeItem = $state("overview");
  let collapsed = $state(false);
  let toolsOpen = $state(true);
  let projectsOpen = $state(true);
</script>

<Story name="Expanded Workspace">
  <div style="height: 100vh; display: flex; background: var(--ui-bg-canvas);">
    <Sidebar bind:collapsed>
      <SidebarHeader
        title="Nostos Team"
        subtitle="team.nostos.dev"
        logo="diamond"
      >
        {#snippet action()}
          <button
            type="button"
            class="header-action"
            onclick={() => (collapsed = !collapsed)}
            aria-label="Toggle sidebar"
          >
            <Icon name="sidebar-toggle" size={16} />
          </button>
        {/snippet}
      </SidebarHeader>

      <SidebarSearch placeholder="Search…" shortcut="⌘K" />

      <SidebarNav>
        <SidebarItem
          icon="inbox"
          label="Inbox"
          badge={2}
          active={activeItem === "inbox"}
          onclick={() => (activeItem = "inbox")}
        />
        <SidebarItem
          icon="more-horizontal"
          label="More"
          active={activeItem === "more"}
          onclick={() => (activeItem = "more")}
        />

        <SidebarSection title="Spaces">
          {#snippet action()}
            <button type="button" aria-label="Add space"><Icon name="plus" size={14} /></button>
            <button type="button" aria-label="More options"><Icon name="more-horizontal" size={14} /></button>
          {/snippet}

          <SidebarItem
            icon="user"
            label="Personal"
            active={activeItem === "personal"}
            onclick={() => (activeItem = "personal")}
          />
          <SidebarItem
            icon="users"
            label="Team"
            active={activeItem === "overview"}
            onclick={() => (activeItem = "overview")}
          >
            {#snippet action()}
              <button type="button" aria-label="Settings"><Icon name="settings" size={13} /></button>
            {/snippet}
          </SidebarItem>

          <SidebarItem
            icon="folder"
            label="Tools"
            collapsible
            bind:open={toolsOpen}
          >
            {#snippet action()}
              <button type="button" aria-label="Add tool"><Icon name="plus" size={12} /></button>
            {/snippet}
            <SidebarItem
              icon="bar-chart"
              label="Analytics"
              depth={1}
              active={activeItem === "analytics"}
              onclick={() => (activeItem = "analytics")}
            />
            <SidebarItem
              icon="grid"
              label="Dashboard"
              depth={1}
              active={activeItem === "dashboard"}
              onclick={() => (activeItem = "dashboard")}
            />
          </SidebarItem>

          <SidebarItem
            icon="folder"
            label="Projects"
            collapsible
            bind:open={projectsOpen}
          >
            {#snippet action()}
              <button type="button" aria-label="Add project"><Icon name="plus" size={12} /></button>
            {/snippet}
            <SidebarItem
              icon="file"
              label="Project Design"
              depth={1}
              active={activeItem === "project"}
              onclick={() => (activeItem = "project")}
            />
          </SidebarItem>
        </SidebarSection>
      </SidebarNav>

      <SidebarFooter
        user={{
          name: "Sienna Hewitt",
          email: "sienna@nostos.dev",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
        }}
      >
        <SidebarItem icon="share-2" label="Shared with me" />
        <SidebarItem icon="diamond" label="Blueprints" />
      </SidebarFooter>
    </Sidebar>

    <div style="flex: 1; padding: 32px; overflow-y: auto;">
      <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 8px;">Workspace Content</h2>
      <p style="color: var(--ui-fg-muted); margin-bottom: 16px;">Active section: <strong>{activeItem}</strong></p>
      <Button variant="outline" onclick={() => (collapsed = !collapsed)}>
        Toggle Sidebar ({collapsed ? "Mini Rail" : "Expanded"})
      </Button>
    </div>
  </div>
</Story>

<Story name="Mini Rail">
  <div style="height: 100vh; display: flex; background: var(--ui-bg-canvas);">
    <Sidebar collapsed>
      <SidebarHeader logo="diamond" />
      <SidebarSearch placeholder="Search…" />
      <SidebarNav>
        <SidebarItem icon="inbox" label="Inbox" badge={2} active />
        <SidebarItem icon="file" label="Tasks" />
        <SidebarItem icon="folder" label="Documents" />
        <SidebarItem icon="calendar" label="Schedule" />
        <SidebarItem icon="bar-chart" label="Analytics" />
      </SidebarNav>
      <SidebarFooter
        user={{
          name: "Sienna Hewitt",
          email: "sienna@nostos.dev"
        }}
      >
        <SidebarItem icon="settings" label="Settings" />
      </SidebarFooter>
    </Sidebar>

    <div style="flex: 1; padding: 32px;">
      <h2 style="font-size: 22px; font-weight: bold;">Mini-Rail Sidebar View</h2>
      <p style="color: var(--ui-fg-muted);">In mini-rail mode, items display clean centered glyphs with automatic tooltips on hover.</p>
    </div>
  </div>
</Story>

<style>
  .header-action {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 6px;
    border-radius: var(--ui-radius-sm);
    color: var(--ui-fg-muted);
    cursor: pointer;
  }
  .header-action:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
</style>
