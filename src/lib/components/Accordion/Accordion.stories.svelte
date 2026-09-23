<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Accordion from "./Accordion.svelte";
  import AccordionItem from "./AccordionItem.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    args: {
      multiple: false
    },
    argTypes: {
      multiple: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Vertically stacked set of interactive headings that each reveal a section of content. Supports single or multiple expanded items."
        }
      }
    }
  });

  let expanded = $state("domain");
</script>

<Story name="Standard" asChild>
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
