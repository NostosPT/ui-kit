<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Avatar from "./Avatar.svelte";
  import AvatarGroup from "./AvatarGroup.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";
  import { PEOPLE } from "../../../stories/util/data.js";

  const { Story } = defineMeta({
    title: "Primitives/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    args: { name: "Kristin Watson", size: "md", shape: "circle" },
    argTypes: {
      size: { control: "inline-radio", options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] },
      shape: { control: "inline-radio", options: ["circle", "square"] },
      presence: { control: "inline-radio", options: [undefined, "online", "away", "busy", "offline"] },
      palette: { control: "inline-radio", options: ["spectrum", "accent"] },
      ring: { control: "boolean" },
      src: { control: "text" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "Falls back to initials on a hue hashed from the name, so the same person gets the same colour across the app with nothing persisted. Set `palette=\"accent\"` to collapse the spread to a single themed hue."
        }
      }
    }
  });

  const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="Sizes" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="initials">
      {#each SIZES as size}<Avatar {size} name="Kristin Watson" />{/each}
    </Spec>
    <Spec label="square">
      {#each SIZES as size}<Avatar {size} shape="square" name="Ronald Richards" />{/each}
    </Spec>
  </Showcase>
</Story>

<Story name="Presence" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="states">
      <Avatar size="lg" name="Jenny Wilson" presence="online" />
      <Avatar size="lg" name="Guy Hawkins" presence="away" />
      <Avatar size="lg" name="Annette Black" presence="busy" />
      <Avatar size="lg" name="Jacob Elberg" presence="offline" />
    </Spec>
    <Spec label="small">
      <Avatar size="sm" name="Jenny Wilson" presence="online" />
      <Avatar size="md" name="Guy Hawkins" presence="online" />
      <Avatar size="xl" name="Annette Black" presence="online" />
    </Spec>
  </Showcase>
</Story>

<Story
  name="Hashed palette"
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "Same component, same size — only the name differs. Lightness and chroma are pinned, so the set stays coherent no matter how many people are in it."
      }
    }
  }}
 asChild>
  <Showcase>
    <Spec label="spectrum">
      {#each PEOPLE as p}<Avatar name={p.name} />{/each}
    </Spec>
    <Spec label="accent">
      {#each PEOPLE as p}<Avatar name={p.name} palette="accent" />{/each}
    </Spec>
  </Showcase>
</Story>

<Story name="Group" parameters={{ layout: "padded" }} asChild>
  <Showcase>
    <Spec label="default"><AvatarGroup items={PEOPLE} /></Spec>
    <Spec label="max 3"><AvatarGroup items={PEOPLE} max={3} /></Spec>
    <Spec label="large"><AvatarGroup items={PEOPLE} max={4} size="lg" /></Spec>
    <Spec label="tight"><AvatarGroup items={PEOPLE} max={5} size="sm" overlap={0.45} /></Spec>
  </Showcase>
</Story>
