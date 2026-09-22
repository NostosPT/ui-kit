<script>
  import { getTabsContext } from "./Tabs.svelte";

  /**
   * Reads the active value from Tabs context, so a panel only needs to know
   * its own value. Inactive panels are removed rather than hidden — keeping
   * them mounted is the caller's decision via `keepMounted`, since it costs
   * memory and can fire duplicate effects.
   */
  let { value, keepMounted = false, class: klass = "", children, ...rest } = $props();

  const ctx = getTabsContext();
  const active = $derived(ctx?.value === value);
</script>

{#if active || keepMounted}
  <div
    class="ui-tab-panel {klass}"
    role="tabpanel"
    id={`${ctx?.baseId}-panel-${value}`}
    aria-labelledby={`${ctx?.baseId}-tab-${value}`}
    hidden={!active}
    tabindex="0"
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}

<style>
  .ui-tab-panel {
    padding-top: var(--ui-space-8);
    min-width: 0;
  }
  .ui-tab-panel:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: 2px;
  }
</style>
