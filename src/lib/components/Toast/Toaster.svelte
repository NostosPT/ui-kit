<script>
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Icon from "../Icon/Icon.svelte";
  import Button from "../Button/Button.svelte";
  import { toasts, dismiss } from "./toast.svelte.js";

  /**
   * Renders the queue. Mount once, near the root of the app.
   *
   * The region is `aria-live="polite"` and, crucially, is present in the DOM
   * before any toast exists — live regions added at the same time as their
   * content are frequently not announced at all.
   */
  let {
    position = "bottom-right",
    max = 4,
    class: klass = "",
    ...rest
  } = $props();

  const ICONS = {
    success: "check-circle",
    danger: "alert-circle",
    warning: "alert-triangle",
    info: "info",
    neutral: "info"
  };

  const shown = $derived(toasts.items.slice(-max));
  const fromBottom = $derived(position.startsWith("bottom"));
</script>

<div
  class="ui-toaster {klass}"
  data-position={position}
  role="region"
  aria-label="Notifications"
  aria-live="polite"
  {...rest}
>
  {#each shown as item (item.id)}
    <div
      class="ui-toast"
      data-tone={item.tone}
      animate:flip={{ duration: 200 }}
      in:fly={{ y: fromBottom ? 16 : -16, duration: 220 }}
      out:fly={{ y: fromBottom ? 16 : -16, duration: 160 }}
    >
      <span class="ui-toast__icon"><Icon name={ICONS[item.tone] ?? "info"} size={16} /></span>

      <div class="ui-toast__body">
        {#if item.title}<p class="ui-toast__title">{item.title}</p>{/if}
        {#if item.description}<p class="ui-toast__desc">{item.description}</p>{/if}
      </div>

      {#if item.action}
        <Button size="xs" variant="ghost" tone="accent" onclick={() => { item.action.onclick?.(); dismiss(item.id); }}>
          {item.action.label}
        </Button>
      {/if}

      <button type="button" class="ui-toast__close" aria-label="Dismiss" onclick={() => dismiss(item.id)}>
        <Icon name="x" size={14} />
      </button>
    </div>
  {/each}
</div>

<style>
  .ui-toaster {
    position: fixed;
    z-index: var(--ui-z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-4);
    width: min(380px, calc(100vw - 32px));
    /* The container spans the stack but must not block the page beneath it;
       each toast re-enables pointer events for itself. */
    pointer-events: none;
  }
  .ui-toaster > :global(*) {
    pointer-events: auto;
  }

  .ui-toaster[data-position="bottom-right"] { bottom: 16px; right: 16px; }
  .ui-toaster[data-position="bottom-left"] { bottom: 16px; left: 16px; }
  .ui-toaster[data-position="bottom-center"] { bottom: 16px; left: 50%; transform: translateX(-50%); }
  .ui-toaster[data-position="top-right"] { top: 16px; right: 16px; }
  .ui-toaster[data-position="top-left"] { top: 16px; left: 16px; }
  .ui-toaster[data-position="top-center"] { top: 16px; left: 50%; transform: translateX(-50%); }

  .ui-toast {
    display: flex;
    align-items: flex-start;
    gap: var(--ui-space-5);
    padding: var(--ui-space-6) var(--ui-space-6);
    background: var(--ui-bg-raised);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    box-shadow: var(--ui-shadow-lg);
    font-size: var(--ui-text-md);
  }

  .ui-toast__icon {
    display: flex;
    flex: none;
    margin-top: calc((1lh - 16px) / 2);
    color: var(--ui-fg-subtle);
  }
  .ui-toast[data-tone="success"] .ui-toast__icon { color: var(--ui-success-solid); }
  .ui-toast[data-tone="danger"] .ui-toast__icon { color: var(--ui-danger-solid); }
  .ui-toast[data-tone="warning"] .ui-toast__icon { color: var(--ui-warning-solid); }
  .ui-toast[data-tone="info"] .ui-toast__icon { color: var(--ui-info-solid); }

  .ui-toast__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-1);
  }
  .ui-toast__title {
    margin: 0;
    font-weight: var(--ui-weight-medium);
    letter-spacing: var(--ui-tracking-snug);
    line-height: var(--ui-leading-snug);
  }
  .ui-toast__desc {
    margin: 0;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-muted);
    line-height: var(--ui-leading-snug);
  }

  .ui-toast__close {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    flex: none;
    margin: -2px -2px 0 0;
    border-radius: var(--ui-radius-sm);
    color: var(--ui-fg-faint);
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-toast__close:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
</style>
