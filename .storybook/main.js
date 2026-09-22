/** @type {import('@storybook/svelte-vite').StorybookConfig} */
export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|svelte)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: { name: "@storybook/svelte-vite", options: {} },
  staticDirs: ["./public"]
};
