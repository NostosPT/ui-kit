<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Menu from "./Menu.svelte";
  import ContextMenu from "./ContextMenu.svelte";
  import MenuItem from "./MenuItem.svelte";
  import MenuSeparator from "./MenuSeparator.svelte";
  import MenuLabel from "./MenuLabel.svelte";
  import Button from "../Button/Button.svelte";
  import ButtonGroup from "../ButtonGroup/ButtonGroup.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Menu",
    component: Menu,
    tags: ["autodocs"],
    args: { placement: "bottom-end" },
    argTypes: {
      placement: {
        control: "select",
        options: [
          "bottom-start", "bottom-end", "bottom-center",
          "top-start", "top-end",
          "right-start", "left-start"
        ]
      }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Popover plus the menu keyboard contract: arrows, Home/End, first-letter typeahead, Enter/Space, and Tab to dismiss. The trigger is a snippet rather than a wrapper element, so it keeps its place in your flex or grid layout."
        }
      }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="padding: 60px 0; display:flex; justify-content:center">
      <Menu {...args}>
        {#snippet trigger({ toggle, open })}
          <Button variant="outline" iconOnly icon="more-horizontal" label="More" onclick={toggle} aria-expanded={open} />
        {/snippet}
        {#snippet children({ close })}
          <MenuItem icon="pencil" {close}>Rename</MenuItem>
          <MenuItem icon="copy" shortcut="⌘D" {close}>Duplicate</MenuItem>
          <MenuItem icon="download" {close}>Download</MenuItem>
          <MenuSeparator />
          <MenuItem icon="trash" tone="danger" {close}>Delete</MenuItem>
        {/snippet}
      </Menu>
    </div>
  {/snippet}
</Story>

<Story name="Sections" asChild>
  <div style="padding: 20px 0 220px">
    <Showcase>
      <Spec label="grouped">
        <Menu placement="bottom-start">
          {#snippet trigger({ toggle, open })}
            <Button variant="outline" trailingIcon="chevron-down" onclick={toggle} aria-expanded={open}>
              Actions
            </Button>
          {/snippet}
          {#snippet children({ close })}
            <MenuLabel>This file</MenuLabel>
            <MenuItem icon="eye" {close}>Preview</MenuItem>
            <MenuItem icon="pencil" {close}>Rename</MenuItem>
            <MenuItem icon="share" {close}>Share…</MenuItem>
            <MenuSeparator />
            <MenuLabel>Export</MenuLabel>
            <MenuItem icon="download" shortcut="⌘E" {close}>Download original</MenuItem>
            <MenuItem icon="file" disabled {close}>Export as PDF</MenuItem>
            <MenuSeparator />
            <MenuItem icon="trash" tone="danger" {close}>Move to trash</MenuItem>
          {/snippet}
        </Menu>
      </Spec>

      <Spec label="selection">
        <Menu placement="bottom-start">
          {#snippet trigger({ toggle, open })}
            <Button variant="outline" icon="sliders" trailingIcon="chevron-down" onclick={toggle} aria-expanded={open}>
              Sort
            </Button>
          {/snippet}
          {#snippet children({ close })}
            <MenuItem selected {close}>Newest first</MenuItem>
            <MenuItem {close}>Oldest first</MenuItem>
            <MenuItem {close}>Name A–Z</MenuItem>
            <MenuItem {close}>Largest</MenuItem>
          {/snippet}
        </Menu>
      </Spec>

      <Spec label="in a group">
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
      </Spec>
    </Showcase>
  </div>
</Story>

<Story name="ContextMenu" asChild>
  <div style="padding: 40px 0; display: flex; justify-content: center">
    <ContextMenu>
      {#snippet trigger()}
        <div
          style="
            width: 380px;
            height: 180px;
            border: 2px dashed var(--ui-border-strong);
            border-radius: var(--ui-radius-xl);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            user-select: none;
            background: var(--ui-bg-surface);
            color: var(--ui-fg-muted);
            cursor: context-menu;
          "
        >
          <span style="font-weight: var(--ui-weight-medium); color: var(--ui-fg-default)">Right-click anywhere in this zone</span>
          <span style="font-size: var(--ui-text-sm)">Opens the menu at the exact mouse cursor position</span>
        </div>
      {/snippet}
      {#snippet children({ close })}
        <MenuItem icon="pencil" {close}>Rename</MenuItem>
        <MenuItem icon="copy" shortcut="⌘D" {close}>Duplicate</MenuItem>
        <MenuItem icon="download" {close}>Download</MenuItem>
        <MenuSeparator />
        <MenuItem icon="trash" tone="danger" {close}>Delete</MenuItem>
      {/snippet}
    </ContextMenu>
  </div>
</Story>
