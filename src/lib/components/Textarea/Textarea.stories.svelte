<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Textarea from "./Textarea.svelte";
  import Field from "../Field/Field.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Textarea",
    component: Textarea,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Multi-line text input with custom rounded drag-resize handle, optional autogrow, character limit tracking, and seamless Field scaffolding integration."
        }
      }
    }
  });

  let messageValue = $state("");
  let countValue = $state("Initial note text");
</script>

<Story name="Overview" asChild>
  <Showcase width="440px">
    <Spec label="default" align="start">
      <Textarea placeholder="Write a message…" />
    </Spec>
    <Spec label="reference (in Field)" align="start">
      <Field label="Message" info="Message field" hint="No more than 200 characters.">
        {#snippet control({ id })}
          <Textarea {id} placeholder="Your message..." bind:value={messageValue} maxLength={200} />
        {/snippet}
      </Field>
    </Spec>
    <Spec label="with count & hint" align="start">
      <Textarea
        placeholder="Share your thoughts…"
        bind:value={countValue}
        maxLength={100}
        showCount
        hint="Keep it brief and concise."
      />
    </Spec>
    <Spec label="autogrow" align="start">
      <Textarea
        value={"Grows with content dynamically.\nUp to six rows before scrolling."}
        autogrow
        maxRows={6}
      />
    </Spec>
    <Spec label="invalid" align="start">
      <Textarea value="Too short" invalid rows={2} />
    </Spec>
    <Spec label="disabled" align="start">
      <Textarea value="Disabled content cannot be edited." disabled />
    </Spec>
  </Showcase>
</Story>

<Story name="Sizes" asChild>
  <Showcase width="440px">
    <Spec label="sm" align="start">
      <Textarea size="sm" placeholder="Small textarea" rows={2} />
    </Spec>
    <Spec label="md" align="start">
      <Textarea size="md" placeholder="Medium textarea (default)" rows={3} />
    </Spec>
    <Spec label="lg" align="start">
      <Textarea size="lg" placeholder="Large textarea" rows={4} />
    </Spec>
  </Showcase>
</Story>
