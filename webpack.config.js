const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    background: './src/extension/background.js',
    devpanel: './src/index.js',
    devtools: './src/extension/main.js',
    content: './src/extension/content.js',
    inject: './src/extension/injected.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: 'manifest.json'},
      { from: './res/img', to: 'img'}
    ], {}),
    new HtmlWebpackPlugin({
      template: './src/extension/devpanel/template.html',
      chunks: ['devpanel'],
      filename: 'devpanel.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['devtools'],
      filename: 'devtools.html'
    })
  ]
};