<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import TagInput from "./TagInput.svelte";
  import Field from "../Field/Field.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/TagInput",
    component: TagInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Input for collecting tags and tokens. Supports keyboard deletion with Backspace, duplicate prevention, and drag-and-drop badge reordering."
        }
      }
    }
  });

  let users = $state(["Jack", "Ann"]);
</script>

<Story name="Overview" asChild>
  <Showcase width="380px">
    <Spec label="users" align="start">
      <TagInput bind:value={users} placeholder="Add a teammate" max={3} />
    </Spec>
    <Spec label="accent" align="start">
      <TagInput value={["design", "frontend"]} tone="accent" placeholder="Add a label" />
    </Spec>
    <Spec label="empty" align="start">
      <TagInput value={[]} placeholder="Type and press Enter" />
    </Spec>
    <Spec label="field" align="start">
      <Field label="Users" hint="Select up to 3 users.">
        {#snippet control({ id, describedBy })}
          <TagInput {id} aria-describedby={describedBy} bind:value={users} max={3} />
        {/snippet}
      </Field>
    </Spec>
  </Showcase>
</Story>
