<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "./Card.svelte";
  import CardHeader from "./CardHeader.svelte";
  import CardBody from "./CardBody.svelte";
  import CardFooter from "./CardFooter.svelte";
  import Button from "../Button/Button.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Card",
    component: Card,
    tags: ["autodocs"],
    args: { elevation: "sm", bordered: true, radius: "xl", padding: "none" },
    argTypes: {
      elevation: { control: "inline-radio", options: ["none", "xs", "sm", "md", "lg", "xl"] },
      radius: { control: "inline-radio", options: ["md", "lg", "xl", "2xl"] },
      padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
      bordered: { control: "boolean" },
      interactive: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Border and elevation are independent props because the reference design uses them independently: panels in the page flow get a border and no shadow, floating panels get both."
        }
      }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="width: 360px">
      <Card {...args}>
        <CardHeader title="Custom domain" description="Connect a domain you already own." />
        <CardBody>A one-year registration is included with the annual plan.</CardBody>
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Elevation" asChild>
  <Showcase>
    {#each ["none", "xs", "sm", "md", "lg", "xl"] as elevation}
      <Spec label={elevation}>
        <Card {elevation} padding="md" bordered={elevation === "none"}>
          <span style="font-size: var(--ui-text-md)">Surface</span>
        </Card>
      </Spec>
    {/each}
  </Showcase>
</Story>

<Story name="Composed" asChild>
  <div style="width: 420px">
    <Card>
      <CardHeader title="Invite people" description="They'll get a magic link to sign in.">
        {#snippet actions()}
          <Badge tone="accent" variant="soft">3 seats left</Badge>
        {/snippet}
      </CardHeader>
      <CardBody>
        <p style="margin:0; font-size: var(--ui-text-md); color: var(--ui-fg-muted); line-height: 1.6">
          Anyone you invite can view and comment. Give them edit access later from the
          members table.
        </p>
      </CardBody>
      <CardFooter muted>
        <Button variant="ghost" tone="neutral">Cancel</Button>
        <Button icon="send">Send invite</Button>
      </CardFooter>
    </Card>
  </div>
</Story>
