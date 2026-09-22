<script>
  /**
   * Loading placeholder. Defaults to a text line whose height follows the
   * current line box, so a skeleton dropped into a paragraph occupies exactly
   * the space the real text will.
   */
  let {
    variant = "text",
    width = undefined,
    height = undefined,
    lines = 1,
    radius = undefined,
    animated = true,
    class: klass = "",
    ...rest
  } = $props();
</script>

{#if variant === "text" && lines > 1}
  <div class="ui-skeleton-stack" {...rest}>
    {#each Array(lines) as _, i (i)}
      <span
        class="ui-skeleton {klass}"
        data-variant="text"
        data-animated={animated || undefined}
        aria-hidden="true"
        style:width={i === lines - 1 ? "62%" : width}
      ></span>
    {/each}
  </div>
{:else}
  <span
    class="ui-skeleton {klass}"
    data-variant={variant}
    data-animated={animated || undefined}
    aria-hidden="true"
    style:width
    style:height
    style:border-radius={radius}
    {...rest}
  ></span>
{/if}

<style>
  .ui-skeleton-stack {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-3);
    width: 100%;
  }

  .ui-skeleton {
    display: block;
    background: var(--ui-bg-muted);
    border-radius: var(--ui-radius-sm);
  }
  .ui-skeleton[data-variant="text"] {
    width: 100%;
    /* Slightly under the line box: a full-height block reads as a bar, while
       ~62% reads as a line of text. */
    height: 0.62lh;
    margin-block: 0.19lh;
    border-radius: var(--ui-radius-xs);
  }
  .ui-skeleton[data-variant="circle"] {
    border-radius: var(--ui-radius-full);
    aspect-ratio: 1;
  }
  .ui-skeleton[data-variant="rect"] {
    border-radius: var(--ui-radius-lg);
  }

  /* A sweep rather than an opacity pulse: it reads as "work in progress"
     instead of "this element is disabled". */
  .ui-skeleton[data-animated] {
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in oklab, var(--ui-bg-surface) 70%, transparent) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: ui-skeleton-sweep 1.5s var(--ui-ease-in-out) infinite;
  }
  @keyframes ui-skeleton-sweep {
    from { background-position: -120% 0; }
    to { background-position: 220% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-skeleton[data-animated] { animation: none; }
  }
</style>
