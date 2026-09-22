<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "../../lib/components/Card/Card.svelte";
  import CardHeader from "../../lib/components/Card/CardHeader.svelte";
  import CardBody from "../../lib/components/Card/CardBody.svelte";
  import CardFooter from "../../lib/components/Card/CardFooter.svelte";
  import Button from "../../lib/components/Button/Button.svelte";
  import ButtonGroup from "../../lib/components/ButtonGroup/ButtonGroup.svelte";
  import Dropzone from "../../lib/components/Dropzone/Dropzone.svelte";
  import List from "../../lib/components/List/List.svelte";
  import ListItem from "../../lib/components/List/ListItem.svelte";
  import Thumbnail from "../../lib/components/List/Thumbnail.svelte";
  import Checkbox from "../../lib/components/Toggle/Checkbox.svelte";
  import Badge from "../../lib/components/Badge/Badge.svelte";
  import Tabs from "../../lib/components/Tabs/Tabs.svelte";
  import TabPanel from "../../lib/components/Tabs/TabPanel.svelte";
  import Input from "../../lib/components/Input/Input.svelte";
  import Field from "../../lib/components/Field/Field.svelte";
  import Divider from "../../lib/components/Divider/Divider.svelte";
  import Avatar from "../../lib/components/Avatar/Avatar.svelte";
  import SegmentedControl from "../../lib/components/Segmented/SegmentedControl.svelte";
  import Calendar from "../../lib/components/Calendar/Calendar.svelte";
  import QrPlaceholder from "./QrPlaceholder.svelte";
  import { FILES, PEOPLE } from "../util/data.js";

  const { Story } = defineMeta({
    title: "Patterns/Workspace",
    component: Card,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Screens assembled entirely from the kit — no pattern-specific CSS beyond layout. They exist to prove the components compose, and to give a reference for spacing and density when you build your own."
        }
      }
    }
  });

  let picked = $state(new Set(["neom-bA32w6lebJg-unsplash.jpg"]));
  let shareTab = $state("Share");
  let invite = $state("");
  let day = $state(new Date(2023, 10, 21));
  let grid = $state("grid");

  function toggle(name) {
    const next = new Set(picked);
    next.has(name) ? next.delete(name) : next.add(name);
    picked = next;
  }
</script>

<Story name="Media library" asChild>
  <div style="width: 480px">
    <Card>
      <CardBody padding="md">
        <div class="stack">
          <div class="split">
            <Dropzone title="Add image" hint="or drag and drop" />
            <div class="side">
              <SegmentedControl
                bind:value={grid}
                ariaLabel="Layout"
                items={[
                  { value: "grid", label: "Grid", icon: "grid" },
                  { value: "list", label: "List", icon: "list" }
                ]}
              />
            </div>
          </div>

          <div>
            <p class="section">Library</p>
            <List inset>
              {#each FILES.slice(0, 3) as file (file.name)}
                <ListItem
                  padding="sm"
                  title={file.name}
                  selected={picked.has(file.name)}
                  onclick={() => toggle(file.name)}
                >
                  {#snippet leading()}
                    <Checkbox checked={picked.has(file.name)} aria-label={`Select ${file.name}`} />
                  {/snippet}
                  {#snippet media()}
                    <Thumbnail icon="image" size={28} />
                  {/snippet}
                  {#snippet meta()}
                    <Badge size="sm">{file.type}</Badge>
                    <span style="width:64px">{file.ratio}</span>
                    <span style="width:56px">{file.time}</span>
                  {/snippet}
                </ListItem>
              {/each}
            </List>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" tone="neutral">Cancel</Button>
        <Button>Done</Button>
      </CardFooter>
    </Card>
  </div>
</Story>

<Story name="Share panel" asChild>
  <div style="width: 400px">
    <Card>
      <CardBody padding="md">
        <Tabs items={["Share", "Privacy", "Publishing", "Domain"]} bind:value={shareTab} variant="pill" block ariaLabel="Share settings">
          <TabPanel value="Share">
            <div class="stack">
              <div class="share">
                <QrPlaceholder seed="admin-dashboard" size={72} />
                <div class="share__link">
                  <Input value="admin-dashboard-8o2q.pixsellz.io" readonly icon="lock" size="sm">
                    {#snippet end()}
                      <div class="flush ui-frame-flush">
                        <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="copy" label="Copy link" />
                        <Button size="xs" variant="ghost" tone="neutral" iconOnly icon="pencil" label="Edit link" />
                      </div>
                    {/snippet}
                  </Input>
                  <Button block icon="link">Copy app link</Button>
                </div>
              </div>

              <Divider />

              <Field label="Invite users" hint="We'll email them instructions and a magic link to sign in.">
                {#snippet control({ id, describedBy })}
                  <Input {id} aria-describedby={describedBy} bind:value={invite} placeholder="info@pixsellz.io">
                    {#snippet end()}
                      <div class="flush ui-frame-flush">
                        <Button size="sm" variant="ghost" tone="accent">Send invite</Button>
                      </div>
                    {/snippet}
                  </Input>
                {/snippet}
              </Field>

              <List>
                <ListItem padding="sm" title="kuchkarov@pixsellz.io">
                  {#snippet media()}<Avatar size="sm" name="Kuchkarov" />{/snippet}
                  {#snippet trailing()}<Badge variant="outline" icon="check">Invited</Badge>{/snippet}
                </ListItem>
              </List>

              <div class="links">
                <Button variant="link" tone="accent" icon="link">Copy private invite link</Button>
                <Button variant="link" tone="neutral" icon="trash">Remove link</Button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="Privacy">
            <p class="prose">Choose who can discover this project and whether search engines may index it.</p>
          </TabPanel>
          <TabPanel value="Publishing">
            <p class="prose">Publish a snapshot to a public URL. Drafts stay private until you publish.</p>
          </TabPanel>
          <TabPanel value="Domain">
            <p class="prose">Connect a custom domain, or register one for $2.99 a year.</p>
          </TabPanel>
        </Tabs>
      </CardBody>
    </Card>
  </div>
</Story>

<Story name="Scheduler" asChild>
  <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap">
    <Card padding="sm">
      <Calendar bind:value={day} month={new Date(2023, 10, 1)} />
    </Card>

    <Card style="width: 260px">
      <CardHeader compact title="Team" description="Who can see this project" />
      <CardBody padding="none">
        <List>
          {#each PEOPLE.slice(0, 4) as person, i (person.name)}
            <ListItem padding="sm" title={person.name} description={i % 2 ? "iOS Developer" : "UX Designer"}>
              {#snippet media()}
                <Avatar size="sm" name={person.name} presence={i % 2 ? undefined : "online"} />
              {/snippet}
              {#snippet trailing()}
                <Button size="xs" variant="outline" icon={i % 2 ? "check" : undefined}>
                  {i % 2 ? "Following" : "Follow"}
                </Button>
              {/snippet}
            </ListItem>
          {/each}
        </List>
      </CardBody>
      <CardFooter align="between" compact>
        <ButtonGroup ariaLabel="Documents">
          <Button size="sm" variant="outline" icon="folder">Documents</Button>
          <Button size="sm" variant="outline" icon="upload">Export</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </div>
</Story>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .split {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: start;
  }
  .side {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .section {
    margin: 0 0 6px;
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-subtle);
  }
  .share {
    display: flex;
    gap: 14px;
    align-items: stretch;
  }
  .share__link {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }
  .flush {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-inline-end: 4px;
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .prose {
    margin: 0;
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
</style>
