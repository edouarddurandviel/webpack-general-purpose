const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
  // development mode 
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  // devtool: dev? 'cheap-module-eval-source-map': false,
  devtool: 'inline-source-map',
  devServer: {
    overlay:true,
    port: 9000,
    contentBase: path.join(__dirname, 'public'),
    hot: false,
    writeToDisk: true,
    watchContentBase: true,
    open: true,
    inline: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
        filename: '[name].css',
      //chunkFilename: '[id].css',
    }),
     // for dev only
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      path: path.join(__dirname, './public'),
      excludeChunks: ['base'],
      filename: 'index.html',
     }),
  ],
  output: {
    globalObject: "this",
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', 
  },
});

