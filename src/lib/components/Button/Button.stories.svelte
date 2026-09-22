<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "./Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";
  import Row from "../../../stories/util/Row.svelte";
  import ButtonGroup from "../ButtonGroup/ButtonGroup.svelte";
  import Badge from "../Badge/Badge.svelte";

  const { Story } = defineMeta({
    title: "Primitives/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
      variant: "solid",
      tone: "accent",
      size: "md",
      disabled: false,
      loading: false,
      block: false
    },
    argTypes: {
      variant: {
        control: "inline-radio",
        options: ["solid", "soft", "outline", "ghost", "link"],
        description: "How much surface the button occupies."
      },
      tone: {
        control: "inline-radio",
        options: ["accent", "neutral", "success", "warning", "danger"],
        description: "What the action means."
      },
      size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
      icon: { control: "text", description: "Leading icon name." },
      trailingIcon: { control: "text" },
      iconOnly: { control: "boolean" },
      label: { control: "text", description: "Accessible name when icon-only." }
    },
    parameters: {
      docs: {
        description: {
          component:
            "Variant and tone are independent. Pick the variant for visual weight in the layout, the tone for meaning — a destructive action can be quiet (`outline` + `danger`) or loud (`solid` + `danger`) without inventing a new variant."
        }
      }
    }
  });

  const VARIANTS = ["solid", "soft", "outline", "ghost", "link"];
  const TONES = ["accent", "neutral", "success", "warning", "danger"];
  const SIZES = ["xs", "sm", "md", "lg"];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Button {...args}>Copy app link</Button>
  {/snippet}
</Story>

<Story name="Variants" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    {#each VARIANTS as variant}
      <Spec label={variant}>
        {#each TONES as tone}
          <Button {variant} {tone}>Send invite</Button>
        {/each}
      </Spec>
    {/each}
  </Showcase>
</Story>

<Story name="Sizes" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    {#each SIZES as size}
      <Spec label={size}>
        <Button {size} variant="solid">Sign Up</Button>
        <Button {size} variant="outline">Download</Button>
        <Button {size} variant="outline" icon="download">Download</Button>
        <Button {size} variant="outline" iconOnly icon="more-horizontal" label="More" />
      </Spec>
    {/each}
  </Showcase>
</Story>

<Story name="With icons" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="leading">
      <Button icon="user-plus">Sign Up</Button>
      <Button variant="outline" icon="download">Download</Button>
      <Button variant="outline" icon="folder">Documents</Button>
      <Button variant="outline" icon="upload">Export</Button>
    </Spec>
    <Spec label="trailing">
      <Button trailingIcon="arrow-right">Continue</Button>
      <Button variant="outline" trailingIcon="chevron-down">Monthly</Button>
    </Spec>
    <Spec label="icon only">
      <Button variant="outline" iconOnly icon="chevron-left" label="Previous" />
      <Button variant="outline" iconOnly icon="chevron-right" label="Next" />
      <Button variant="ghost" iconOnly icon="more-horizontal" label="More" />
      <Button variant="soft" tone="danger" iconOnly icon="trash" label="Delete" />
    </Spec>
  </Showcase>
</Story>

<Story name="States" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="default"><Button>Place order</Button></Spec>
    <Spec label="loading">
      <Button loading>Place order</Button>
      <Button variant="outline" loading>Download</Button>
    </Spec>
    <Spec label="disabled">
      <Button disabled>Place order</Button>
      <Button variant="outline" disabled>Download</Button>
      <Button variant="ghost" disabled>Cancel</Button>
    </Spec>
    <Spec label="block">
      <div style="width: 260px">
        <Button block icon="link">Copy app link</Button>
      </div>
    </Spec>
  </Showcase>
</Story>

<Story
  name="In context"
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "The pairing the reference design uses most: a quiet dismissal beside a committed primary, right-aligned in a card footer."
      }
    }
  }}
 asChild>
  <div class="footer">
    <Row gap={8}>
      <Button variant="ghost" tone="neutral">Cancel</Button>
      <Button>Done</Button>
    </Row>
  </div>
</Story>

<Story
  name="Reference sheet"
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "A one-to-one rebuild of the button sheet in the source design, kept as the visual contract for this component. Every number in it was measured off that image rather than estimated: label weight from the ratio of stem width to cap height (0.154 — the Bold cut), corner radius by integrating the area each corner removes from its bounding box (a near-constant 12–14px at every height, not a ratio), and inline padding, icon gap and type size from the ratios 0.40, 0.23 and 0.36 of the control height."
      }
    }
  }}
  asChild
>
  <div class="sheet">
    <Row gap={12}>
      <Button variant="outline" icon="link">Copy link</Button>
      <Button variant="outline" icon="user">Login</Button>
      <Button icon="user-plus">Sign Up</Button>
    </Row>

    <Row gap={20}>
      <ButtonGroup ariaLabel="Document actions">
        <Button variant="outline" icon="folder">Documents</Button>
        <Button variant="outline" icon="upload">Export</Button>
        <Button variant="outline" iconOnly icon="more-horizontal" label="More" />
      </ButtonGroup>
      <ButtonGroup ariaLabel="Pagination">
        <Button variant="outline" iconOnly icon="chevron-left" label="Previous" />
        <Button variant="outline" iconOnly icon="chevron-right" label="Next" />
      </ButtonGroup>
    </Row>

    <Row gap={12}>
      <Button variant="outline" tone="neutral">Cancel</Button>
      <Button>Done</Button>
      <Button variant="outline" iconOnly icon="pencil" label="Edit" />
      <Button variant="outline" icon="heart" badge={2}>Like</Button>
    </Row>

    <Row gap={12}>
      <Button variant="outline" iconOnly icon="chevron-left" label="Previous" />
      <Button variant="outline" iconOnly icon="chevron-right" label="Next" />
      <Button variant="outline" trailingIcon="arrow-up-right">Forward</Button>
    </Row>
  </div>
</Story>

<style>
  .sheet {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 32px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 14px 16px;
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    box-shadow: var(--ui-shadow-sm);
    max-width: 520px;
  }
  
</style>
