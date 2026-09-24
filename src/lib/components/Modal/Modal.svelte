<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Built on the native <dialog> with showModal(). That gives the focus trap,
   * Escape handling, the top layer and inert background content for free —
   * all of which are easy to implement badly by hand and are the usual source
   * of modal accessibility bugs.
   *
   * The only thing added on top is a click-outside dismiss, which <dialog>
   * does not provide: the backdrop is not an element you can listen on, so the
   * hit test is done against the dialog's own box.
   */
  let {
    open = $bindable(false),
    title = undefined,
    description = undefined,
    size = "md",
    dismissible = true,
    closeOnOutside = true,
    class: klass = "",
    header,
    footer,
    children,
    onclose,
    ...rest
  } = $props();

  let dialogEl = $state(null);

  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) dialogEl.showModal();
    else if (!open && dialogEl.open) dialogEl.close();
  });

  function close() {
    open = false;
    onclose?.();
  }

  function onclick(event) {
    if (!closeOnOutside || event.target !== dialogEl) return;
    // The dialog element's box is the panel; a click that lands on it but not
    // on a child is a click on the backdrop.
    const r = dialogEl.getBoundingClientRect();
    const inside =
      event.clientX >= r.left && event.clientX <= r.right &&
      event.clientY >= r.top && event.clientY <= r.bottom;
    if (!inside) close();
  }

  function oncancel(event) {
    event.preventDefault(); // keep `open` as the single source of truth
    if (dismissible) close();
  }
</script>

<dialog
  bind:this={dialogEl}
  class="ui-modal {klass}"
  data-size={size}
  aria-label={title ? undefined : "Dialog"}
  {onclick}
  {oncancel}
  onclose={() => (open = false)}
  {...rest}
>
  {#if open}
    <div class="ui-modal__panel">
      {#if header}
        {@render header({ close })}
      {:else if title || dismissible}
        <header class="ui-modal__header">
          <div class="ui-modal__titles">
            {#if title}<h2 class="ui-modal__title">{title}</h2>{/if}
            {#if description}<p class="ui-modal__desc">{description}</p>{/if}
          </div>
          {#if dismissible}
            <button type="button" class="ui-modal__close" aria-label="Close" onclick={close}>
              <Icon name="x" size={16} />
            </button>
          {/if}
        </header>
      {/if}

      <div class="ui-modal__body">{@render children?.({ close })}</div>

      {#if footer}
        <footer class="ui-modal__footer">{@render footer({ close })}</footer>
      {/if}
    </div>
  {/if}
</dialog>

<style>
  .ui-modal {
    padding: 0;
    border: none;
    background: transparent;
    max-width: min(92vw, var(--modal-w));
    width: 100%;
    max-height: 86vh;
    overflow: visible;
    color: var(--ui-fg-default);
  }
  .ui-modal[data-size="sm"] { --modal-w: 380px; }
  .ui-modal[data-size="md"] { --modal-w: 520px; }
  .ui-modal[data-size="lg"] { --modal-w: 720px; }
  .ui-modal[data-size="xl"] { --modal-w: 960px; }

  .ui-modal::backdrop {
    background: var(--ui-bg-overlay);
    backdrop-filter: blur(4px);
    animation: ui-modal-fade var(--ui-duration-normal) var(--ui-ease-out);
  }

  .ui-modal__panel {
    display: flex;
    flex-direction: column;
    max-height: 86vh;
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    box-shadow:
      inset 0 1px 0 hsl(0 0% 100% / 0.15),
      var(--ui-shadow-xl);
    overflow: hidden;
    animation: ui-modal-in var(--ui-duration-normal) var(--ui-ease-out);
  }

  .ui-modal__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--ui-space-8);
    padding: var(--ui-space-10) var(--ui-space-12) var(--ui-space-6);
  }
  .ui-modal__titles {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
    min-width: 0;
  }
  .ui-modal__title {
    margin: 0;
    font-family: var(--ui-font-heading);
    font-size: var(--ui-text-lg);
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: var(--ui-leading-snug);
  }
  .ui-modal__desc {
    margin: 0;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-muted);
    line-height: var(--ui-leading-normal);
  }
  .ui-modal__close {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-xs);
    height: var(--ui-control-h-xs);
    flex: none;
    margin: -4px -6px 0 0;
    border: 1px solid transparent;
    border-radius: var(--ui-control-radius-xs);
    background: transparent;
    color: var(--ui-fg-subtle);
    cursor: pointer;
    outline: none;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out),
      transform var(--ui-duration-instant) var(--ui-ease-out);
  }
  .ui-modal__close:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-modal__close:active {
    transform: translateY(0.5px);
  }
  .ui-modal__close:focus-visible {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
    color: var(--ui-fg-default);
  }

  .ui-modal__body {
    padding: 0 var(--ui-space-12) var(--ui-space-10);
    overflow-y: auto;
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
  .ui-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--ui-space-3);
    padding: var(--ui-space-7) var(--ui-space-12);
    border-top: 1px solid var(--ui-border-subtle);
    background: var(--ui-bg-sunken);
  }

  @keyframes ui-modal-in {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
  }
  @keyframes ui-modal-fade {
    from { opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-modal__panel,
    .ui-modal::backdrop { animation: none; }
  }
</style>
