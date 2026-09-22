<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tabs from "./Tabs.svelte";
  import TabPanel from "./TabPanel.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    args: {
      items: ["Share", "Privacy", "Publishing", "Domain"],
      value: "Share",
      variant: "underline",
      size: "md"
    },
    argTypes: {
      variant: { control: "inline-radio", options: ["underline", "pill", "enclosed"] },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      align: { control: "inline-radio", options: ["start", "center", "end"] },
      block: { control: "boolean" }
    },
    parameters: {
      docs: {
        description: {
          component:
            "Tabs swap content, so they carry the full tab ARIA contract — roving tabindex, arrow/Home/End keys and `aria-controls`. If you only need to pick a value, use SegmentedControl instead."
        }
      }
    }
  });

  const SHARE = ["Share", "Privacy", "Publishing", "Domain"];
  const COUNTED = [
    { value: "all", label: "All orders", count: 128 },
    { value: "open", label: "Open", count: 12 },
    { value: "refunded", label: "Refunded", count: 3 },
    { value: "archived", label: "Archived", disabled: true }
  ];

  let a = $state("Share");
  let b = $state("Share");
  let c = $state("Share");
  let counted = $state("all");
  let panel = $state("Share");
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div style="width: 440px"><Tabs {...args} /></div>
  {/snippet}
</Story>

<Story name="Variants" asChild parameters={{ layout: "padded" }}>
  <Showcase width="480px" gap={26}>
    <Spec label="underline"><Tabs items={SHARE} bind:value={a} ariaLabel="Settings" /></Spec>
    <Spec label="pill"><Tabs items={SHARE} bind:value={b} variant="pill" ariaLabel="Settings" /></Spec>
    <Spec label="enclosed"><Tabs items={SHARE} bind:value={c} variant="enclosed" ariaLabel="Settings" /></Spec>
  </Showcase>
</Story>

<Story name="With counts" asChild parameters={{ layout: "padded" }}>
  <div style="width: 480px">
    <Tabs items={COUNTED} bind:value={counted} ariaLabel="Orders" />
  </div>
</Story>

<Story
  name="With panels"
  asChild
  parameters={{
    layout: "padded",
    docs: {
      description: {
        story:
          "Panels live inside `<Tabs>` so they can read the active value from context. Inactive panels unmount by default; pass `keepMounted` to keep expensive content alive."
      }
    }
  }}
>
  <div class="card">
    <Tabs items={SHARE} bind:value={panel} variant="pill" ariaLabel="Share settings">
      <TabPanel value="Share">
        <p>Anyone with the link can view this project. Invite people by email to give them edit access.</p>
      </TabPanel>
      <TabPanel value="Privacy">
        <p>Choose who can discover this project and whether search engines may index it.</p>
      </TabPanel>
      <TabPanel value="Publishing">
        <p>Publish a snapshot to a public URL. Drafts stay private until you publish.</p>
      </TabPanel>
      <TabPanel value="Domain">
        <p>Connect a custom domain. A one-year registration is included with the annual plan.</p>
      </TabPanel>
    </Tabs>
  </div>
</Story>

<style>
  .card {
    width: 480px;
    padding: 16px;
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    box-shadow: var(--ui-shadow-sm);
  }
  .card p {
    margin: 0;
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
</style>
