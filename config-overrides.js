const { override, useBabelRc, addPostcssPlugins, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addPostcssPlugins([
    require("tailwindcss"),
    require("autoprefixer"),
  ]),

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  // ✅ Xử lý SCSS Modules (*.module.scss)
  addWebpackModuleRule({
    test: /\.module\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: { modules: true },
      },
      "sass-loader",
    ],
  })
);
