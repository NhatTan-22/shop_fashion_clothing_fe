const { override, addWebpackModuleRule, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Cấu hình alias cho Webpack để ánh xạ `~` tới thư mục `src`
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src'),
  }),

  // Thêm cấu hình SCSS với resolve-url-loader và sass-loader
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'resolve-url-loader',  // Xử lý URL trong SCSS
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true, // Đảm bảo là boolean true
        },
      },
    ],
  })
);
