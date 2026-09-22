<script>
  import InputFrame from "../Field/InputFrame.svelte";

  /** Multi-line text, optionally auto-growing to fit its content. */
  let {
    value = $bindable(""),
    size = "md",
    rows = 3,
    maxRows = undefined,
    placeholder = undefined,
    invalid = false,
    disabled = false,
    readonly = false,
    resize = "vertical",
    autogrow = false,
    id = undefined,
    class: klass = "",
    ...rest
  } = $props();

  let el = $state(null);

  // Measuring requires collapsing the height first; otherwise scrollHeight can
  // only ever report the current (larger) box and the field never shrinks.
  $effect(() => {
    if (!autogrow || !el) return;
    void value;
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const cap = maxRows ? maxRows * lineHeight + 16 : Infinity;
    el.style.height = `${Math.min(el.scrollHeight, cap)}px`;
    el.style.overflowY = el.scrollHeight > cap ? "auto" : "hidden";
  });
</script>

<InputFrame {size} {invalid} {disabled} {readonly} multiline>
  <textarea
    bind:this={el}
    class="ui-textarea {klass}"
    style:resize={autogrow ? "none" : resize}
    {id}
    {rows}
    {placeholder}
    {disabled}
    {readonly}
    bind:value
    aria-invalid={invalid || undefined}
    {...rest}
  ></textarea>
</InputFrame>

<style>
  .ui-textarea {
    flex: 1;
    min-width: 0;
    width: 100%;
    padding: var(--ui-space-5) var(--frame-px);
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    line-height: var(--ui-leading-normal);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
    display: block;
  }
  .ui-textarea::placeholder {
    color: var(--ui-fg-faint);
  }
</style>
