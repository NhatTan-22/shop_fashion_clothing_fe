const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  // Sử dụng Babel config nếu cần
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),

  addWebpackModuleRule({
    test: /\.module\.scss$/,
    use: ["style-loader", "css-loader?modules=true", "sass-loader"],
  })
);
