<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Calendar from "./Calendar.svelte";
  import DatePicker from "./DatePicker.svelte";
  import Card from "../Card/Card.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";

  const { Story } = defineMeta({
    title: "Forms/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    args: { weekStartsOn: 1, size: "md", showOutsideDays: true },
    argTypes: {
      weekStartsOn: { control: "inline-radio", options: [0, 1], description: "0 = Sunday, 1 = Monday" },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      mode: { control: "inline-radio", options: ["single", "range"] },
      showOutsideDays: { control: "boolean" }
    },
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Always six week rows, so paging between months never changes the grid's height. Weekday labels and the month heading come from `Intl`, so the calendar localises with the `locale` prop rather than a translation file."
        }
      }
    }
  });

  let single = $state(new Date(2023, 10, 21));
  let range = $state([new Date(2023, 10, 6), new Date(2023, 10, 14)]);
  let picked = $state(new Date(2023, 10, 2));
  const today = new Date();
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Card padding="sm">
      <Calendar {...args} value={new Date(2023, 10, 21)} month={new Date(2023, 10, 1)} />
    </Card>
  {/snippet}
</Story>

<Story name="Single date" asChild>
  <Card padding="sm">
    <Calendar bind:value={single} month={new Date(2023, 10, 1)} />
  </Card>
</Story>

<Story name="Range" asChild>
  <Card padding="sm">
    <Calendar bind:value={range} mode="range" month={new Date(2023, 10, 1)} />
  </Card>
</Story>

<Story
  name="Bounded"
  asChild
  parameters={{
    docs: {
      description: {
        story: "`min` / `max` disable out-of-bounds days and clamp keyboard navigation, so arrows can't walk off the allowed window."
      }
    }
  }}
>
  <Card padding="sm">
    <Calendar
      value={today}
      min={today}
      max={new Date(today.getFullYear(), today.getMonth() + 1, 15)}
      isDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
    />
  </Card>
</Story>

<Story name="Locales" asChild>
  <Showcase>
    <Spec label="en-GB" align="start" gutter={70}>
      <Card padding="sm"><Calendar size="sm" locale="en-GB" value={single} month={new Date(2023, 10, 1)} /></Card>
    </Spec>
    <Spec label="pt-PT" align="start" gutter={70}>
      <Card padding="sm"><Calendar size="sm" locale="pt-PT" value={single} month={new Date(2023, 10, 1)} /></Card>
    </Spec>
    <Spec label="ja-JP" align="start" gutter={70}>
      <Card padding="sm"><Calendar size="sm" locale="ja-JP" weekStartsOn={0} value={single} month={new Date(2023, 10, 1)} /></Card>
    </Spec>
  </Showcase>
</Story>

<Story name="Date picker" asChild>
  <div style="width: 280px; padding-bottom: 340px">
    <DatePicker bind:value={picked} />
  </div>
</Story>
