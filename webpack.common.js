const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeEnvPlugin  = require('node-env-webpack-plugin');


module.exports = {
 
  entry: { // several entries or just one entry for all JAVASCRIPT entry name = app
      app: './src/entry.js',
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new CleanWebpackPlugin(['public/*']), // clean cache
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash:8].css' : '[name].css',
      //chunkFilename: '[id].css',
    }),
    new ManifestPlugin({
      title: 'latest',
    }),
    new webpack.HashedModuleIdsPlugin(), // module identifier -> keep vendor file unchanged when other files are beeing modified
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  output: {
    globalObject: "this",
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash:8].js' : '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', 
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '/public/',
              hmr: process.env.NODE_ENV === 'production',
            },
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(pdf|doc|docx|xls|xlsx|txt|csv|tsv)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: './files',
              name: "[name].[ext]",
            },
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: './images',
              name: "[name].[ext]",
            },
          },
        ]
      },
      { // extra fonts
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: process.env.NODE_ENV === 'production' ? '[name].[contenthash:8].[ext]' : '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: [ {
          loader: 'xml-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'xml/'
          }
        }]
      }
  ]
  }
};