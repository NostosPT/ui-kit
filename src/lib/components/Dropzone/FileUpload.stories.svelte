<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import FileUpload from "./FileUpload.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/FileUpload",
    component: FileUpload,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Single-line compact file upload bar with inline attachment icon, drag-and-drop target, and browse button matching the design reference."
        }
      }
    }
  });

  let barFiles = $state([]);
</script>

<Story name="Overview" asChild>
  <Showcase width="440px" gap={20}>
    <Spec label="default" align="stretch">
      <div style="flex:1">
        <FileUpload bind:files={barFiles} placeholder="Drop file(s) here..." browseLabel="Browse" />
      </div>
    </Spec>

    <Spec label="disabled" align="stretch">
      <div style="flex:1">
        <FileUpload disabled placeholder="Upload disabled" />
      </div>
    </Spec>
  </Showcase>
</Story>
