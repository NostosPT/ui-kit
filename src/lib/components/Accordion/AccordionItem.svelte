<script>
  import { slide } from "svelte/transition";
  import Icon from "../Icon/Icon.svelte";
  import { getAccordionContext } from "./Accordion.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * One disclosure row. The reference uses the shape with an icon tile, a
   * title, a trailing value and a chevron — the "Custom Domain · $2.99" row —
   * so `value` and `icon` are first-class rather than slot-only.
   */
  let {
    id = undefined,
    title = undefined,
    subtitle = undefined,
    value = undefined,
    icon = undefined,
    disabled = false,
    class: klass = "",
    header,
    children,
    ...rest
  } = $props();

  const fallbackId = uid("acc");
  const itemId = $derived(id ?? fallbackId);
  const ctx = getAccordionContext();
  const open = $derived(ctx?.isOpen(itemId) ?? false);
</script>

<div class="ui-accordion-item {klass}" data-open={open || undefined} {...rest}>
  <h3 class="ui-accordion-item__heading">
    <button
      type="button"
      class="ui-accordion-item__trigger"
      id={`${itemId}-trigger`}
      aria-expanded={open}
      aria-controls={`${itemId}-panel`}
      {disabled}
      onclick={() => ctx?.toggle(itemId)}
    >
      {#if icon}
        <span class="ui-accordion-item__icon"><Icon name={icon} size={16} /></span>
      {/if}

      <span class="ui-accordion-item__text">
        {#if header}
          {@render header({ open })}
        {:else}
          <span class="ui-accordion-item__title">{title}</span>
          {#if subtitle}<span class="ui-accordion-item__subtitle">{subtitle}</span>{/if}
        {/if}
      </span>

      {#if value != null}<span class="ui-accordion-item__value">{value}</span>{/if}
      <span class="ui-accordion-item__chevron"><Icon name="chevron-down" size={16} /></span>
    </button>
  </h3>

  {#if open}
    <div
      class="ui-accordion-item__panel"
      id={`${itemId}-panel`}
      role="region"
      aria-labelledby={`${itemId}-trigger`}
      transition:slide={{ duration: 180 }}
    >
      <div class="ui-accordion-item__content">{@render children?.()}</div>
    </div>
  {/if}
</div>

<style>
  .ui-accordion-item {
    min-width: 0;
  }
  :global(.ui-accordion[data-variant="separated"]) .ui-accordion-item {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    overflow: hidden;
  }
  :global(.ui-accordion[data-variant="separated"]) .ui-accordion-item[data-open] {
    border-color: var(--ui-border-strong);
  }

  .ui-accordion-item__heading {
    margin: 0;
    font: inherit;
  }
  .ui-accordion-item__trigger {
    display: flex;
    align-items: center;
    gap: var(--ui-space-6);
    width: 100%;
    padding: var(--ui-space-7) var(--ui-space-8);
    text-align: start;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-accordion-item__trigger:hover:not(:disabled) {
    background: var(--ui-bg-hover);
  }
  .ui-accordion-item__trigger:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .ui-accordion-item__trigger:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -2px;
  }

  .ui-accordion-item__icon {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-md);
    height: var(--ui-control-h-md);
    flex: none;
    border-radius: var(--ui-control-radius-md);
    background: var(--ui-accent-soft);
    color: var(--ui-accent-text);
  }

  .ui-accordion-item__text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }
  .ui-accordion-item__title {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
  }
  .ui-accordion-item__subtitle {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
  .ui-accordion-item__value {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-numeric-weight);
    font-variant-numeric: tabular-nums;
    flex: none;
  }

  .ui-accordion-item__chevron {
    display: flex;
    flex: none;
    color: var(--ui-fg-faint);
    transition: transform var(--ui-duration-normal) var(--ui-ease-out);
  }
  .ui-accordion-item[data-open] .ui-accordion-item__chevron {
    transform: rotate(180deg);
  }

  /* Padding lives on an inner element so the slide transition animates a
     clean height — animating a box with its own vertical padding jumps. */
  .ui-accordion-item__content {
    padding: 0 var(--ui-space-8) var(--ui-space-8);
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
</style>
