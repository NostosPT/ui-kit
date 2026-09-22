<script>
  /**
   * One row: optional leading control, media, a title/description stack,
   * arbitrary metadata columns, and trailing actions.
   *
   * The same component covers the file rows, the invited-people rows and the
   * follow list in the reference — they differ only in what goes in the slots,
   * which is the argument for one row component rather than three.
   */
  let {
    title = undefined,
    description = undefined,
    href = undefined,
    selected = false,
    disabled = false,
    interactive = false,
    align = "center",
    padding = "md",
    class: klass = "",
    leading,
    media,
    meta,
    trailing,
    children,
    onclick,
    ...rest
  } = $props();

  const tag = $derived(href ? "a" : interactive || onclick ? "div" : "div");
  const clickable = $derived(Boolean(href || onclick || interactive));
</script>

<svelte:element
  this={tag}
  class="ui-list-item {klass}"
  data-selected={selected || undefined}
  data-disabled={disabled || undefined}
  data-clickable={clickable || undefined}
  data-align={align}
  data-padding={padding}
  href={tag === "a" ? href : undefined}
  role={clickable && tag !== "a" ? "button" : undefined}
  tabindex={clickable && tag !== "a" ? 0 : undefined}
  onclick={disabled ? undefined : onclick}
  {...rest}
>
  {#if leading}<div class="ui-list-item__leading">{@render leading()}</div>{/if}
  {#if media}<div class="ui-list-item__media">{@render media()}</div>{/if}

  <div class="ui-list-item__text">
    {#if title}<span class="ui-list-item__title">{title}</span>{/if}
    {#if description}<span class="ui-list-item__desc">{description}</span>{/if}
    {@render children?.()}
  </div>

  {#if meta}<div class="ui-list-item__meta">{@render meta()}</div>{/if}
  {#if trailing}<div class="ui-list-item__trailing">{@render trailing()}</div>{/if}
</svelte:element>

<style>
  .ui-list-item {
    display: flex;
    align-items: center;
    gap: var(--ui-space-6);
    min-width: 0;
    color: inherit;
    text-decoration: none;
    background: transparent;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-list-item[data-align="start"] { align-items: flex-start; }

  .ui-list-item[data-padding="sm"] { padding: var(--ui-space-4) var(--ui-space-6); }
  .ui-list-item[data-padding="md"] { padding: var(--ui-space-5) var(--ui-space-7); }
  .ui-list-item[data-padding="lg"] { padding: var(--ui-space-7) var(--ui-space-8); }
  .ui-list-item[data-padding="none"] { padding: 0; }

  .ui-list-item[data-clickable] {
    cursor: pointer;
  }
  .ui-list-item[data-clickable]:hover {
    background: var(--ui-bg-hover);
  }
  .ui-list-item[data-selected] {
    background: var(--ui-bg-selected);
  }
  .ui-list-item[data-disabled] {
    opacity: 0.55;
    pointer-events: none;
  }
  .ui-list-item:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -2px;
  }

  .ui-list-item__leading,
  .ui-list-item__media,
  .ui-list-item__trailing {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    flex: none;
  }
  .ui-list-item__trailing {
    margin-inline-start: auto;
  }

  .ui-list-item__text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    flex: 1;
  }
  .ui-list-item__title {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-default);
    letter-spacing: var(--ui-tracking-snug);
    /* Filenames and emails are the common content here and both are long and
       unbreakable, so truncation is the default rather than an opt-in. */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-list-item__desc {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ui-list-item__meta {
    display: flex;
    align-items: center;
    gap: var(--ui-space-8);
    flex: none;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
</style>
