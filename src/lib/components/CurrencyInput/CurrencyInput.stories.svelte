<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CurrencyInput from "./CurrencyInput.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/CurrencyInput",
    component: CurrencyInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Monetary amount input with localized currency symbol prefix and currency selector suffix, formatting on blur to maintain smooth typing."
        }
      }
    }
  });

  let price = $state(2.99);
  let currency = $state("USD");
</script>

<Story name="Overview" asChild>
  <Showcase width="360px">
    <Spec label="default" align="start">
      <CurrencyInput bind:value={price} bind:currency />
    </Spec>
    <Spec label="sizes" align="start">
      <CurrencyInput size="sm" value={10} currency="USD" />
      <CurrencyInput size="md" value={10} currency="USD" />
      <CurrencyInput size="lg" value={10} currency="USD" />
    </Spec>
    <Spec label="currencies" align="start">
      <CurrencyInput value={1250} currency="EUR" />
      <CurrencyInput value={3500} currency="GBP" />
    </Spec>
    <Spec label="disabled" align="start">
      <CurrencyInput value={99.99} disabled />
    </Spec>
  </Showcase>
</Story>
