// Sourced from: https://gist.github.com/paradoxinversion/a529d12db704bb78248368c202a2cd2d#file-react-app-tutorial-webpack-config-js
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
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
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/background.js'},
      { from: './src/main.js' },
      { from: './src/panel.js' },
      { from: './src/content.js'},
      { from: './src/injected.js' }
    ], {})
  ]
};