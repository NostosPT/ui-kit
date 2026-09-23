<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Listbox from "./Listbox.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";
  import { PEOPLE } from "../../../stories/util/data.js";

  const OWNERS = PEOPLE.slice(0, 5).map((p) => ({
    value: p.name.toLowerCase().split(" ")[0],
    label: p.name,
    name: p.name,
    description: p.email
  }));

  const { Story } = defineMeta({
    title: "Forms/Listbox",
    component: Listbox,
    tags: ["autodocs"],
    args: {
      options: OWNERS,
      placeholder: "Assign to…"
    },
    argTypes: {
      searchable: { control: "boolean" },
      disabled: { control: "boolean" },
      invalid: { control: "boolean" },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Rich single-select combobox supporting secondary descriptions, avatars, type-ahead, and keyboard navigation according to the ARIA combobox pattern."
        }
      }
    }
  });

  let owner = $state("jane");
  let searched = $state(undefined);
</script>

<Story name="Standard" asChild>
  <div style="width: 320px; padding-bottom: 240px">
    <Showcase>
      <Spec label="rich" align="stretch" gutter={54}>
        <div style="flex:1"><Listbox bind:value={owner} options={OWNERS} ariaLabel="Owner" /></div>
      </Spec>
      <Spec label="search" align="stretch" gutter={54}>
        <div style="flex:1"><Listbox bind:value={searched} options={OWNERS} searchable placeholder="Search teammate…" ariaLabel="Assignee" /></div>
      </Spec>
    </Showcase>
  </div>
</Story>
