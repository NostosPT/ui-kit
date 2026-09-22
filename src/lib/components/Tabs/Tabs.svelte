<script module>
  import { getContext, setContext } from "svelte";
  const KEY = Symbol("ui-tabs");
  export const getTabsContext = () => getContext(KEY);
  export const setTabsContext = (ctx) => setContext(KEY, ctx);
</script>

<script>
  import Icon from "../Icon/Icon.svelte";
  import Badge from "../Badge/Badge.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * Tablist plus optional panels. Unlike SegmentedControl this *does* swap
   * content, so it carries the full tab ARIA contract: roving tabindex, arrow
   * / Home / End keys, and `aria-controls` pointing at the live panel.
   *
   * Panels are rendered as children so they can share context:
   *
   *   <Tabs {items} bind:value>
   *     <TabPanel value="share">…</TabPanel>
   *   </Tabs>
   */
  let {
    items = [],
    value = $bindable(undefined),
    variant = "underline",
    size = "md",
    align = "start",
    block = false,
    ariaLabel = undefined,
    class: klass = "",
    children,
    onchange,
    ...rest
  } = $props();

  const baseId = uid("tabs");
  let listEl = $state(null);
  let indicator = $state({ x: 0, w: 0, ready: false });

  const options = $derived(
    items.map((i) => (typeof i === "string" ? { value: i, label: i } : i))
  );
  const activeIndex = $derived(Math.max(0, options.findIndex((o) => o.value === value)));

  setTabsContext({
    get value() {
      return value;
    },
    baseId
  });

  function select(option) {
    if (option.disabled || option.value === value) return;
    value = option.value;
    onchange?.(option.value);
  }

  function onkeydown(event) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    let next = null;

    if (step) {
      next = activeIndex;
      for (let i = 0; i < options.length; i += 1) {
        next = (next + step + options.length) % options.length;
        if (!options[next].disabled) break;
      }
    } else if (event.key === "Home") {
      next = options.findIndex((o) => !o.disabled);
    } else if (event.key === "End") {
      next = options.findLastIndex((o) => !o.disabled);
    }

    if (next == null || next < 0) return;
    event.preventDefault();
    select(options[next]);
    listEl?.querySelectorAll("[role='tab']")[next]?.focus();
  }

  $effect(() => {
    if (!listEl || variant === "enclosed") return;
    void value;
    void options;

    const measure = () => {
      const el = listEl.querySelectorAll("[role='tab']")[activeIndex];
      if (!el) return;
      indicator = { x: el.offsetLeft, w: el.offsetWidth, ready: true };
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(listEl);
    for (const el of listEl.children) ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  });
</script>

<div class="ui-tabs {klass}" data-variant={variant} data-size={size} {...rest}>
  <!-- Focus roves across the tabs themselves, so the tablist is not focusable. -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    bind:this={listEl}
    class="ui-tabs__list"
    role="tablist"
    aria-label={ariaLabel}
    data-align={align}
    data-block={block || undefined}
    style:--tab-x="{indicator.x}px"
    style:--tab-w="{indicator.w}px"
    {onkeydown}
  >
    {#if variant !== "enclosed"}
      <span class="ui-tabs__indicator" data-ready={indicator.ready || undefined} aria-hidden="true"></span>
    {/if}

    {#each options as option (option.value)}
      {@const active = option.value === value}
      <button
        type="button"
        role="tab"
        class="ui-tabs__tab"
        id={`${baseId}-tab-${option.value}`}
        aria-selected={active}
        aria-controls={`${baseId}-panel-${option.value}`}
        disabled={option.disabled}
        tabindex={active ? 0 : -1}
        onclick={() => select(option)}
      >
        {#if option.icon}<Icon name={option.icon} size={size === "sm" ? 14 : 16} />{/if}
        <span>{option.label ?? option.value}</span>
        {#if option.count != null}
          <Badge size="sm" tone={active ? "accent" : "neutral"}>{option.count}</Badge>
        {/if}
      </button>
    {/each}
  </div>

  {@render children?.()}
</div>

<style>
  .ui-tabs {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .ui-tabs__list {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--tab-gap);
    min-width: 0;
    isolation: isolate;
    /* Tab rows overflow on narrow screens far more often than designs admit;
       scrolling beats wrapping because it preserves the indicator geometry. */
    overflow-x: auto;
    scrollbar-width: none;
  }
  .ui-tabs__list::-webkit-scrollbar {
    display: none;
  }
  .ui-tabs__list[data-align="center"] { justify-content: center; }
  .ui-tabs__list[data-align="end"] { justify-content: flex-end; }
  .ui-tabs__list[data-block] > .ui-tabs__tab { flex: 1; }

  .ui-tabs[data-size="sm"] { --tab-h: var(--ui-control-h-sm); --tab-px: var(--ui-control-px-sm); --tab-fs: var(--ui-text-sm); --tab-gap: var(--ui-space-2); }
  .ui-tabs[data-size="md"] { --tab-h: var(--ui-control-h-md); --tab-px: var(--ui-control-px-md); --tab-fs: var(--ui-text-md); --tab-gap: var(--ui-space-3); }
  .ui-tabs[data-size="lg"] { --tab-h: var(--ui-control-h-lg); --tab-px: var(--ui-control-px-lg); --tab-fs: var(--ui-text-base); --tab-gap: var(--ui-space-4); }

  .ui-tabs__tab {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ui-space-3);
    height: var(--tab-h);
    padding-inline: var(--tab-px);
    font-size: var(--tab-fs);
    font-weight: var(--ui-weight-medium);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    color: var(--ui-fg-muted);
    white-space: nowrap;
    border-radius: var(--ui-radius-md);
    transition: color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-tabs__tab:hover:not(:disabled) { color: var(--ui-fg-default); }
  .ui-tabs__tab[aria-selected="true"] { color: var(--ui-fg-default); }
  .ui-tabs__tab:disabled { color: var(--ui-fg-faint); cursor: not-allowed; }
  .ui-tabs__tab:focus-visible { outline: 2px solid var(--ui-accent-solid); outline-offset: -2px; }

  .ui-tabs__indicator {
    position: absolute;
    z-index: 0;
    left: 0;
    width: var(--tab-w);
    transform: translateX(var(--tab-x));
    opacity: 0;
  }
  .ui-tabs__indicator[data-ready] {
    opacity: 1;
    transition:
      transform var(--ui-duration-normal) var(--ui-ease-out),
      width var(--ui-duration-normal) var(--ui-ease-out);
  }

  /* --- underline ------------------------------------------------------- */
  .ui-tabs[data-variant="underline"] .ui-tabs__list {
    box-shadow: inset 0 -1px 0 var(--ui-border-default);
  }
  .ui-tabs[data-variant="underline"] .ui-tabs__indicator {
    bottom: 0;
    height: 2px;
    background: var(--ui-accent-solid);
    border-radius: var(--ui-radius-full) var(--ui-radius-full) 0 0;
  }
  .ui-tabs[data-variant="underline"] .ui-tabs__tab[aria-selected="true"] {
    color: var(--ui-accent-text);
  }

  /* --- pill -------------------------------------------------------------
     The treatment used in the reference share card: a tinted track with a
     white chip riding under the active label. */
  .ui-tabs[data-variant="pill"] .ui-tabs__list {
    background: var(--ui-bg-muted);
    border-radius: var(--ui-radius-lg);
    padding: 3px;
  }
  .ui-tabs[data-variant="pill"] .ui-tabs__indicator {
    top: 3px;
    height: calc(var(--tab-h) - 0px);
    background: var(--ui-bg-surface);
    border-radius: var(--ui-radius-md);
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-tabs[data-variant="pill"] { --tab-h: var(--ui-control-h-sm); }
  .ui-tabs[data-variant="pill"][data-size="lg"] { --tab-h: var(--ui-control-h-md); }

  /* --- enclosed --------------------------------------------------------- */
  .ui-tabs[data-variant="enclosed"] .ui-tabs__list {
    gap: 0;
    box-shadow: inset 0 -1px 0 var(--ui-border-default);
  }
  .ui-tabs[data-variant="enclosed"] .ui-tabs__tab {
    border: 1px solid transparent;
    border-radius: var(--ui-radius-md) var(--ui-radius-md) 0 0;
    margin-bottom: -1px;
  }
  .ui-tabs[data-variant="enclosed"] .ui-tabs__tab[aria-selected="true"] {
    background: var(--ui-bg-surface);
    border-color: var(--ui-border-default);
    border-bottom-color: var(--ui-bg-surface);
  }
</style>
