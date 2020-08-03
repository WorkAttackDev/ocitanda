const tailwindcss = require("tailwindcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html", "./static/main.css"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer")({
      overrideBrowserslist: "> 0.2%, not dead",
      flexbox: true,
    }),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
