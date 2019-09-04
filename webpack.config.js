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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  }
};