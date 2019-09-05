const path = require('path');

module.exports = {
  entry: './src/js/app.js',//从app.js引入
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js/')//输出到这个目录下的bundle.js文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,//如果发现你的后缀是sass或者scss
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',//最后用style-loader加载，它会把JS字符串变成style标签
          // Translates CSS into CommonJS
          'css-loader',//然后用CSS-loader加载，它会把CSS变成JS字符串
          // Compiles Sass to CSS
          'postcss-loader',//新增的
          'sass-loader',//这里是倒着执行的，首先用sass-loader去加载，它会把sass变成css
        ],
      }
    ]
  }
};