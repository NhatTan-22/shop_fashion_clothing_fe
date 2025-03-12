const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  })
);
