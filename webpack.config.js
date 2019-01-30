const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    background: './src/background/index.js',
    devpanel: './src/devpanel/index.js',
    devtools: './src/devtools/index.js',
    content: './src/content/index.js',
    inject: './src/inject/index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: 'manifest.json' },
      { from: './res/img', to: 'img' }
    ], {}),
    new HtmlWebpackPlugin({
      template: './src/devpanel/template.html',
      chunks: ['devpanel'],
      filename: 'devpanel.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['devtools'],
      filename: 'devtools.html'
    })
  ]
};
