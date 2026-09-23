<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Field from "./Field.svelte";
  import Input from "../Input/Input.svelte";
  import Textarea from "../Textarea/Textarea.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Field",
    component: Field,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Form field scaffolding providing label, info tooltip, helper hint, and error message wiring with automated accessible aria-describedby associations."
        }
      }
    }
  });
</script>

<Story name="Overview" asChild>
  <Showcase width="400px" gap={24}>
    <Field label="Work email" hint="We'll send your login instructions here.">
      {#snippet control({ id, describedBy })}
        <Input {id} aria-describedby={describedBy} placeholder="alex@company.com" />
      {/snippet}
    </Field>

    <Field label="Password" required error="Password must be at least 8 characters.">
      {#snippet control({ id, describedBy, invalid })}
        <Input {id} aria-describedby={describedBy} {invalid} type="password" value="secret" />
      {/snippet}
    </Field>

    <Field label="Category" info="Category selector used for catalog filtering">
      {#snippet control({ id })}
        <Input {id} placeholder="e.g. Technology" />
      {/snippet}
    </Field>

    <Field label="Notes" optional>
      {#snippet control({ id })}
        <Textarea {id} placeholder="Optional notes for the team…" />
      {/snippet}
    </Field>
  </Showcase>
</Story>

<Story name="Horizontal" asChild>
  <Showcase width="480px" gap={20}>
    <Field label="Display name" orientation="horizontal">
      {#snippet control({ id })}
        <Input {id} placeholder="Alex Morgan" />
      {/snippet}
    </Field>
    <Field label="Bio" orientation="horizontal" hint="Brief summary for your profile">
      {#snippet control({ id, describedBy })}
        <Textarea {id} aria-describedby={describedBy} placeholder="Tell us about yourself…" />
      {/snippet}
    </Field>
  </Showcase>
</Story>
