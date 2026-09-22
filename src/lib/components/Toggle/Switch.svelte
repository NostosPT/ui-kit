<script>
  import { uid } from "../../internal/utils.js";

  /**
   * Checkbox semantics with a track-and-knob presentation. Use it for settings
   * that apply immediately; a checkbox is the right control when the change
   * only takes effect on submit.
   */
  let {
    checked = $bindable(false),
    name = undefined,
    value = undefined,
    label = undefined,
    description = undefined,
    size = "md",
    labelPosition = "end",
    disabled = false,
    id = undefined,
    class: klass = "",
    children,
    onchange,
    ...rest
  } = $props();

  const fallbackId = uid("switch");
  const inputId = $derived(id ?? fallbackId);
</script>

<div
  class="ui-switch {klass}"
  data-size={size}
  data-label-position={labelPosition}
  data-disabled={disabled || undefined}
>
  <input
    class="ui-switch__input"
    type="checkbox"
    role="switch"
    id={inputId}
    {name}
    {value}
    {disabled}
    bind:checked
    {onchange}
    {...rest}
  />
  <span class="ui-switch__track" aria-hidden="true">
    <span class="ui-switch__knob"></span>
  </span>

  {#if label || description || children}
    <label class="ui-switch__text" for={inputId}>
      {#if label}<span class="ui-switch__label">{label}</span>{/if}
      {@render children?.()}
      {#if description}<span class="ui-switch__desc">{description}</span>{/if}
    </label>
  {/if}
</div>

<style>
  .ui-switch {
    display: inline-flex;
    align-items: start;
    gap: var(--ui-space-5);
    position: relative;
  }
  .ui-switch[data-label-position="start"] {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .ui-switch[data-size="sm"] { --track-w: 32px; --track-h: 18px; --sw-fs: var(--ui-text-sm); }
  .ui-switch[data-size="md"] { --track-w: 40px; --track-h: 22px; --sw-fs: var(--ui-text-md); }
  .ui-switch[data-size="lg"] { --track-w: 48px; --track-h: 26px; --sw-fs: var(--ui-text-base); }

  .ui-switch__input {
    position: absolute;
    inset: 0;
    width: var(--track-w);
    height: var(--track-h);
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
  .ui-switch__input:disabled { cursor: not-allowed; }

  .ui-switch__track {
    flex: none;
    display: block;
    position: relative;
    width: var(--track-w);
    height: var(--track-h);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-muted);
    border: 1px solid var(--ui-border-default);
    margin-top: calc((1lh - var(--track-h)) / 2);
    box-sizing: border-box;
    transition:
      background-color var(--ui-duration-normal) var(--ui-ease-out),
      border-color var(--ui-duration-normal) var(--ui-ease-out),
      box-shadow var(--ui-duration-normal) var(--ui-ease-out);
  }

  .ui-switch__knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(var(--track-h) - 6px);
    height: calc(var(--track-h) - 6px);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-surface);
    box-shadow:
      0 1px 2px hsl(var(--ui-shadow-color) / 0.16),
      0 1px 3px hsl(var(--ui-shadow-color) / 0.12);
    /* Translating by the track's own dimensions means the knob stays inset by
       exactly 2px at both ends regardless of which size is in play. */
    transition: transform var(--ui-duration-normal) var(--ui-ease-spring);
  }

  .ui-switch__input:checked + .ui-switch__track {
    background: linear-gradient(
      180deg,
      oklch(from var(--ui-accent-solid) calc(l + 0.035) c h) 0%,
      var(--ui-accent-solid) 100%
    );
    border-color: var(--ui-accent-solid);
    box-shadow:
      inset 0 1px 0 hsl(0 0% 100% / 0.22),
      0 1px 2px oklch(from var(--ui-accent-solid) calc(l - 0.2) c h / 0.25),
      0 2px 5px -1px oklch(from var(--ui-accent-solid) calc(l - 0.25) c h / 0.35);
  }
  .ui-switch__input:checked + .ui-switch__track .ui-switch__knob {
    transform: translateX(calc(var(--track-w) - var(--track-h)));
  }
  .ui-switch__input:focus-visible + .ui-switch__track {
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring), var(--ui-shadow-xs);
  }
  .ui-switch__input:focus-visible:checked + .ui-switch__track {
    box-shadow:
      0 0 0 var(--ui-ring-width) var(--ui-accent-ring),
      inset 0 1px 0 hsl(0 0% 100% / 0.22),
      0 1px 2px oklch(from var(--ui-accent-solid) calc(l - 0.2) c h / 0.25);
  }
  .ui-switch__input:disabled + .ui-switch__track {
    opacity: 0.5;
  }

  .ui-switch__text {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-1);
    cursor: pointer;
    min-width: 0;
  }
  .ui-switch[data-disabled] .ui-switch__text { cursor: not-allowed; opacity: 0.6; }
  .ui-switch__label {
    font-size: var(--sw-fs);
    font-weight: var(--ui-weight-medium);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-default);
  }
  .ui-switch__desc {
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
  }
</style>
