import "../src/lib/styles/index.css";
import "./storybook.css";
import ThemeFrame from "./ThemeFrame.svelte";

/* The toolbar controls below exist to make one guarantee visible: accent hue,
   neutral tint, radius and colour scheme are all inputs to the *wrapper*, not
   settings inside a component. Spin any of them and every story moves. */

const ACCENTS = {
  indigo: [262, 0.19],
  blue: [242, 0.18],
  cyan: [215, 0.13],
  teal: [185, 0.12],
  green: [150, 0.15],
  lime: [130, 0.17],
  amber: [80, 0.16],
  orange: [48, 0.17],
  rose: [15, 0.19],
  magenta: [340, 0.2],
  violet: [300, 0.19],
  graphite: [255, 0.02]
};

const NEUTRALS = {
  cool: [258, 0.012],
  pure: [0, 0],
  warm: [65, 0.014],
  matched: null // inherit the accent hue
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
        { value: "split", title: "Side by side", icon: "mirror" }
      ],
      dynamicTitle: true
    }
  },
  accent: {
    description: "Accent hue",
    toolbar: { title: "Accent", icon: "paintbrush", items: Object.keys(ACCENTS), dynamicTitle: true }
  },
  neutral: {
    description: "Neutral tint",
    toolbar: { title: "Neutral", icon: "contrast", items: Object.keys(NEUTRALS), dynamicTitle: true }
  },
  radius: {
    description: "Corner radius",
    toolbar: { title: "Radius", icon: "component", items: Object.keys(RADII), dynamicTitle: true }
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
  const [nh, nc] = NEUTRALS[neutral] ?? [ah, 0.012];
  return {
    "--ui-accent-h": ah,
    "--ui-accent-c": ac,
    "--ui-neutral-h": nh,
    "--ui-neutral-c": nc,
    "--ui-radius-scale": RADII[radius] ?? 1
  };
}

/* Svelte decorators return a wrapper component; the renderer passes the story
   in as its children snippet. Deliberately never calls story(). */
export const decorators = [
  (story, context) => ({
    Component: ThemeFrame,
    props: {
      themes: context.globals.theme === "split" ? ["light", "dark"] : [context.globals.theme || "light"],
      vars: themeVars(context.globals)
    }
  })
];

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
  // Storybook's hover highlight draws over specimens and muddies visual diffing.
  highlight: { disable: true },
  docs: { codePanel: true }
};
