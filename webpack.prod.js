
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const phpServer = require('php-server');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
   minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
    }),
    new UglifyJsPlugin({
      cache: false,
      parallel: true,
      extractComments: true,
    }),
  ],
  minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:8].css',
      //chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      { // extra fonts
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ]
  },
  output: {
    globalObject: "this",
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', 
  },
});

(async () => {
  const server = await phpServer();
  console.log(`PHP server running at ${server.url}`)
})();
