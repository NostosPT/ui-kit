<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dropzone from "./Dropzone.svelte";
  import FileUpload from "./FileUpload.svelte";
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
            "File drop target and upload input. Supports full-area drag-and-drop zone and compact single-line FileUpload bar."
        }
      }
    }
  });

  let dropped = $state([]);
  let barFiles = $state([]);
</script>

<Story name="Dropzone" asChild>
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

<Story name="FileUpload bar" asChild>
  <Showcase width="440px" gap={20}>
    <Spec label="single" align="stretch">
      <div style="flex:1">
        <FileUpload bind:files={barFiles} placeholder="Drop file here or browse…" />
      </div>
    </Spec>

    <Spec label="disabled" align="stretch">
      <div style="flex:1">
        <FileUpload disabled placeholder="Upload disabled" />
      </div>
    </Spec>
  </Showcase>
</Story>
