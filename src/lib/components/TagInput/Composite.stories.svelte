<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import TagInput from "./TagInput.svelte";
  import NumberInput from "../NumberInput/NumberInput.svelte";
  import PhoneInput from "../PhoneInput/PhoneInput.svelte";
  import CurrencyInput from "../CurrencyInput/CurrencyInput.svelte";
  import Select from "../Select/Select.svelte";
  import Field from "../Field/Field.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Composite inputs",
    component: TagInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Every control here renders into the same `InputFrame`, which is why they line up pixel-for-pixel in a form and all respond identically to size, invalid and disabled."
        }
      }
    }
  });

  let users = $state(["Jack", "Ann"]);
  let qty = $state(45);
  let price = $state(2.99);
  let phone = $state("");
  let country = $state("US");
  let plan = $state("");
</script>

<Story name="Tag input" asChild>
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

<Story name="Stepper" asChild>
  <Showcase>
    <Spec label="attached"><NumberInput bind:value={qty} min={0} max={99} /></Spec>
    <Spec label="separated"><NumberInput value={45} min={0} max={99} layout="separated" /></Spec>
    <Spec label="sizes">
      <NumberInput value={1} size="sm" min={0} />
      <NumberInput value={1} size="md" min={0} />
      <NumberInput value={1} size="lg" min={0} />
    </Spec>
    <Spec label="at limit"><NumberInput value={0} min={0} max={10} /></Spec>
    <Spec label="decimal"><NumberInput value={2.5} step={0.5} min={0} max={10} /></Spec>
  </Showcase>
</Story>

<Story name="Phone and money" asChild>
  <Showcase width="360px">
    <Spec label="phone" align="start">
      <PhoneInput bind:value={phone} bind:country />
    </Spec>
    <Spec label="money" align="start">
      <CurrencyInput bind:value={price} />
    </Spec>
    <Spec label="select" align="start">
      <Select
        bind:value={plan}
        placeholder="Choose a plan"
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro — $2.99/mo" },
          { value: "team", label: "Team — $9.99/mo" }
        ]}
      />
    </Spec>
    <Spec label="with icon" align="start">
      <Select value="monthly" icon="calendar" options={["monthly", "annually"]} />
    </Spec>
  </Showcase>
</Story>
