<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Kbd from "./Kbd.svelte";
  import Spinner from "../Spinner/Spinner.svelte";
  import Divider from "../Divider/Divider.svelte";
  import Skeleton from "../Skeleton/Skeleton.svelte";
  import Progress from "../Progress/Progress.svelte";
  import Button from "../Button/Button.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Primitives/Utility",
    component: Kbd,
    tags: ["autodocs"],
    parameters: { layout: "padded" }
  });
</script>

<Story name="Kbd" asChild>
  <Showcase>
    <Spec label="single"><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>Esc</Kbd></Spec>
    <Spec label="combo"><Kbd keys={["⌘", "⇧", "K"]} /></Spec>
    <Spec label="sizes">
      <Kbd size="sm" keys={["⌘", "K"]} />
      <Kbd size="md" keys={["⌘", "K"]} />
      <Kbd size="lg" keys={["⌘", "K"]} />
    </Spec>
    <Spec label="in a button">
      <Button variant="outline" icon="send">
        Send <Kbd size="sm" keys={["⌘", "⇧"]} />
      </Button>
    </Spec>
  </Showcase>
</Story>

<Story name="Spinner" asChild>
  <Showcase>
    <Spec label="sizes">
      <Spinner size={12} /><Spinner size={16} /><Spinner size={22} /><Spinner size={32} thickness={3} />
    </Spec>
    <Spec label="on accent">
      <span style="color: var(--ui-accent-solid)"><Spinner size={20} /></span>
      <span style="color: var(--ui-danger-solid)"><Spinner size={20} /></span>
    </Spec>
  </Showcase>
</Story>

<Story name="Divider" asChild>
  <Showcase width="360px">
    <Spec label="plain" align="stretch"><Divider /></Spec>
    <Spec label="labelled" align="stretch"><Divider>Library</Divider></Spec>
    <Spec label="start" align="stretch"><Divider align="start">Recent</Divider></Spec>
    <Spec label="vertical">
      <span style="font-size: var(--ui-text-md)">Files</span>
      <Divider orientation="vertical" spacing={8} />
      <span style="font-size: var(--ui-text-md)">Shared</span>
      <Divider orientation="vertical" spacing={8} />
      <span style="font-size: var(--ui-text-md)">Trash</span>
    </Spec>
  </Showcase>
</Story>

<Story name="Skeleton" asChild>
  <Showcase width="360px">
    <Spec label="text" align="stretch"><Skeleton lines={3} /></Spec>
    <Spec label="shapes">
      <Skeleton variant="circle" width="40px" />
      <Skeleton variant="rect" width="120px" height="64px" />
    </Spec>
    <Spec label="row" align="center">
      <Skeleton variant="circle" width="32px" />
      <div style="flex:1"><Skeleton lines={2} /></div>
    </Spec>
  </Showcase>
</Story>

<Story name="Progress" asChild>
  <Showcase width="320px">
    <Spec label="value" align="stretch"><Progress value={42} label="Uploading" showValue /></Spec>
    <Spec label="tones" align="stretch">
      <Progress value={80} tone="success" />
    </Spec>
    <Spec label="sizes" align="stretch"><Progress value={60} size="lg" /></Spec>
    <Spec label="indeterminate" align="stretch"><Progress /></Spec>
  </Showcase>
</Story>
