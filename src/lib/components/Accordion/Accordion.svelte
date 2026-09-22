<script module>
  import { getContext, setContext } from "svelte";
  const KEY = Symbol("ui-accordion");
  export const getAccordionContext = () => getContext(KEY);
</script>

<script>
  import { setContext } from "svelte";

  /**
   * Owns which items are expanded so `multiple={false}` can enforce one-at-a-
   * time. Items register themselves through context, which keeps the public
   * API to markup order rather than an array of ids.
   */
  let {
    value = $bindable(undefined),
    multiple = false,
    variant = "separated",
    class: klass = "",
    children,
    onchange,
    ...rest
  } = $props();

  // Normalise to a Set internally; expose whatever shape the caller passed.
  const openSet = $derived(
    new Set(value == null ? [] : Array.isArray(value) ? value : [value])
  );

  setContext(KEY, {
    isOpen: (id) => openSet.has(id),
    toggle(id) {
      const next = new Set(openSet);
      if (next.has(id)) next.delete(id);
      else {
        if (!multiple) next.clear();
        next.add(id);
      }
      value = multiple ? [...next] : ([...next][0] ?? undefined);
      onchange?.(value);
    }
  });
</script>

<div class="ui-accordion {klass}" data-variant={variant} {...rest}>
  {@render children?.()}
</div>

<style>
  .ui-accordion {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .ui-accordion[data-variant="separated"] {
    gap: var(--ui-space-4);
  }
  .ui-accordion[data-variant="flush"] > :global(* + *) {
    border-top: 1px solid var(--ui-border-subtle);
  }
  .ui-accordion[data-variant="contained"] {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    background: var(--ui-bg-surface);
    overflow: hidden;
  }
  .ui-accordion[data-variant="contained"] > :global(* + *) {
    border-top: 1px solid var(--ui-border-subtle);
  }
</style>
