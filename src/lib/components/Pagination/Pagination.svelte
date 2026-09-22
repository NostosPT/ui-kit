<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Page control with an elision algorithm that keeps the rendered width
   * constant: first page, last page, a window around the current page, and
   * ellipses in the gaps. A naive "show 1..n" list reflows the surrounding
   * toolbar every time the page changes.
   */
  let {
    page = $bindable(1),
    total = 1,
    siblings = 1,
    size = "md",
    showEdges = true,
    compact = false,
    ariaLabel = "Pagination",
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const pages = $derived.by(() => {
    if (total <= 1) return [1];

    // 2 edges + 2 ellipses + current + siblings on both sides.
    const maxSlots = siblings * 2 + 5;
    if (total <= maxSlots) return Array.from({ length: total }, (_, i) => i + 1);

    const left = Math.max(page - siblings, 1);
    const right = Math.min(page + siblings, total);
    const showLeftGap = left > 2;
    const showRightGap = right < total - 1;

    // When only one side is elided, spend the reclaimed slots widening the
    // window rather than leaving a short row.
    if (!showLeftGap && showRightGap) {
      const count = siblings * 2 + 3;
      return [...Array.from({ length: count }, (_, i) => i + 1), "…", total];
    }
    if (showLeftGap && !showRightGap) {
      const count = siblings * 2 + 3;
      return [1, "…", ...Array.from({ length: count }, (_, i) => total - count + 1 + i)];
    }
    return [1, "…", ...Array.from({ length: right - left + 1 }, (_, i) => left + i), "…", total];
  });

  function go(next) {
    const clamped = Math.min(Math.max(next, 1), total);
    if (clamped === page) return;
    page = clamped;
    onchange?.(clamped);
  }
</script>

<nav class="ui-pagination {klass}" aria-label={ariaLabel} data-size={size} {...rest}>
  <button
    type="button"
    class="ui-pagination__nav"
    disabled={page <= 1}
    aria-label="Previous page"
    onclick={() => go(page - 1)}
  >
    <Icon name="chevron-left" size={size === "sm" ? 14 : 16} />
    {#if !compact}<span class="ui-pagination__nav-label">Previous</span>{/if}
  </button>

  {#if showEdges && !compact}
    <ul class="ui-pagination__pages">
      {#each pages as item, i (`${item}-${i}`)}
        {#if item === "…"}
          <li class="ui-pagination__gap" aria-hidden="true">…</li>
        {:else}
          <li>
            <button
              type="button"
              class="ui-pagination__page"
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              onclick={() => go(item)}
            >
              {item}
            </button>
          </li>
        {/if}
      {/each}
    </ul>
  {:else}
    <span class="ui-pagination__status">Page {page} of {total}</span>
  {/if}

  <button
    type="button"
    class="ui-pagination__nav"
    disabled={page >= total}
    aria-label="Next page"
    onclick={() => go(page + 1)}
  >
    {#if !compact}<span class="ui-pagination__nav-label">Next</span>{/if}
    <Icon name="chevron-right" size={size === "sm" ? 14 : 16} />
  </button>
</nav>

<style>
  .ui-pagination {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
  }
  .ui-pagination[data-size="sm"] { --pg-size: 28px; --pg-fs: var(--ui-text-sm); }
  .ui-pagination[data-size="md"] { --pg-size: 34px; --pg-fs: var(--ui-text-md); }
  .ui-pagination[data-size="lg"] { --pg-size: 40px; --pg-fs: var(--ui-text-base); }

  .ui-pagination__pages {
    display: flex;
    align-items: center;
    gap: var(--ui-space-1);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ui-pagination__nav,
  .ui-pagination__page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ui-space-3);
    min-width: var(--pg-size);
    height: var(--pg-size);
    padding-inline: var(--ui-space-4);
    border: 1px solid transparent;
    border-radius: var(--ui-radius-md);
    font-size: var(--pg-fs);
    font-weight: var(--ui-weight-medium);
    font-variant-numeric: tabular-nums;
    color: var(--ui-fg-muted);
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out);
  }

  .ui-pagination__nav {
    border-color: var(--ui-border-default);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    color: var(--ui-fg-default);
  }
  .ui-pagination__nav:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    border-color: var(--ui-border-strong);
  }
  .ui-pagination__nav:disabled {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
    box-shadow: none;
  }
  .ui-pagination__nav-label {
    font-size: var(--pg-fs);
  }

  .ui-pagination__page:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-pagination__page[aria-current="page"] {
    background: var(--ui-accent-soft);
    color: var(--ui-accent-text);
  }

  .ui-pagination__gap {
    min-width: var(--pg-size);
    text-align: center;
    color: var(--ui-fg-faint);
    font-size: var(--pg-fs);
    /* Pull the baseline up: a literal ellipsis sits low in most faces. */
    line-height: 1;
    padding-bottom: 4px;
  }

  .ui-pagination__status {
    font-size: var(--pg-fs);
    color: var(--ui-fg-muted);
    font-variant-numeric: tabular-nums;
    padding-inline: var(--ui-space-2);
  }
</style>
