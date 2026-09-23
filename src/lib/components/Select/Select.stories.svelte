<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Select from "./Select.svelte";
  import Dropdown from "./Dropdown.svelte";
  import MultiSelect from "./MultiSelect.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Select and Combobox family: native Select for system pickers, rich Dropdown for single-select with avatars, flags and icons, and MultiSelect with draggable reorderable chips matching the reference design."
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

  const users = [
    {
      value: "jane",
      label: "Jane Brown",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    {
      value: "jack",
      label: "Jack",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    }
  ];

  const countries = [
    { value: "uz", label: "Uzbekistan (+998)", flag: "🇺🇿" },
    { value: "us", label: "United States (+1)", flag: "🇺🇸" },
    { value: "pt", label: "Portugal (+351)", flag: "🇵🇹" }
  ];

  let nativeVal = $state("auto");
  let userVal = $state("jane");
  let countryVal = $state("uz");
  let selectedCats = $state(["auto", "food"]);
  let selectedTags = $state(["design-system", "ui-kit"]);
</script>

<Story name="Dropdown Rich Single Select" asChild>
  <div style="width: 380px; padding-bottom: 220px">
    <Showcase>
      <Spec label="avatar" align="stretch" gutter={54}>
        <div style="flex:1">
          <Dropdown options={users} bind:value={userVal} ariaLabel="User selector" />
        </div>
      </Spec>
      <Spec label="flag" align="stretch" gutter={54}>
        <div style="flex:1">
          <Dropdown options={countries} bind:value={countryVal} ariaLabel="Country selector" />
        </div>
      </Spec>
      <Spec label="icon" align="stretch" gutter={54}>
        <div style="flex:1">
          <Dropdown options={categories} bind:value={nativeVal} ariaLabel="Category selector" />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>

<Story name="MultiSelect Draggable Chips" asChild>
  <div style="width: 420px; padding-bottom: 220px">
    <Showcase>
      <Spec label="solid pills" align="stretch" gutter={54}>
        <div style="flex:1">
          <MultiSelect
            options={categories}
            bind:value={selectedCats}
            badgeTone="accent"
            badgeVariant="solid"
            ariaLabel="Solid category badges"
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
            ariaLabel="Soft tag badges"
          />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>

<Story name="Native Select" asChild>
  <div style="width: 340px">
    <Showcase>
      <Spec label="default" align="stretch">
        <div style="flex:1">
          <Select options={categories} bind:value={nativeVal} />
        </div>
      </Spec>
      <Spec label="with icon" align="stretch">
        <div style="flex:1">
          <Select options={categories} icon="car" bind:value={nativeVal} />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>
