<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dropzone from "./Dropzone.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Dropzone",
    component: Dropzone,
    tags: ["autodocs"],
    args: {
      variant: "card",
      multiple: true
    },
    argTypes: {
      variant: { control: "inline-radio", options: ["card", "inline"] },
      multiple: { control: "boolean" },
      disabled: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Drag-and-drop file target area with card and inline layout variants."
        }
      }
    }
  });

  let dropped = $state([]);
</script>

<Story name="Overview" asChild>
  <Showcase width="440px" gap={24}>
    <Spec label="card" align="stretch">
      <div style="flex:1">
        <Dropzone onfiles={(f) => (dropped = f)} />
      </div>
    </Spec>

    <Spec label="inline" align="stretch">
      <div style="flex:1">
        <Dropzone variant="inline" onfiles={(f) => (dropped = f)} />
      </div>
    </Spec>

    <Spec label="dropped">
      <span style="font-size: var(--ui-text-sm); color: var(--ui-fg-muted)">
        {dropped.length ? dropped.map((f) => f.name).join(", ") : "Nothing dropped yet"}
      </span>
    </Spec>
  </Showcase>
</Story>
