
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const phpServer = require('php-server');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
   minimize: true,
   minimizer: [new UglifyJsPlugin({
    chunkFilter: (chunk) => {
      // Exclude uglification for the `vendor` chunk
      if (chunk.name === 'vendor') {
        return false;
      }    
      return true;
    },
    cache: false
  })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:8].css',
      //chunkFilename: '[id].css',
    }),
  ],
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
