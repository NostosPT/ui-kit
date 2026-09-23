<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import EmptyState from "./EmptyState.svelte";
  import Button from "../Button/Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";

  const { Story } = defineMeta({
    title: "Data Display/EmptyState",
    component: EmptyState,
    tags: ["autodocs"],
    args: {
      title: "No files yet",
      description: "Drop files here or browse your computer to get started.",
      icon: "folder",
      bordered: true,
      size: "md"
    },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      bordered: { control: "boolean" },
      icon: { control: "text" },
      title: { control: "text" },
      description: { control: "text" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Placeholder when a list, table or workspace contains no items. Supports bordered frame, icon, title, description, and action button snippet."
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <Showcase width="480px" gap={20}>
    <EmptyState
      bordered
      icon="folder"
      title="No files yet"
      description="Drop files here or browse your computer to get started."
    >
      {#snippet actions()}
        <Button icon="upload">Upload files</Button>
        <Button variant="outline">Import from URL</Button>
      {/snippet}
    </EmptyState>

    <EmptyState
      size="sm"
      icon="search"
      title="No matching orders"
      description="Try a different search or clear your filters."
    />
  </Showcase>
</Story>
