<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import NumberInput from "./NumberInput.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/NumberInput",
    component: NumberInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Stepper control with kinetic tumbler animation, keyboard increment/decrement, and clamp-on-blur precision handling."
        }
      }
    }
  });

  let qty = $state(45);
  let numEnd = $state(1);
  let numVert = $state(2);
  let numAtt = $state(1);
</script>

<Story name="Layouts" asChild>
  <Showcase>
    <Spec label="attached"><NumberInput bind:value={qty} min={0} max={99} /></Spec>
    <Spec label="separated"><NumberInput value={45} min={0} max={99} layout="separated" /></Spec>
    <Spec label="controls-end"><NumberInput bind:value={numEnd} variant="controls-end" /></Spec>
    <Spec label="vertical"><NumberInput bind:value={numVert} variant="vertical" /></Spec>
  </Showcase>
</Story>

<Story name="Sizes" asChild>
  <Showcase>
    <Spec label="sm"><NumberInput value={1} size="sm" min={0} /></Spec>
    <Spec label="md"><NumberInput value={1} size="md" min={0} /></Spec>
    <Spec label="lg"><NumberInput value={1} size="lg" min={0} /></Spec>
  </Showcase>
</Story>

<Story name="States" asChild>
  <Showcase>
    <Spec label="at limit"><NumberInput value={0} min={0} max={10} /></Spec>
    <Spec label="decimal"><NumberInput value={2.5} step={0.5} min={0} max={10} /></Spec>
    <Spec label="disabled"><NumberInput value={5} disabled /></Spec>
  </Showcase>
</Story>
