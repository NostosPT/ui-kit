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

<Story name="Filters" asChild>
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
            Any content works here — Popover handles anchoring, viewport collisions, outside-clicks, and Escape key.
          </p>
        </div>
      {/snippet}
    </Popover>
  </div>
</Story>
