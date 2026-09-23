<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Switch from "./Switch.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Switch",
    component: Switch,
    tags: ["autodocs"],
    args: { size: "md", disabled: false },
    parameters: {
      docs: {
        description: {
          component:
            "Accessible binary toggle switch control with smooth indicator motion and label integration."
        }
      }
    }
  });
</script>

<Story name="States" asChild parameters={{ layout: "padded" }}>
  <Showcase>
    <Spec label="states">
      <Switch label="Off" />
      <Switch label="On" checked />
      <Switch label="Disabled" disabled />
    </Spec>
    <Spec label="sizes">
      <Switch size="sm" checked label="Small" />
      <Switch size="md" checked label="Medium" />
      <Switch size="lg" checked label="Large" />
    </Spec>
    <Spec label="settings row" align="start">
      <div class="row">
        <Switch
          labelPosition="start"
          checked
          label="Public link"
          description="Anyone with the link can view this project."
        />
      </div>
    </Spec>
  </Showcase>
</Story>

<style>
  .row {
    width: 320px;
    padding: 14px 16px;
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    background: var(--ui-bg-surface);
  }
</style>
