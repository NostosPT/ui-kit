<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Trail of ancestors. Collapses the middle when the path is deep, keeping
   * the root and the last two levels — the parts people actually navigate to.
   */
  let {
    items = [],
    separator = "chevron-right",
    maxItems = 0,
    size = "md",
    ariaLabel = "Breadcrumb",
    class: klass = "",
    ...rest
  } = $props();

  const shown = $derived.by(() => {
    if (!maxItems || items.length <= maxItems) return items;
    return [items[0], { ellipsis: true }, ...items.slice(-2)];
  });
</script>

<nav class="ui-breadcrumb {klass}" aria-label={ariaLabel} data-size={size} {...rest}>
  <ol class="ui-breadcrumb__list">
    {#each shown as item, i (item.ellipsis ? "gap" : (item.href ?? item.label) + i)}
      {#if i > 0}
        <li class="ui-breadcrumb__sep" aria-hidden="true"><Icon name={separator} size={13} /></li>
      {/if}
      <li>
        {#if item.ellipsis}
          <span class="ui-breadcrumb__gap">…</span>
        {:else if item.href && i < shown.length - 1}
          <a class="ui-breadcrumb__link" href={item.href}>
            {#if item.icon}<Icon name={item.icon} size={14} />{/if}
            {item.label}
          </a>
        {:else}
          <span class="ui-breadcrumb__current" aria-current={i === shown.length - 1 ? "page" : undefined}>
            {#if item.icon}<Icon name={item.icon} size={14} />{/if}
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .ui-breadcrumb[data-size="sm"] { --crumb-fs: var(--ui-text-sm); }
  .ui-breadcrumb[data-size="md"] { --crumb-fs: var(--ui-text-md); }

  .ui-breadcrumb__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--ui-space-2);
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: var(--crumb-fs);
  }
  .ui-breadcrumb__list > li {
    display: flex;
    align-items: center;
  }

  .ui-breadcrumb__link,
  .ui-breadcrumb__current,
  .ui-breadcrumb__gap {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-1) var(--ui-space-3);
    border-radius: var(--ui-radius-sm);
    letter-spacing: var(--ui-tracking-snug);
  }
  .ui-breadcrumb__link {
    color: var(--ui-fg-muted);
    text-decoration: none;
    transition:
      color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-breadcrumb__link:hover {
    color: var(--ui-fg-default);
    background: var(--ui-bg-hover);
  }
  .ui-breadcrumb__current {
    color: var(--ui-fg-default);
    font-weight: var(--ui-weight-medium);
  }
  .ui-breadcrumb__gap {
    color: var(--ui-fg-faint);
  }
  .ui-breadcrumb__sep {
    color: var(--ui-fg-faint);
  }
</style>
