<script>
  /**
   * The small chart that sits inside a metric card. Deliberately not a
   * charting library: no axes, no legend, no tooltip, no dependency — a shape
   * that shows whether the line went up or down, which is the entire job of
   * the charts in the reference.
   *
   * Drawn in a fixed 100×32 user space and stretched with `preserveAspectRatio
   * = none`, so the card decides the size and the component never has to
   * measure anything. `vector-effect: non-scaling-stroke` is what stops that
   * stretch from also stretching the stroke into a wedge.
   */
  let {
    values = [],
    variant = "area",
    tone = "accent",
    smooth = true,
    width = undefined,
    height = 40,
    baseline = false,
    label = undefined,
    class: klass = "",
    ...rest
  } = $props();

  const W = 100;
  const H = 32;

  const points = $derived.by(() => {
    const v = values.filter((n) => Number.isFinite(n));
    if (v.length === 0) return [];
    const min = Math.min(...v);
    const max = Math.max(...v);
    /* A flat series has no range to normalise against; park it on the
       midline rather than dividing by zero. */
    const span = max - min || 1;
    const step = v.length > 1 ? W / (v.length - 1) : 0;
    return v.map((n, i) => [
      v.length > 1 ? i * step : W / 2,
      H - ((n - min) / span) * H
    ]);
  });

  /** Catmull-Rom control points, expressed as a cubic Bézier. */
  function curve(pts) {
    let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i += 1) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
    }
    return d;
  }

  const line = $derived(
    points.length === 0
      ? ""
      : points.length === 1
        ? `M 0 ${points[0][1].toFixed(2)} H ${W}`
        : smooth
          ? curve(points)
          : "M " + points.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" L ")
  );

  const area = $derived(line ? `${line} L ${W} ${H} L 0 ${H} Z` : "");
</script>

<svg
  class="ui-sparkline {klass}"
  data-tone={tone}
  data-variant={variant}
  viewBox="0 0 {W} {H}"
  preserveAspectRatio="none"
  style:width={width === undefined ? "100%" : `${width}px`}
  style:height="{height}px"
  role={label ? "img" : "presentation"}
  aria-label={label}
  aria-hidden={label ? undefined : "true"}
  {...rest}
>
  {#if baseline}
    <line class="ui-sparkline__baseline" x1="0" y1={H} x2={W} y2={H} />
  {/if}
  {#if variant === "area" && area}
    <path class="ui-sparkline__area" d={area} />
  {/if}
  {#if line}
    <path class="ui-sparkline__line" d={line} />
  {/if}
</svg>

<style>
  .ui-sparkline {
    --spark: var(--ui-accent-solid);
    display: block;
    overflow: visible;
  }
  .ui-sparkline[data-tone="success"] { --spark: var(--ui-success-solid); }
  .ui-sparkline[data-tone="warning"] { --spark: var(--ui-warning-solid); }
  .ui-sparkline[data-tone="danger"] { --spark: var(--ui-danger-solid); }
  .ui-sparkline[data-tone="neutral"] { --spark: var(--ui-fg-faint); }

  .ui-sparkline__line {
    fill: none;
    stroke: var(--spark);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* Without this the non-uniform viewBox stretch would thicken the stroke
       horizontally and thin it vertically. */
    vector-effect: non-scaling-stroke;
  }
  .ui-sparkline__area {
    fill: var(--spark);
    opacity: 0.14;
    stroke: none;
  }
  .ui-sparkline__baseline {
    stroke: var(--ui-border-default);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
</style>
