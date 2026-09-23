<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    args: {
      separator: "chevron"
    },
    argTypes: {
      separator: { control: "inline-radio", options: ["chevron", "slash"] },
      maxItems: { control: "number" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Hierarchical navigation indicating current page location within a structure. Supports custom separators, icon nodes, and automatic middle-item collapsing."
        }
      }
    }
  });
</script>

<Story name="Hierarchy" asChild>
  <Showcase gap={20}>
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
