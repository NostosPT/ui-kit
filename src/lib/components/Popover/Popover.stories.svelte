<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Popover from "./Popover.svelte";
  import Button from "../Button/Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Popover",
    component: Popover,
    tags: ["autodocs"],
    args: {
      placement: "bottom-start",
      offset: 6,
      closeOnOutside: true,
      closeOnEscape: true
    },
    argTypes: {
      placement: {
        control: "select",
        options: [
          "bottom-start",
          "bottom-end",
          "bottom-center",
          "top-start",
          "top-end",
          "top-center",
          "left-start",
          "left-end",
          "right-start",
          "right-end"
        ]
      },
      offset: { control: "number" },
      closeOnOutside: { control: "boolean" },
      closeOnEscape: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Anchored floating surface. Handles positioning, track anchoring, outside-click and Escape key dismissal."
        }
      }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="padding: 60px 0 180px; display: flex; justify-content: center;">
      <Popover {...args}>
        {#snippet trigger({ toggle, open })}
          <Button variant="outline" icon="sliders" trailingIcon="chevron-down" onclick={toggle} aria-expanded={open}>
            Display options
          </Button>
        {/snippet}
        {#snippet children({ close })}
          <div style="padding: 12px 14px; width: 260px">
            <p style="margin: 0 0 6px; font-size: var(--ui-text-md); font-weight: 600">View settings</p>
            <p style="margin: 0 0 12px; font-size: var(--ui-text-sm); color: var(--ui-fg-muted); line-height: 1.5">
              Directional entrance motion aligns to the anchor trigger.
            </p>
            <div style="display: flex; justify-content: flex-end; gap: 8px">
              <Button size="sm" variant="ghost" tone="neutral" onclick={close}>Cancel</Button>
              <Button size="sm" onclick={close}>Apply</Button>
            </div>
          </div>
        {/snippet}
      </Popover>
    </div>
  {/snippet}
</Story>

<Story name="Placements" asChild>
  <div style="padding: 120px 40px; display: grid; grid-template-columns: repeat(3, max-content); gap: 24px; justify-content: center; align-items: center;">
    <Popover placement="top-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>top-start</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Top-start content</div>
      {/snippet}
    </Popover>

    <Popover placement="top-center">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>top-center</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Top-center content</div>
      {/snippet}
    </Popover>

    <Popover placement="top-end">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>top-end</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Top-end content</div>
      {/snippet}
    </Popover>

    <Popover placement="left-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>left-start</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Left-start content</div>
      {/snippet}
    </Popover>

    <div style="text-align: center; font-size: var(--ui-text-xs); color: var(--ui-fg-muted)">
      Click any button to inspect anchor & micro-motion
    </div>

    <Popover placement="right-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>right-start</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Right-start content</div>
      {/snippet}
    </Popover>

    <Popover placement="bottom-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>bottom-start</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Bottom-start content</div>
      {/snippet}
    </Popover>

    <Popover placement="bottom-center">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>bottom-center</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Bottom-center content</div>
      {/snippet}
    </Popover>

    <Popover placement="bottom-end">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" size="sm" onclick={toggle} aria-expanded={open}>bottom-end</Button>
      {/snippet}
      {#snippet children()}
        <div style="padding: 10px 14px; font-size: var(--ui-text-sm)">Bottom-end content</div>
      {/snippet}
    </Popover>
  </div>
</Story>

<Story name="Filters" asChild>
  <div style="padding: 20px 0 240px">
    <Popover placement="bottom-start">
      {#snippet trigger({ toggle, open })}
        <Button variant="outline" icon="sliders" trailingIcon="chevron-down" onclick={toggle} aria-expanded={open}>
          Filters
        </Button>
      {/snippet}
      {#snippet children({ close })}
        <div style="padding: 12px 14px; width: 260px">
          <p style="margin:0 0 6px; font-size: var(--ui-text-md); font-weight: 600">Filter orders</p>
          <p style="margin:0 0 12px; font-size: var(--ui-text-sm); color: var(--ui-fg-muted); line-height:1.5">
            Any content works here — Popover handles anchoring, viewport collisions, outside-clicks, and Escape key.
          </p>
          <div style="display: flex; justify-content: flex-end; gap: 8px">
            <Button size="sm" variant="outline" onclick={close}>Reset</Button>
            <Button size="sm" onclick={close}>Apply</Button>
          </div>
        </div>
      {/snippet}
    </Popover>
  </div>
</Story>
