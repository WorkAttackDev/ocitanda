const tailwindcss = require("tailwindcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html", "./static/main.css"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("postcss-preset-env")({
      browsers: "> 0.2%, ios >= 7, not dead",
      stage: 2,
      autoprefixer: {
        overrideBrowserslist: "> 0.2%, ios >= 7, not dead",
        flexbox: true,
      },
    }),
    process.env.NODE_ENV === "production" && require("cssnano"),
    // ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
