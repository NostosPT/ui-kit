import "../src/lib/styles/index.css";
import "./storybook.css";

/* The toolbar controls below exist to prove a point: the accent, neutral tint
   and corner radius of every story are driven by CSS variables on a wrapper,
   not by anything inside a component. Spin the hue and the whole kit moves. */

const ACCENTS = {
  indigo: [262, 0.19],
  blue: [242, 0.18],
  teal: [192, 0.13],
  green: [150, 0.15],
  amber: [75, 0.16],
  orange: [45, 0.17],
  rose: [15, 0.19],
  magenta: [335, 0.2],
  violet: [295, 0.19],
  slate: [255, 0.05]
};

const NEUTRALS = {
  cool: [258, 0.012],
  pure: [0, 0],
  warm: [65, 0.014],
  matched: null // follow the accent hue
};

const RADII = { square: 0, tight: 0.6, default: 1, soft: 1.4, round: 1.9 };

export const globalTypes = {
  theme: {
    description: "Colour scheme",
    toolbar: {
      title: "Theme",
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "dark", title: "Dark", icon: "moon" },
        { value: "side-by-side", title: "Side by side", icon: "mirror" }
      ],
      dynamicTitle: true
    }
  },
  accent: {
    description: "Accent hue",
    toolbar: {
      title: "Accent",
      icon: "paintbrush",
      items: Object.keys(ACCENTS),
      dynamicTitle: true
    }
  },
  neutral: {
    description: "Neutral tint",
    toolbar: {
      title: "Neutral",
      icon: "contrast",
      items: Object.keys(NEUTRALS),
      dynamicTitle: true
    }
  },
  radius: {
    description: "Corner radius",
    toolbar: {
      title: "Radius",
      icon: "component",
      items: Object.keys(RADII),
      dynamicTitle: true
    }
  }
};

export const initialGlobals = {
  theme: "light",
  accent: "indigo",
  neutral: "cool",
  radius: "default"
};

function themeVars({ accent, neutral, radius }) {
  const [ah, ac] = ACCENTS[accent] ?? ACCENTS.indigo;
  const n = NEUTRALS[neutral];
  const [nh, nc] = n ?? [ah, 0.012];
  return {
    "--ui-accent-h": ah,
    "--ui-accent-c": ac,
    "--ui-neutral-h": nh,
    "--ui-neutral-c": nc,
    "--ui-radius-scale": RADII[radius] ?? 1
  };
}

/* Storybook's Svelte renderer mounts the story into the element we return, so
   the decorator builds the wrapper chain by hand rather than via a component.
   That keeps the theming harness out of the published bundle entirely. */
function withTheme(story, context) {
  const vars = themeVars(context.globals);
  const themes =
    context.globals.theme === "side-by-side"
      ? ["light", "dark"]
      : [context.globals.theme || "light"];

  const host = document.createElement("div");
  host.className = "sb-theme-host";
  host.dataset.split = String(themes.length > 1);

  for (const t of themes) {
    const pane = document.createElement("div");
    pane.className = "ui-root sb-theme-pane";
    pane.setAttribute("data-ui-theme", t);
    for (const [k, v] of Object.entries(vars)) pane.style.setProperty(k, v);
    host.appendChild(pane);
  }

  // Only the first pane gets the live story; the split view clones it after
  // mount so both sides stay identical without re-instantiating the component.
  const target = host.firstChild;
  const rendered = story();
  queueMicrotask(() => {
    if (themes.length > 1) host.lastChild.innerHTML = target.innerHTML;
  });
  return { ...rendered, target };
}

export const decorators = [withTheme];

export const parameters = {
  layout: "centered",
  controls: { expanded: true, sort: "requiredFirst" },
  options: {
    storySort: {
      order: [
        "Foundations",
        ["Introduction", "Theming", "Colour", "Typography", "Spacing", "Elevation", "Icons"],
        "Primitives",
        "Forms",
        "Data Display",
        "Navigation",
        "Feedback",
        "Patterns"
      ]
    }
  },
  backgrounds: { disable: true },
  docs: { codePanel: true }
};
