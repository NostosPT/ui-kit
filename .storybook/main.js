/** @type {import('@storybook/svelte-vite').StorybookConfig} */
export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|svelte)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-mcp"
  ],
  framework: { name: "@storybook/svelte-vite", options: {} },
  staticDirs: ["./public"]
};
