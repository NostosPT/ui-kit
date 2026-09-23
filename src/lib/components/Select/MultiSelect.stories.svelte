<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MultiSelect from "./MultiSelect.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/MultiSelect",
    component: MultiSelect,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Multi-value selection component rendering tags/chips inside the control frame, supporting drag-and-drop badge reordering and multiple badge variants."
        }
      }
    }
  });

  const categories = [
    { value: "auto", label: "Auto", icon: "car" },
    { value: "food", label: "Food", icon: "pizza" },
    { value: "travel", label: "Travel", icon: "globe" }
  ];

  const tags = [
    { value: "design-system", label: "Design System", tone: "accent", variant: "soft" },
    { value: "ui-kit", label: "UI Kit", tone: "accent", variant: "soft" },
    { value: "svelte", label: "Svelte 5", tone: "accent", variant: "soft" }
  ];

  let selectedCats = $state(["auto", "food"]);
  let selectedTags = $state(["design-system", "ui-kit"]);
</script>

<Story name="Overview" asChild>
  <div style="width: 420px; padding-bottom: 220px">
    <Showcase>
      <Spec label="solid pills" align="stretch" gutter={54}>
        <div style="flex:1">
          <MultiSelect
            options={categories}
            bind:value={selectedCats}
            badgeTone="accent"
            badgeVariant="solid"
            ariaLabel="Solid category chips"
          />
        </div>
      </Spec>
      <Spec label="soft outline" align="stretch" gutter={54}>
        <div style="flex:1">
          <MultiSelect
            options={tags}
            bind:value={selectedTags}
            badgeTone="accent"
            badgeVariant="soft"
            ariaLabel="Soft tag chips"
          />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>
