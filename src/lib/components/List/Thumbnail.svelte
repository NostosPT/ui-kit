<script>
  import Icon from "../Icon/Icon.svelte";

  /** Small media preview with an icon fallback for non-image files. */
  let {
    src = undefined,
    alt = "",
    icon = "file",
    size = 32,
    radius = "sm",
    class: klass = "",
    ...rest
  } = $props();

  let failed = $state(false);
</script>

<span
  class="ui-thumb {klass}"
  data-radius={radius}
  style:--thumb-size="{size}px"
  {...rest}
>
  {#if src && !failed}
    <img {src} {alt} onerror={() => (failed = true)} />
  {:else}
    <Icon name={icon} size={Math.round(size * 0.45)} />
  {/if}
</span>

<style>
  .ui-thumb {
    display: grid;
    place-items: center;
    flex: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    overflow: hidden;
    background: var(--ui-bg-muted);
    color: var(--ui-fg-faint);
    /* An inset hairline rather than a border keeps the image at its full
       declared size — a border would shrink the picture by two pixels. */
    box-shadow: inset 0 0 0 1px var(--ui-border-subtle);
  }
  .ui-thumb[data-radius="sm"] { border-radius: var(--ui-radius-sm); }
  .ui-thumb[data-radius="md"] { border-radius: var(--ui-radius-md); }
  .ui-thumb[data-radius="lg"] { border-radius: var(--ui-radius-lg); }
  .ui-thumb[data-radius="full"] { border-radius: var(--ui-radius-full); }

  .ui-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
