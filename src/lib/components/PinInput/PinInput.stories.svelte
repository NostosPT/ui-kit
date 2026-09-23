<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PinInput from "./PinInput.svelte";
  import Field from "../Field/Field.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/PinInput",
    component: PinInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Discrete code entry input. One real focusable input per cell, ensuring password managers and one-time-code autofill work natively."
        }
      }
    }
  });

  let code = $state("485");
  let short = $state("");
</script>

<Story name="Overview" asChild>
  <Showcase>
    <Spec label="grouped"><PinInput bind:value={code} length={6} separatorAfter={3} /></Spec>
    <Spec label="plain"><PinInput bind:value={short} length={4} type="number" /></Spec>
    <Spec label="sizes">
      <PinInput value="12" length={4} size="sm" />
      <PinInput value="12" length={4} size="md" />
      <PinInput value="12" length={4} size="lg" />
    </Spec>
    <Spec label="invalid"><PinInput value="1234" length={4} invalid /></Spec>
    <Spec label="disabled"><PinInput value="1234" length={4} disabled /></Spec>
    <Spec label="in a field">
      <div style="width: 300px">
        <Field label="Verification code" hint="We texted a 6-digit code to ••• 4821.">
          {#snippet control({ id, describedBy })}
            <PinInput {id} aria-describedby={describedBy} length={6} separatorAfter={3} />
          {/snippet}
        </Field>
      </div>
    </Spec>
  </Showcase>
</Story>
