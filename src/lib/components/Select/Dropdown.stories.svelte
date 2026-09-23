<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dropdown from "./Dropdown.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Rich single-select dropdown supporting leading avatars, country flags, and icons with search filtering."
        }
      }
    }
  });

  const categories = [
    { value: "auto", label: "Auto", icon: "car" },
    { value: "food", label: "Food", icon: "pizza" },
    { value: "travel", label: "Travel", icon: "globe" }
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

  let userVal = $state("jane");
  let countryVal = $state("uz");
  let catVal = $state("auto");
</script>

<Story name="Overview" asChild>
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
          <Dropdown options={categories} bind:value={catVal} ariaLabel="Category selector" />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>
