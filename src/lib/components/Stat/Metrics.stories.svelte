<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Stat from "./Stat.svelte";
  import Trend from "../Trend/Trend.svelte";
  import Price from "../Price/Price.svelte";
  import Sparkline from "../Sparkline/Sparkline.svelte";
  import Card from "../Card/Card.svelte";
  import Button from "../Button/Button.svelte";
  import Progress from "../Progress/Progress.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Showcase from "../../../stories/util/Showcase.svelte";
  import Spec from "../../../stories/util/Spec.svelte";
  import Row from "../../../stories/util/Row.svelte";

  const { Story } = defineMeta({
    title: "Data Display/Metrics",
    component: Stat,
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "The dashboard block from the reference, split into the four pieces it is actually made of: Price sets the figure, Trend sets the delta, Sparkline draws the shape, and Stat arranges them. Kept apart because the reference uses each on its own as often as it uses all four together — a bare Trend in a table cell, a bare Price in a checkout total."
        }
      }
    }
  });

  const sales = [3, 4, 3.4, 9.5, 2, 2.2, 8.5, 9.8, 4, 6.5, 5, 7.5];
  const visits = [1, 2, 9, 3.5, 5, 3, 6, 2.5, 4, 2, 3, 1.5];
</script>

<Story name="Cards" asChild>
  <div class="grid">
    <Card padding="md">
      <Stat label="Total Sales" hint="Gross of refunds." value="82.99" mark="$">
        {#snippet action()}
          <Button size="sm" variant="outline" tone="neutral">View Report</Button>
        {/snippet}
        {#snippet trend()}
          <Trend value={2.6} variant="soft" />
        {/snippet}
        <div class="rows">
          <div class="rows__row">
            <span>Online store</span>
            <span class="rows__value">$50.00 <Trend value={3.2} size="sm" /></span>
          </div>
          <div class="rows__row">
            <span>Twitter</span>
            <span class="rows__value">$32.00 <Trend value={-7} size="sm" /></span>
          </div>
        </div>
        <Sparkline values={sales} height={56} />
      </Stat>
    </Card>

    <Card padding="md">
      <Stat label="RCR" hint="Repeat customer rate." value="5.44" unit="%">
        {#snippet action()}
          <Button size="sm" variant="outline" tone="neutral">View Report</Button>
        {/snippet}
        {#snippet trend()}
          <Trend value={1.5} variant="soft" />
        {/snippet}
        <Sparkline values={visits} tone="warning" height={56} />
      </Stat>
    </Card>

    <Card padding="md">
      <Stat label="Total hours" value="17.00">
        {#snippet action()}
          <span class="tile"><Icon name="clock" size={18} /></span>
        {/snippet}
        <div class="rows">
          <div class="rows__row"><span>Billable</span><strong>17.00</strong></div>
          <div class="rows__row"><span>Non-billable</span><span class="faint">0.00</span></div>
        </div>
      </Stat>
    </Card>

    <Card padding="md">
      <Stat label="Budget remaining" hint="Against the approved total." value="8.00">
        {#snippet action()}
          <span class="tile"><Icon name="sliders" size={18} /></span>
        {/snippet}
        {#snippet trend()}
          <Trend value={32} goodWhen="neither" showArrow={false} />
        {/snippet}
        <div class="rows">
          <div class="rows__row"><span>Total budget</span><strong>25.00</strong></div>
        </div>
        <Progress value={32} />
      </Stat>
    </Card>
  </div>
</Story>

<Story
  name="Trend"
  asChild
  parameters={{
    docs: {
      description: {
        story:
          "`goodWhen` is the prop that stops a dashboard hand-colouring every cost metric. Direction and sentiment are separate: the arrow follows the number, the colour follows whether that direction is the good one. Costs up is red and costs down is green without the call site knowing anything about colour."
      }
    }
  }}
>
  <Showcase>
    <Spec label="revenue"><Trend value={2.6} /><Trend value={-7} /></Spec>
    <Spec label="costs">
      <Trend value={2.6} goodWhen="down" />
      <Trend value={-7} goodWhen="down" />
    </Spec>
    <Spec label="neutral"><Trend value={2.6} goodWhen="neither" /><Trend value={0} /></Spec>
    <Spec label="soft">
      <Trend value={2.6} variant="soft" />
      <Trend value={-7} variant="soft" />
    </Spec>
    <Spec label="sizes">
      <Trend value={2.6} size="sm" variant="soft" />
      <Trend value={2.6} size="md" variant="soft" />
      <Trend value={2.6} size="lg" variant="soft" />
    </Spec>
  </Showcase>
</Story>

<Story name="Price" asChild>
  <Showcase>
    <Spec label="attached"><Price amount="2.99" mark="$" unit="/year" size="lg" /></Spec>
    <Spec label="detached"><Price amount="611.37" mark="$" markPlacement="detached" size="lg" /></Spec>
    <Spec label="sizes" align="baseline">
      <Price amount="2.99" mark="$" size="sm" />
      <Price amount="2.99" mark="$" size="md" />
      <Price amount="2.99" mark="$" size="lg" />
      <Price amount="2.99" mark="$" size="xl" />
    </Spec>
    <Spec label="no mark"><Price amount="17.00" size="lg" /></Spec>
  </Showcase>
</Story>

<Story name="Sparkline" asChild>
  <Showcase>
    <Spec label="area" gap={24}><div class="spark"><Sparkline values={sales} /></div></Spec>
    <Spec label="line" gap={24}><div class="spark"><Sparkline values={sales} variant="line" /></div></Spec>
    <Spec label="hard" gap={24}><div class="spark"><Sparkline values={sales} smooth={false} /></div></Spec>
    <Spec label="tones" gap={24}>
      <div class="spark spark--sm"><Sparkline values={sales} tone="success" /></div>
      <div class="spark spark--sm"><Sparkline values={sales} tone="danger" /></div>
      <div class="spark spark--sm"><Sparkline values={sales} tone="neutral" /></div>
    </Spec>
  </Showcase>
</Story>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    max-width: 820px;
  }
  .rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-muted);
  }
  .rows__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .rows__row strong {
    color: var(--ui-fg-default);
    font-weight: var(--ui-numeric-weight);
  }
  .rows__value {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--ui-fg-default);
    font-weight: var(--ui-label-weight);
  }
  .faint { color: var(--ui-fg-faint); }
  .tile {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-md);
    height: var(--ui-control-h-md);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-muted);
    color: var(--ui-fg-muted);
  }
  .spark { width: 240px; }
  .spark--sm { width: 120px; }
</style>
