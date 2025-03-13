const { override, useBabelRc, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'css-loader',
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  })
);