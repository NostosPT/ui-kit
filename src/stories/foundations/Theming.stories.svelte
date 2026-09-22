<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import ThemePlayground from "./ThemePlayground.svelte";

  const { Story } = defineMeta({
    title: "Foundations/Theming",
    component: ThemePlayground,
    parameters: {
      layout: "fullscreen",
      docs: {
        description: {
          component:
            "Everything below is an ordinary component from the kit. The only thing changing is five custom properties on the wrapping element — no props, no variants, no rebuild."
        }
      }
    }
  });
</script>

<Story name="Playground" asChild parameters={{ layout: "padded" }}>
  <div style="padding: 24px">
    <ThemePlayground />
  </div>
</Story>
