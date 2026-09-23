<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tag from "./Tag.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Primitives/Tag",
    component: Tag,
    tags: ["autodocs"],
    args: {
      label: "Design",
      size: "md",
      tone: "neutral",
      variant: "surface",
      removable: true
    },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      tone: { control: "inline-radio", options: ["neutral", "accent", "muted"] },
      variant: { control: "inline-radio", options: ["surface", "solid"] },
      removable: { control: "boolean" },
      disabled: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Removable chip used for applied tags, filters, and multi-select values. Supports avatar and icon adornments, sizes, and solid/soft tones."
        }
      }
    }
  });
</script>

<Story name="Variants" asChild>
  <Showcase gap={20}>
    <Spec label="sizes">
      <Tag size="sm" label="Small" removable />
      <Tag size="md" label="Medium" removable />
      <Tag size="lg" label="Large" removable />
    </Spec>

    <Spec label="tones">
      <Tag label="Neutral" removable />
      <Tag tone="accent" label="Accent" removable />
      <Tag tone="muted" label="Muted" removable />
      <Tag tone="accent" variant="solid" label="Solid" removable />
    </Spec>

    <Spec label="with avatar">
      <Tag label="Jack" removable>
        {#snippet leading()}<Avatar size="xs" name="Jack Reed" />{/snippet}
      </Tag>
      <Tag label="Ann" removable>
        {#snippet leading()}<Avatar size="xs" name="Ann Brown" />{/snippet}
      </Tag>
    </Spec>
  </Showcase>
</Story>
