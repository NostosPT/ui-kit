<script>
  /** Rule, optionally with an inline label ("or", "Library", section breaks). */
  let {
    orientation = "horizontal",
    align = "center",
    spacing = 0,
    class: klass = "",
    children,
    ...rest
  } = $props();

  const labelled = $derived(Boolean(children) && orientation === "horizontal");
</script>

{#if labelled}
  <div
    class="ui-divider ui-divider--labelled {klass}"
    data-align={align}
    style:--divider-spacing="{spacing}px"
    {...rest}
  >
    <span class="ui-divider__line"></span>
    <span class="ui-divider__label">{@render children()}</span>
    <span class="ui-divider__line"></span>
  </div>
{:else}
  <div
    class="ui-divider {klass}"
    role="separator"
    aria-orientation={orientation}
    data-orientation={orientation}
    style:--divider-spacing="{spacing}px"
    {...rest}
  ></div>
{/if}

<style>
  .ui-divider[data-orientation="horizontal"] {
    width: 100%;
    height: 1px;
    background: var(--ui-border-default);
    margin-block: var(--divider-spacing);
  }
  .ui-divider[data-orientation="vertical"] {
    width: 1px;
    align-self: stretch;
    min-height: 1em;
    background: var(--ui-border-default);
    margin-inline: var(--divider-spacing);
  }

  .ui-divider--labelled {
    display: flex;
    align-items: center;
    gap: var(--ui-space-6);
    width: 100%;
    margin-block: var(--divider-spacing);
  }
  .ui-divider__line {
    height: 1px;
    background: var(--ui-border-default);
    flex: 1;
  }
  /* Alignment works by collapsing the line on one side rather than by
     justifying, so the label keeps its gutters either way. */
  .ui-divider--labelled[data-align="start"] .ui-divider__line:first-child { flex: 0 0 var(--ui-space-8); }
  .ui-divider--labelled[data-align="end"] .ui-divider__line:last-child { flex: 0 0 var(--ui-space-8); }

  .ui-divider__label {
    font-size: var(--ui-text-xs);
    font-weight: var(--ui-label-weight);
    color: var(--ui-fg-subtle);
    white-space: nowrap;
  }
</style>
