<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Modal from "./Modal.svelte";
  import Button from "../Button/Button.svelte";
  import Input from "../Input/Input.svelte";
  import Field from "../Field/Field.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Modal",
    component: Modal,
    tags: ["autodocs"],
    args: {
      size: "md",
      title: "Edit project",
      description: "Make changes to your project settings.",
      dismissible: true,
      closeOnOutside: true
    },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
      dismissible: { control: "boolean" },
      closeOnOutside: { control: "boolean" },
      title: { control: "text" },
      description: { control: "text" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Built on the native `<dialog>` element with `showModal()`. Focus trap, top layer, Escape to close, and inert background come from the platform."
        }
      }
    }
  });

  let confirmOpen = $state(false);
  let formOpen = $state(false);
  let projectName = $state("Nostos UI");
</script>

<Story name="Confirmation" asChild>
  <div style="min-height: 120px">
    <Button onclick={() => (confirmOpen = true)}>Delete project</Button>

    <Modal
      bind:open={confirmOpen}
      size="sm"
      title="Delete this project?"
      description="This removes the project and everything in it. This cannot be undone."
    >
      {#snippet footer({ close })}
        <Button variant="ghost" tone="neutral" onclick={close}>Cancel</Button>
        <Button tone="danger" icon="trash" onclick={close}>Delete project</Button>
      {/snippet}
    </Modal>
  </div>
</Story>

<Story name="With form" asChild>
  <div style="min-height: 120px">
    <Button variant="outline" onclick={() => (formOpen = true)}>Edit project name</Button>

    <Modal
      bind:open={formOpen}
      size="md"
      title="Rename project"
      description="Enter a new display name for this workspace."
    >
      <div style="padding-top: 8px">
        <Field label="Project name">
          {#snippet control({ id, describedBy })}
            <Input {id} aria-describedby={describedBy} bind:value={projectName} />
          {/snippet}
        </Field>
      </div>

      {#snippet footer({ close })}
        <Button variant="ghost" tone="neutral" onclick={close}>Cancel</Button>
        <Button onclick={close}>Save changes</Button>
      {/snippet}
    </Modal>
  </div>
</Story>
