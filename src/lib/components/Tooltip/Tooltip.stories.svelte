<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tooltip from "./Tooltip.svelte";
  import Button from "../Button/Button.svelte";
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
            "Hover and focus label for icon-only and compact controls. Supports warm-start delay skipping when scanning across consecutive elements."
        }
      }
    }
  });
</script>

<Story name="Placements" asChild>
  <div style="padding: 60px 0">
    <Showcase>
      <Spec label="sides">
        <Tooltip content="Top" placement="top-center"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip content="Bottom" placement="bottom-center"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip content="Left" placement="left-center"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip content="Right" placement="right-center"><Button variant="outline">Right</Button></Tooltip>
      </Spec>
      <Spec label="icons">
        <Tooltip content="Download original"><Button variant="ghost" iconOnly icon="download" label="Download" /></Tooltip>
        <Tooltip content="Copy share link"><Button variant="ghost" iconOnly icon="link" label="Copy link" /></Tooltip>
        <Tooltip content="Move to trash"><Button variant="ghost" tone="danger" iconOnly icon="trash" label="Delete" /></Tooltip>
      </Spec>
      <Spec label="multiline">
        <Tooltip content="Tax is calculated once a billing address is added to the account.">
          <Button variant="ghost" iconOnly icon="info" label="About tax" />
        </Tooltip>
      </Spec>
    </Showcase>
  </div>
</Story>
