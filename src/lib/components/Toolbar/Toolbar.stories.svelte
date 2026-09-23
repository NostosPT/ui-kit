<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Toolbar from "./Toolbar.svelte";
  import Button from "../Button/Button.svelte";
  import ButtonGroup from "../ButtonGroup/ButtonGroup.svelte";
  import Input from "../Input/Input.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Toolbar",
    component: Toolbar,
    tags: ["autodocs"],
    args: {
      variant: "card",
      size: "md"
    },
    argTypes: {
      variant: { control: "inline-radio", options: ["plain", "card", "floating"] },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      wrap: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Horizontal action bar with support for spacers, dividers, and grouped controls. Available in plain, card, and floating variants."
        }
      }
    }
  });
</script>

<Story name="Variants" asChild>
  <Showcase width="560px" gap={20}>
    <Spec label="card" align="stretch">
      <Toolbar variant="card">
        <Button variant="outline" size="sm" icon="plus">New item</Button>
        <div class="ui-toolbar__divider"></div>
        <ButtonGroup size="sm">
          <Button variant="outline" iconOnly icon="bold" label="Bold" />
          <Button variant="outline" iconOnly icon="italic" label="Italic" />
        </ButtonGroup>
        <div class="ui-toolbar__spacer"></div>
        <Button size="sm" icon="download">Export</Button>
      </Toolbar>
    </Spec>

    <Spec label="floating" align="stretch">
      <Toolbar variant="floating">
        <Button variant="ghost" size="sm" iconOnly icon="scissors" label="Cut" />
        <Button variant="ghost" size="sm" iconOnly icon="copy" label="Copy" />
        <div class="ui-toolbar__divider"></div>
        <Button variant="ghost" size="sm" iconOnly icon="trash" tone="danger" label="Delete" />
      </Toolbar>
    </Spec>

    <Spec label="plain" align="stretch">
      <Toolbar variant="plain">
        <Input size="sm" placeholder="Filter records..." icon="search" />
        <div class="ui-toolbar__spacer"></div>
        <Button variant="outline" size="sm" icon="sliders">Filter</Button>
        <Button size="sm">Action</Button>
      </Toolbar>
    </Spec>
  </Showcase>
</Story>
