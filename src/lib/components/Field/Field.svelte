<script>
  import { uid } from "../../internal/utils.js";

  /**
   * Label / hint / error scaffolding. It owns the id wiring so consumers never
   * have to hand-roll aria-describedby: the `control` snippet receives the ids
   * it needs as arguments.
   *
   *   <Field label="Email" error={msg}>
   *     {#snippet control({ id, describedBy, invalid })}
   *       <Input {id} aria-describedby={describedBy} {invalid} />
   *     {/snippet}
   *   </Field>
   */
  let {
    label = undefined,
    hint = undefined,
    error = undefined,
    required = false,
    optional = false,
    id = undefined,
    labelFor = undefined,
    orientation = "vertical",
    class: klass = "",
    control,
    children,
    ...rest
  } = $props();

  const fieldId = id ?? uid("field");
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  const invalid = $derived(Boolean(error));
  // Error supersedes hint in the description, rather than stacking, so screen
  // readers announce the actionable message first and only once.
  const describedBy = $derived(
    [invalid ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined
  );
</script>

<div class="ui-field {klass}" data-orientation={orientation} {...rest}>
  {#if label}
    <label class="ui-field__label" for={labelFor ?? fieldId}>
      {label}
      {#if required}<span class="ui-field__required" aria-hidden="true">*</span>{/if}
      {#if optional}<span class="ui-field__optional">optional</span>{/if}
    </label>
  {/if}

  <div class="ui-field__control">
    {@render control?.({ id: fieldId, describedBy, invalid, required })}
    {@render children?.()}

    {#if invalid}
      <p class="ui-field__message ui-field__message--error" id={errorId}>{error}</p>
    {:else if hint}
      <p class="ui-field__message" id={hintId}>{hint}</p>
    {/if}
  </div>
</div>

<style>
  .ui-field {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-3);
    min-width: 0;
  }
  .ui-field[data-orientation="horizontal"] {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--ui-space-8);
  }
  .ui-field[data-orientation="horizontal"] .ui-field__label {
    flex: 0 0 140px;
    padding-top: calc((var(--ui-control-h-md) - 1lh) / 2);
  }

  .ui-field__label {
    display: inline-flex;
    align-items: baseline;
    gap: var(--ui-space-2);
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-default);
    letter-spacing: var(--ui-tracking-snug);
  }
  .ui-field__required {
    color: var(--ui-danger-solid);
  }
  .ui-field__optional {
    font-size: var(--ui-text-xs);
    font-weight: var(--ui-weight-normal);
    color: var(--ui-fg-faint);
  }

  .ui-field__control {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-3);
    min-width: 0;
    flex: 1;
  }

  .ui-field__message {
    margin: 0;
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
  }
  .ui-field__message--error {
    color: var(--ui-danger-text);
  }
</style>
