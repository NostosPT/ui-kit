<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import OtpInput from "./OtpInput.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/OtpInput",
    component: OtpInput,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Dedicated One-Time Password (OTP) field with grouped cells, middle separator dot, paste handling, and active cell focus halo."
        }
      }
    }
  });

  let otp = $state("4853");
</script>

<Story name="Overview" asChild>
  <Showcase>
    <Spec label="default">
      <OtpInput bind:value={otp} length={6} separatorAfter={3} />
    </Spec>
    <Spec label="empty">
      <OtpInput length={6} separatorAfter={3} />
    </Spec>
    <Spec label="sizes">
      <OtpInput value="123" size="sm" length={4} />
      <OtpInput value="123" size="md" length={4} />
      <OtpInput value="123" size="lg" length={4} />
    </Spec>
    <Spec label="invalid">
      <OtpInput value="4853" length={6} invalid />
    </Spec>
    <Spec label="disabled">
      <OtpInput value="4853" length={6} disabled />
    </Spec>
  </Showcase>
</Story>
