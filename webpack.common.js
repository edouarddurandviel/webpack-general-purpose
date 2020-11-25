const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { 
    // several entries or just one entry for all JAVASCRIPT entry name = app
      app: './src/entry.js',
  },
  plugins: [
    // clean cache
    new CleanWebpackPlugin(['public/*']),
    // create a manifest file
    new ManifestPlugin({
      title: 'latest',
    }),
    // module identifier -> keep vendor file unchanged when other files are beeing modified
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
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
              name: '[name].[ext]',
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
