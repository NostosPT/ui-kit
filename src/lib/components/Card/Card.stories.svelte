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
    args: { elevation: "sm", bordered: true, radius: "2xl", padding: "none" },
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

  let selectedCard = $state("team");
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

<Story name="Nested panels" asChild>
  <div style="width: 520px">
    <Card elevation="sm" bordered radius="2xl">
      <CardHeader title="Subscription" description="Manage your current plan and usage." />
      <CardBody>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Nested panel per DESIGN.md: radius="xl", elevation="xs" or "none" -->
          <Card elevation="xs" bordered radius="xl" padding="md">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p style="margin: 0 0 2px; font-weight: 600; font-size: var(--ui-text-md)">Pro Annual</p>
                <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-fg-muted)">Renews on Dec 14, 2026</p>
              </div>
              <Badge tone="success" variant="soft">Active</Badge>
            </div>
          </Card>
          <Card elevation="none" bordered radius="xl" padding="md" style="background: var(--ui-bg-sunken)">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p style="margin: 0 0 2px; font-weight: 600; font-size: var(--ui-text-md)">Seat allocation</p>
                <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-fg-muted)">8 of 10 seats in use</p>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </Card>
        </div>
      </CardBody>
      <CardFooter muted>
        <Button variant="ghost" tone="neutral">Cancel subscription</Button>
        <Button variant="outline">Change plan</Button>
      </CardFooter>
    </Card>
  </div>
</Story>

<Story name="Interactive cards" asChild>
  <div style="display: grid; grid-template-columns: repeat(2, 240px); gap: 16px;">
    <Card
      as="button"
      interactive
      bordered
      radius="xl"
      padding="md"
      elevation={selectedCard === "team" ? "md" : "xs"}
      style={selectedCard === "team" ? "border-color: var(--ui-accent-solid); text-align: left;" : "text-align: left;"}
      onclick={() => (selectedCard = "team")}
    >
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-weight: 600; font-size: var(--ui-text-md)">Team Workspace</span>
        {#if selectedCard === "team"}
          <Badge tone="accent" variant="solid" size="sm">Selected</Badge>
        {/if}
      </div>
      <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-fg-muted); line-height: 1.4;">
        Shared projects, real-time collaboration, and audit logs.
      </p>
    </Card>

    <Card
      as="button"
      interactive
      bordered
      radius="xl"
      padding="md"
      elevation={selectedCard === "personal" ? "md" : "xs"}
      style={selectedCard === "personal" ? "border-color: var(--ui-accent-solid); text-align: left;" : "text-align: left;"}
      onclick={() => (selectedCard = "personal")}
    >
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-weight: 600; font-size: var(--ui-text-md)">Personal Pro</span>
        {#if selectedCard === "personal"}
          <Badge tone="accent" variant="solid" size="sm">Selected</Badge>
        {/if}
      </div>
      <p style="margin: 0; font-size: var(--ui-text-sm); color: var(--ui-fg-muted); line-height: 1.4;">
        Unlimited private repositories and personal API tokens.
      </p>
    </Card>
  </div>
</Story>
