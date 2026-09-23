<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import List from "./List.svelte";
  import ListItem from "./ListItem.svelte";
  import Thumbnail from "./Thumbnail.svelte";
  import Checkbox from "../Toggle/Checkbox.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import { FILES, PEOPLE } from "../../../stories/util/data.js";

  const { Story } = defineMeta({
    title: "Data Display/List",
    component: List,
    tags: ["autodocs"],
    parameters: { layout: "padded" }
  });

  let picked = $state(new Set(["neom-bA32w6lebJg-unsplash.jpg"]));

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
