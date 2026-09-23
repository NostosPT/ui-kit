<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import NumberInput from "./NumberInput.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/NumberInput",
    component: NumberInput,
    tags: ["autodocs"],
    args: {
      value: 1,
      min: 0,
      max: 100,
      step: 1,
      size: "md",
      layout: "attached",
      disabled: false,
      readonly: false,
      invalid: false
    },
    argTypes: {
      size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
      layout: { control: "inline-radio", options: ["attached", "controls-end", "vertical", "separated"] },
      step: { control: "number" },
      min: { control: "number" },
      max: { control: "number" },
      disabled: { control: "boolean" },
      readonly: { control: "boolean" },
      invalid: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Stepper control featuring a concurrent 3D flip-and-blur tumbler animation when nudged via buttons, keyboard arrows, or external updates. Supports 4 distinct layouts ('attached', 'controls-end', 'vertical', and 'separated'), full text editability on click, and the shared InputFrame scale."
        }
      }
    }
  });
</script>

<script>
  let playVal = $state(3);
  let attachedVal = $state(1);
  let controlsEndVal = $state(2);
  let verticalVal = $state(4);
  let separatedVal = $state(1);

  let xsVal = $state(1);
  let smVal = $state(2);
  let mdVal = $state(3);
  let lgVal = $state(4);

  let decimalVal = $state(1.5);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="display: flex; align-items: center; justify-content: center; padding: 40px 0;">
      <NumberInput {...args} bind:value={playVal} />
    </div>
  {/snippet}
</Story>

<Story name="Layouts" asChild>
  <Showcase gap={24}>
    <Spec label="attached (default)">
      <NumberInput bind:value={attachedVal} layout="attached" />
    </Spec>

    <Spec label="controls-end">
      <NumberInput bind:value={controlsEndVal} layout="controls-end" />
    </Spec>

    <Spec label="vertical">
      <NumberInput bind:value={verticalVal} layout="vertical" />
    </Spec>

    <Spec label="separated">
      <NumberInput bind:value={separatedVal} layout="separated" />
    </Spec>
  </Showcase>
</Story>

<Story name="Sizes" asChild>
  <Showcase gap={20}>
    <Spec label="xs (28px)">
      <NumberInput size="xs" bind:value={xsVal} />
      <NumberInput size="xs" variant="vertical" bind:value={xsVal} />
      <NumberInput size="xs" variant="controls-end" bind:value={xsVal} />
    </Spec>

    <Spec label="sm (34px)">
      <NumberInput size="sm" bind:value={smVal} />
      <NumberInput size="sm" variant="vertical" bind:value={smVal} />
      <NumberInput size="sm" variant="controls-end" bind:value={smVal} />
    </Spec>

    <Spec label="md (40px)">
      <NumberInput size="md" bind:value={mdVal} />
      <NumberInput size="md" variant="vertical" bind:value={mdVal} />
      <NumberInput size="md" variant="controls-end" bind:value={mdVal} />
    </Spec>

    <Spec label="lg (48px)">
      <NumberInput size="lg" bind:value={lgVal} />
      <NumberInput size="lg" variant="vertical" bind:value={lgVal} />
      <NumberInput size="lg" variant="controls-end" bind:value={lgVal} />
    </Spec>
  </Showcase>
</Story>

<Story name="Decimals & Steps" asChild>
  <Showcase gap={20}>
    <Spec label="step 0.25 (precision 2)">
      <NumberInput bind:value={decimalVal} step={0.25} min={0} max={10} />
    </Spec>
  </Showcase>
</Story>

<Story name="States" asChild>
  <Showcase gap={20}>
    <Spec label="at min boundary (min 0)">
      <NumberInput value={0} min={0} max={10} />
    </Spec>

    <Spec label="disabled">
      <NumberInput value={5} disabled />
    </Spec>

    <Spec label="readonly">
      <NumberInput value={5} readonly />
    </Spec>

    <Spec label="invalid">
      <NumberInput value={99} invalid />
    </Spec>
  </Showcase>
</Story>
