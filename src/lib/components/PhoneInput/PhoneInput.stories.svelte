<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PhoneInput from "./PhoneInput.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/PhoneInput",
    component: PhoneInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "International phone number input integrating a native country picker with dial code and flag prefix."
        }
      }
    }
  });

  let phone = $state("5550192");
  let country = $state("US");
</script>

<Story name="Overview" asChild>
  <Showcase width="360px">
    <Spec label="default" align="start">
      <PhoneInput bind:value={phone} bind:country />
    </Spec>
    <Spec label="sizes" align="start">
      <PhoneInput size="sm" value="5550192" country="US" />
      <PhoneInput size="md" value="5550192" country="US" />
      <PhoneInput size="lg" value="5550192" country="US" />
    </Spec>
    <Spec label="invalid" align="start">
      <PhoneInput value="12" country="GB" invalid />
    </Spec>
    <Spec label="disabled" align="start">
      <PhoneInput value="5550192" country="US" disabled />
    </Spec>
  </Showcase>
</Story>
