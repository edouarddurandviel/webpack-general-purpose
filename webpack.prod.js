const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
});