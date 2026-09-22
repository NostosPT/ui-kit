<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import List from "./List.svelte";
  import ListItem from "./ListItem.svelte";
  import Thumbnail from "./Thumbnail.svelte";
  import Dropzone from "../Dropzone/Dropzone.svelte";
  import Accordion from "../Accordion/Accordion.svelte";
  import AccordionItem from "../Accordion/AccordionItem.svelte";
  import Breadcrumb from "../Breadcrumb/Breadcrumb.svelte";
  import Listbox from "../Listbox/Listbox.svelte";
  import Checkbox from "../Toggle/Checkbox.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";
  import { FILES, PEOPLE } from "../../../stories/util/data.js";

  const { Story } = defineMeta({
    title: "Data Display/Content",
    component: List,
    tags: ["autodocs"],
    parameters: { layout: "padded" }
  });

  let picked = $state(new Set(["neom-bA32w6lebJg-unsplash.jpg"]));
  let owner = $state("jane");
  let expanded = $state("domain");
  let dropped = $state([]);

  const OWNERS = PEOPLE.slice(0, 5).map((p, i) => ({
    value: p.name.toLowerCase().split(" ")[0],
    label: p.name,
    name: p.name,
    description: p.email
  }));

  function toggle(name) {
    const next = new Set(picked);
    next.has(name) ? next.delete(name) : next.add(name);
    picked = next;
  }
</script>

<Story name="File list" asChild>
  <div style="width: 480px">
    <List bordered inset>
      {#each FILES as file (file.name)}
        <ListItem title={file.name} onclick={() => toggle(file.name)} selected={picked.has(file.name)}>
          {#snippet leading()}
            <Checkbox checked={picked.has(file.name)} aria-label={`Select ${file.name}`} />
          {/snippet}
          {#snippet media()}
            <Thumbnail icon={file.type === "PDF" ? "file" : "image"} size={30} />
          {/snippet}
          {#snippet meta()}
            <Badge size="sm" variant="soft">{file.type}</Badge>
            <span style="width: 68px">{file.ratio}</span>
            <span style="width: 58px">{file.time}</span>
          {/snippet}
        </ListItem>
      {/each}
    </List>
  </div>
</Story>

<Story name="People list" asChild>
  <div style="width: 420px">
    <List bordered>
      {#each PEOPLE.slice(0, 4) as person, i (person.name)}
        <ListItem title={person.name} description={i % 2 ? "iOS Developer" : "UX Designer"}>
          {#snippet media()}
            <Avatar name={person.name} presence={i % 2 ? undefined : "online"} />
          {/snippet}
          {#snippet trailing()}
            {#if i % 2}
              <Button size="sm" variant="outline" icon="check">Following</Button>
            {:else}
              <Button size="sm" variant="outline">Follow</Button>
            {/if}
          {/snippet}
        </ListItem>
      {/each}
    </List>
  </div>
</Story>

<Story name="Dropzone" asChild>
  <Showcase width="420px">
    <Spec label="zone" align="stretch">
      <div style="flex:1">
        <Dropzone onfiles={(f) => (dropped = f)} />
      </div>
    </Spec>
    <Spec label="inline" align="stretch">
      <div style="flex:1">
        <Dropzone variant="inline" onfiles={(f) => (dropped = f)} />
      </div>
    </Spec>
    <Spec label="dropped">
      <span style="font-size: var(--ui-text-sm); color: var(--ui-fg-muted)">
        {dropped.length ? dropped.map((f) => f.name).join(", ") : "Nothing dropped yet"}
      </span>
    </Spec>
  </Showcase>
</Story>

<Story name="Accordion" asChild>
  <div style="width: 460px">
    <Accordion bind:value={expanded}>
      <AccordionItem
        id="domain"
        icon="globe"
        title="Custom Domain"
        subtitle="Billed yearly"
        value="$2.99"
      >
        A 1-year registration of your custom domain name, ready to be used in your email address.
      </AccordionItem>
      <AccordionItem id="storage" icon="folder" title="Extra storage" subtitle="Billed monthly" value="$4.00">
        Adds 100 GB to your workspace. Usage above the included allowance is billed at the end of the cycle.
      </AccordionItem>
      <AccordionItem id="seats" icon="users" title="Additional seats" subtitle="Billed monthly" value="$6.00">
        Each seat can be reassigned once per billing period.
      </AccordionItem>
    </Accordion>
  </div>
</Story>

<Story name="Breadcrumb" asChild>
  <Showcase>
    <Spec label="short">
      <Breadcrumb
        items={[
          { label: "Projects", href: "#", icon: "folder" },
          { label: "Pixsellz", href: "#" },
          { label: "Dashboard" }
        ]}
      />
    </Spec>
    <Spec label="collapsed">
      <Breadcrumb
        maxItems={4}
        items={[
          { label: "Home", href: "#" },
          { label: "Workspace", href: "#" },
          { label: "Projects", href: "#" },
          { label: "Pixsellz", href: "#" },
          { label: "Assets", href: "#" },
          { label: "November" }
        ]}
      />
    </Spec>
  </Showcase>
</Story>

<Story name="Listbox" asChild>
  <div style="width: 300px; padding-bottom: 300px">
    <Showcase>
      <Spec label="rich" align="stretch" gutter={54}>
        <div style="flex:1"><Listbox bind:value={owner} options={OWNERS} ariaLabel="Owner" /></div>
      </Spec>
      <Spec label="search" align="stretch" gutter={54}>
        <div style="flex:1"><Listbox options={OWNERS} searchable placeholder="Assign to…" ariaLabel="Assignee" /></div>
      </Spec>
    </Showcase>
  </div>
</Story>
