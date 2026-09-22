<script>
  import { clamp } from "../../internal/utils.js";

  /** Determinate or indeterminate bar. */
  let {
    value = undefined,
    max = 100,
    size = "md",
    tone = "accent",
    label = undefined,
    showValue = false,
    class: klass = "",
    ...rest
  } = $props();

  const indeterminate = $derived(value == null);
  const pct = $derived(indeterminate ? 0 : clamp((value / max) * 100, 0, 100));
</script>

<div class="ui-progress {klass}" data-size={size} data-tone={tone} {...rest}>
  {#if label || showValue}
    <div class="ui-progress__header">
      {#if label}<span class="ui-progress__label">{label}</span>{/if}
      {#if showValue && !indeterminate}
        <span class="ui-progress__value">{Math.round(pct)}%</span>
      {/if}
    </div>
  {/if}

  <div
    class="ui-progress__track"
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-label={label}
    data-indeterminate={indeterminate || undefined}
  >
    <div class="ui-progress__fill" style:width={indeterminate ? undefined : `${pct}%`}></div>
  </div>
</div>

<style>
  .ui-progress {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-3);
    width: 100%;
  }
  .ui-progress[data-size="sm"] { --bar-h: 4px; }
  .ui-progress[data-size="md"] { --bar-h: 6px; }
  .ui-progress[data-size="lg"] { --bar-h: 10px; }

  .ui-progress__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--ui-space-6);
    font-size: var(--ui-text-sm);
  }
  .ui-progress__label { color: var(--ui-fg-muted); }
  .ui-progress__value {
    color: var(--ui-fg-default);
    font-variant-numeric: tabular-nums;
    font-weight: var(--ui-weight-medium);
  }

  .ui-progress__track {
    height: var(--bar-h);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-emphasis);
    overflow: hidden;
  }
  .ui-progress__fill {
    height: 100%;
    border-radius: inherit;
    background: var(--ui-accent-solid);
    transition: width var(--ui-duration-slow) var(--ui-ease-out);
  }
  .ui-progress[data-tone="success"] .ui-progress__fill { background: var(--ui-success-solid); }
  .ui-progress[data-tone="warning"] .ui-progress__fill { background: var(--ui-warning-solid); }
  .ui-progress[data-tone="danger"] .ui-progress__fill { background: var(--ui-danger-solid); }
  .ui-progress[data-tone="neutral"] .ui-progress__fill { background: var(--ui-fg-muted); }

  /* A short travelling segment rather than a full-width pulse, so it can't be
     mistaken for a determinate bar sitting at 100%. */
  .ui-progress__track[data-indeterminate] .ui-progress__fill {
    width: 35%;
    animation: ui-progress-slide 1.4s var(--ui-ease-in-out) infinite;
  }
  @keyframes ui-progress-slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-progress__track[data-indeterminate] .ui-progress__fill {
      animation: none;
      width: 100%;
      opacity: 0.5;
    }
  }
</style>
