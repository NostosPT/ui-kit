<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Single-choice control for short, mutually exclusive options — timeframes,
   * billing periods, view modes. Above roughly six options, or with long
   * labels, a Select is the better tool.
   *
   * Exposed as a radiogroup rather than tabs: it selects a value, it does not
   * swap a panel. Arrow keys move the selection, matching native radio
   * behaviour, and only the active button is in the tab order.
   */
  let {
    items = [],
    value = $bindable(undefined),
    size = "md",
    variant = "solid",
    block = false,
    disabled = false,
    ariaLabel = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  let listEl = $state(null);
  let indicator = $state({ x: 0, w: 0, ready: false });

  const options = $derived(
    items.map((i) => (typeof i === "string" ? { value: i, label: i } : i))
  );
  const activeIndex = $derived(Math.max(0, options.findIndex((o) => o.value === value)));

  function select(option) {
    if (disabled || option.disabled || option.value === value) return;
    value = option.value;
    onchange?.(option.value);
  }

  function onkeydown(event) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();

    // Skip disabled options, and wrap — a segmented control is a closed set.
    let next = activeIndex;
    for (let i = 0; i < options.length; i += 1) {
      next = (next + step + options.length) % options.length;
      if (!options[next].disabled) break;
    }
    select(options[next]);
    listEl?.querySelectorAll("[role='radio']")[next]?.focus();
  }

  /* The indicator is measured rather than computed from a percentage so that
     options of different widths ("15M" vs "Annually") still get an exact fit.
     Measuring on every relevant change — including font load and container
     resize — is what keeps it from drifting. */
  $effect(() => {
    if (!listEl) return;
    void value;
    void options;

    const measure = () => {
      const el = listEl.querySelectorAll("[role='radio']")[activeIndex];
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

<div
  bind:this={listEl}
  class="ui-segmented {klass}"
  role="radiogroup"
  aria-label={ariaLabel}
  aria-disabled={disabled || undefined}
  data-size={size}
  data-variant={variant}
  data-block={block || undefined}
  style:--seg-x="{indicator.x}px"
  style:--seg-w="{indicator.w}px"
  {onkeydown}
  {...rest}
>
  <span class="ui-segmented__indicator" data-ready={indicator.ready || undefined} aria-hidden="true"></span>

  {#each options as option (option.value)}
    {@const active = option.value === value}
    <button
      type="button"
      role="radio"
      class="ui-segmented__item"
      aria-checked={active}
      disabled={disabled || option.disabled}
      tabindex={active ? 0 : -1}
      onclick={() => select(option)}
    >
      {#if option.icon}<Icon name={option.icon} size={size === "lg" ? 18 : 16} />{/if}
      <span>{option.label ?? option.value}</span>
    </button>
  {/each}
</div>

<style>
  .ui-segmented {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--seg-gap);
    padding: var(--seg-pad);
    background: var(--ui-bg-muted);
    border-radius: var(--seg-radius);
    isolation: isolate;
  }
  .ui-segmented[data-block] {
    display: flex;
    width: 100%;
  }
  .ui-segmented[data-block] .ui-segmented__item {
    flex: 1;
  }

  /* The track, not the segment, is the control: a segment sits one step down
     the height scale and the track's padding makes up the difference, so an
     md segmented control is exactly as tall as an md Button beside it
     (34 + 3 + 3 = 40) instead of being a third shorter. */
  .ui-segmented[data-size="sm"] {
    --seg-h: var(--ui-control-h-xs);
    --seg-px: var(--ui-control-px-xs);
    --seg-fs: var(--ui-text-sm);
    --seg-pad: 3px;
    --seg-gap: 2px;
    --seg-radius: var(--ui-control-radius-sm);
  }
  .ui-segmented[data-size="md"] {
    --seg-h: var(--ui-control-h-sm);
    --seg-px: var(--ui-control-px-sm);
    --seg-fs: var(--ui-text-md);
    --seg-pad: 3px;
    --seg-gap: 2px;
    --seg-radius: var(--ui-control-radius-md);
  }
  .ui-segmented[data-size="lg"] {
    --seg-h: var(--ui-control-h-md);
    --seg-px: var(--ui-control-px-md);
    --seg-fs: var(--ui-text-base);
    --seg-pad: 4px;
    --seg-gap: 2px;
    --seg-radius: var(--ui-control-radius-lg);
  }

  .ui-segmented__item {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ui-control-gap-sm);
    height: var(--seg-h);
    padding-inline: var(--seg-px);
    border-radius: calc(var(--seg-radius) - var(--seg-pad));
    font-size: var(--seg-fs);
    font-weight: var(--ui-control-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    color: var(--ui-fg-muted);
    white-space: nowrap;
    transition: color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-segmented__item:hover:not(:disabled):not([aria-checked="true"]) {
    color: var(--ui-fg-default);
  }
  .ui-segmented__item[aria-checked="true"] {
    color: var(--ui-fg-default);
  }
  .ui-segmented__item:disabled {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
  }
  .ui-segmented__item:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -1px;
  }

  .ui-segmented__indicator {
    position: absolute;
    z-index: 0;
    top: var(--seg-pad);
    left: 0;
    height: var(--seg-h);
    width: var(--seg-w);
    transform: translateX(var(--seg-x));
    border-radius: calc(var(--seg-radius) - var(--seg-pad));
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    /* No transition until the first measurement lands, or the indicator
       visibly slides in from the left edge on mount. */
    opacity: 0;
  }
  .ui-segmented__indicator[data-ready] {
    opacity: 1;
    transition:
      transform var(--ui-duration-normal) var(--ui-ease-out),
      width var(--ui-duration-normal) var(--ui-ease-out);
  }

  .ui-segmented[data-variant="accent"] .ui-segmented__indicator {
    background: var(--ui-accent-soft);
    box-shadow: none;
  }
  .ui-segmented[data-variant="accent"] .ui-segmented__item[aria-checked="true"] {
    color: var(--ui-accent-text);
  }

  .ui-segmented[data-variant="ghost"] {
    background: transparent;
    padding: 0;
    gap: var(--ui-space-2);
  }
  .ui-segmented[data-variant="ghost"] .ui-segmented__indicator {
    top: 0;
    background: var(--ui-bg-muted);
    box-shadow: none;
  }
</style>
