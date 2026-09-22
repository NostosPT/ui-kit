<script>
  import Popover from "../Popover/Popover.svelte";
  import InputFrame from "../Field/InputFrame.svelte";
  import Calendar from "./Calendar.svelte";
  import Icon from "../Icon/Icon.svelte";

  /**
   * Text field that opens a Calendar. The field stays typeable — a picker that
   * only accepts clicks makes entering a date two years out an exercise in
   * patience — and parsing is delegated to the platform via `Date.parse`,
   * which handles the ISO form reliably and localised forms best-effort.
   */
  let {
    value = $bindable(undefined),
    size = "md",
    placeholder = "Select a date",
    format = undefined,
    locale = undefined,
    min = undefined,
    max = undefined,
    weekStartsOn = 1,
    invalid = false,
    disabled = false,
    readonly = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  let open = $state(false);
  let draft = $state("");
  let editing = $state(false);

  const formatter = $derived(
    new Intl.DateTimeFormat(locale, format ?? { day: "numeric", month: "short", year: "numeric" })
  );

  $effect(() => {
    if (!editing) draft = value ? formatter.format(value) : "";
  });

  function commitText() {
    editing = false;
    if (!draft.trim()) {
      value = undefined;
      onchange?.(undefined);
      return;
    }
    const parsed = new Date(draft);
    if (Number.isNaN(parsed.getTime())) {
      draft = value ? formatter.format(value) : ""; // reject silently
      return;
    }
    value = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    onchange?.(value);
  }
</script>

{#snippet frameStart()}
  <Icon name="calendar" size={size === "lg" ? 18 : 16} />
{/snippet}

<Popover bind:open placement="bottom-start" offset={6} padded={false} ariaLabel="Choose a date">
  {#snippet trigger({ toggle })}
    <InputFrame {size} {invalid} {disabled} {readonly} class="ui-datepicker {klass}" start={frameStart}>
      <input
        class="ui-datepicker__input"
        type="text"
        {id}
        {placeholder}
        {disabled}
        {readonly}
        bind:value={draft}
        aria-invalid={invalid || undefined}
        onfocus={() => (editing = true)}
        onblur={commitText}
        onkeydown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); commitText(); }
          if (e.key === "ArrowDown") { e.preventDefault(); toggle(); }
        }}
        {...rest}
      />
      <button
        type="button"
        class="ui-datepicker__toggle"
        aria-label="Open calendar"
        aria-expanded={open}
        disabled={disabled || readonly}
        onclick={toggle}
      >
        <Icon name="chevron-down" size={14} />
      </button>
    </InputFrame>
  {/snippet}

  {#snippet children({ close })}
    <div class="ui-datepicker__panel">
      <Calendar
        bind:value
        {min}
        {max}
        {locale}
        {weekStartsOn}
        onchange={(next) => {
          onchange?.(next);
          close();
        }}
      />
    </div>
  {/snippet}
</Popover>

<style>
  :global(.ui-datepicker) {
    min-width: 200px;
  }
  .ui-datepicker__input {
    flex: 1;
    min-width: 0;
    height: var(--frame-h);
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
  }
  .ui-datepicker__input::placeholder {
    color: var(--ui-fg-faint);
  }
  .ui-datepicker__toggle {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    margin-inline-end: var(--ui-space-3);
    border-radius: var(--ui-radius-sm);
    color: var(--ui-fg-faint);
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-datepicker__toggle:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-datepicker__panel {
    padding: var(--ui-space-6);
  }
</style>
