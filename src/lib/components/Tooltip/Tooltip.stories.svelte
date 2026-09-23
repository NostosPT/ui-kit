<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tooltip from "./Tooltip.svelte";
  import Button from "../Button/Button.svelte";
  import ButtonGroup from "../ButtonGroup/ButtonGroup.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    args: {
      content: "Tooltip label",
      placement: "top-center",
      delay: 350
    },
    argTypes: {
      placement: {
        control: "select",
        options: [
          "top-center",
          "top-start",
          "top-end",
          "bottom-center",
          "bottom-start",
          "bottom-end",
          "left-center",
          "right-center"
        ]
      },
      delay: { control: "number" },
      disabled: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Hover and focus label for icon-only and compact controls. Supports warm-start delay skipping when scanning across consecutive elements, with directional micro-motion entrance."
        }
      }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="padding: 60px 0; display: flex; justify-content: center;">
      <Tooltip {...args}>
        <Button variant="outline" icon="info">Hover or focus me</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Placements" asChild>
  <div style="padding: 60px 0">
    <Showcase>
      <Spec label="top & bottom">
        <Tooltip content="Top start" placement="top-start"><Button variant="outline" size="sm">Top start</Button></Tooltip>
        <Tooltip content="Top center" placement="top-center"><Button variant="outline" size="sm">Top center</Button></Tooltip>
        <Tooltip content="Top end" placement="top-end"><Button variant="outline" size="sm">Top end</Button></Tooltip>
        <Tooltip content="Bottom start" placement="bottom-start"><Button variant="outline" size="sm">Bottom start</Button></Tooltip>
        <Tooltip content="Bottom center" placement="bottom-center"><Button variant="outline" size="sm">Bottom center</Button></Tooltip>
        <Tooltip content="Bottom end" placement="bottom-end"><Button variant="outline" size="sm">Bottom end</Button></Tooltip>
      </Spec>
      <Spec label="sides">
        <Tooltip content="Left center" placement="left-center"><Button variant="outline" size="sm">Left center</Button></Tooltip>
        <Tooltip content="Right center" placement="right-center"><Button variant="outline" size="sm">Right center</Button></Tooltip>
      </Spec>
      <Spec label="multiline">
        <Tooltip content="Tax is calculated once a billing address is added to the account.">
          <Button variant="ghost" iconOnly icon="info" label="About tax" />
        </Tooltip>
      </Spec>
    </Showcase>
  </div>
</Story>

<Story name="Scanning Warm-Start" asChild>
  <div style="padding: 40px 0">
    <p style="margin: 0 0 12px; font-size: var(--ui-text-sm); color: var(--ui-fg-muted);">
      Hover the first button and wait 350ms for the tooltip. Then slide your mouse across the adjacent buttons — tooltips appear instantly without delay (warm-start scanning).
    </p>
    <ButtonGroup>
      <Tooltip content="Edit document">
        <Button variant="outline" iconOnly icon="pencil" label="Edit document" />
      </Tooltip>
      <Tooltip content="Duplicate item">
        <Button variant="outline" iconOnly icon="copy" label="Duplicate item" />
      </Tooltip>
      <Tooltip content="Attach file">
        <Button variant="outline" iconOnly icon="paperclip" label="Attach file" />
      </Tooltip>
      <Tooltip content="Download archive">
        <Button variant="outline" iconOnly icon="download" label="Download archive" />
      </Tooltip>
      <Tooltip content="Delete permanently">
        <Button variant="outline" tone="danger" iconOnly icon="trash" label="Delete permanently" />
      </Tooltip>
    </ButtonGroup>
  </div>
</Story>
