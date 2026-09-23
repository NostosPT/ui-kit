<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Select from "./Select.svelte";
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
            "Native select picker wrapped in InputFrame, offering platform-native selection ergonomics for mobile and desktop."
        }
      }
    }
  });

  const categories = [
    { value: "auto", label: "Auto", icon: "car" },
    { value: "food", label: "Food", icon: "pizza" },
    { value: "travel", label: "Travel", icon: "globe" }
  ];

  let nativeVal = $state("auto");
</script>

<Story name="Overview" asChild>
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
      <Spec label="sizes" align="stretch">
        <div style="display:flex; flex-direction:column; gap:12px; width:100%">
          <Select size="sm" options={categories} value="auto" />
          <Select size="md" options={categories} value="auto" />
          <Select size="lg" options={categories} value="auto" />
        </div>
      </Spec>
      <Spec label="disabled" align="stretch">
        <div style="flex:1">
          <Select options={categories} value="auto" disabled />
        </div>
      </Spec>
    </Showcase>
  </div>
</Story>
