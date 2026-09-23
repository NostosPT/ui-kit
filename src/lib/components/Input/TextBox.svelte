<script>
  import Textarea from "../Textarea/Textarea.svelte";

  /**
   * Multi-line text box component.
   * Alias / wrapper around Textarea with character counting and hint support.
   */
  let {
    value = $bindable(""),
    placeholder = undefined,
    rows = 3,
    maxLength = undefined,
    showCount = false,
    hint = undefined,
    size = "md",
    invalid = false,
    disabled = false,
    readonly = false,
    resize = "vertical",
    autogrow = false,
    id = undefined,
    class: klass = "",
    oninput,
    onchange,
    ...rest
  } = $props();
</script>

<Textarea
  bind:value
  {placeholder}
  {rows}
  {maxLength}
  {showCount}
  {hint}
  {size}
  {invalid}
  {disabled}
  {readonly}
  {resize}
  {autogrow}
  {id}
  class={klass}
  {oninput}
  {onchange}
  {...rest}
/>
