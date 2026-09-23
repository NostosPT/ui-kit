<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Input from "./Input.svelte";
  import Field from "../Field/Field.svelte";
  import Button from "../Button/Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Input",
    component: Input,
    tags: ["autodocs"],
    args: { size: "md", placeholder: "info@pixsellz.io", invalid: false, disabled: false },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      icon: { control: "text" },
      trailingIcon: { control: "text" },
      clearable: { control: "boolean" },
      invalid: { control: "boolean" },
      disabled: { control: "boolean" },
      readonly: { control: "boolean" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "The visible box is `InputFrame`, shared with Select, TagInput, PhoneInput and CurrencyInput — so those controls cannot drift apart on height, radius or focus ring. Anything in the `start` / `end` snippets sits inside the border."
        }
      }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="width: 320px"><Input {...args} /></div>
  {/snippet}
</Story>

<Story name="Sizes" parameters={{ layout: "padded" }} asChild>
  <Showcase width="380px">
    <Spec label="sm"><Input size="sm" placeholder="Search files" icon="search" /></Spec>
    <Spec label="md"><Input size="md" placeholder="Search files" icon="search" /></Spec>
    <Spec label="lg"><Input size="lg" placeholder="Search files" icon="search" /></Spec>
  </Showcase>
</Story>

<Story name="States" parameters={{ layout: "padded" }} asChild>
  <Showcase width="380px">
    <Spec label="default"><Input placeholder="Placeholder" /></Spec>
    <Spec label="filled"><Input value="kuchkarov@pixsellz.io" /></Spec>
    <Spec label="invalid"><Input value="not-an-email" invalid /></Spec>
    <Spec label="readonly"><Input value="admin-dashboard-8o2q.pixsellz.io" readonly icon="lock" /></Spec>
    <Spec label="disabled"><Input value="Locked value" disabled /></Spec>
    <Spec label="clearable"><Input value="Annual report" clearable icon="search" /></Spec>
  </Showcase>
</Story>

<Story
  name="Inline actions"
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "The `end` snippet renders inside the border. Adding `ui-frame-flush` to the child strips the frame's padding so a button can meet the edge — the invite-row treatment from the reference design."
      }
    }
  }}
 asChild>
  <Showcase width="420px">
    <Spec label="button">
      <Input placeholder="info@pixsellz.io">
        {#snippet end()}
          <div class="flush ui-frame-flush">
            <Button size="sm" variant="ghost" tone="accent">Send invite</Button>
          </div>
        {/snippet}
      </Input>
    </Spec>
    <Spec label="copy">
      <Input value="admin-dashboard-8o2q.pixsellz.io" readonly icon="lock">
        {#snippet end()}
          <div class="flush ui-frame-flush">
            <Button size="sm" variant="ghost" tone="neutral" iconOnly icon="copy" label="Copy" />
            <Button size="sm" variant="ghost" tone="neutral" iconOnly icon="external-link" label="Open" />
          </div>
        {/snippet}
      </Input>
    </Spec>
    <Spec label="unit">
      <Input value="0.00" type="text">
        {#snippet start()}
          <span class="unit">$</span>
        {/snippet}
        {#snippet end()}
          <span class="unit">USD</span>
        {/snippet}
      </Input>
    </Spec>
  </Showcase>
</Story>

<Story name="With Field" parameters={{ layout: "padded" }} asChild>
  <Showcase width="380px" gap={22}>
    <Field label="Work email" hint="We'll email them instructions and a magic link to sign in.">
      {#snippet control({ id, describedBy })}
        <Input {id} aria-describedby={describedBy} placeholder="info@pixsellz.io" />
      {/snippet}
    </Field>

    <Field label="Custom domain" required error="That domain is already registered.">
      {#snippet control({ id, describedBy, invalid })}
        <Input {id} aria-describedby={describedBy} {invalid} value="pixsellz.io" icon="globe" />
      {/snippet}
    </Field>

    <Field label="Postal code" optional>
      {#snippet control({ id })}
        <Input {id} placeholder="e.g. 10001" />
      {/snippet}
    </Field>
  </Showcase>
</Story>

<style>
  .flush {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-inline-end: 4px;
  }
  .unit {
    font-size: var(--ui-text-md);
    color: var(--ui-fg-subtle);
    font-weight: var(--ui-weight-medium);
  }
  
</style>
