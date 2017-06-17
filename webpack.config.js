const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.jsx'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets',                          // New
  },
  resolve: {
     extensions: ['.js', '.jsx']
   },
  devtool: 'source-map',
  module: {
    rules: [
    {
            test: /\.css$/,
            loader:  ExtractTextPlugin.extract({
              loader: 'css-loader?importLoaders=1',
            }),
          },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015','react'] },
        }],
      },

      // Loaders for other file types can go here
    ],
  },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(["dist/*/*.*"], {verbose: true}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
         sourceMap: true,
         comments: false
       }),
        new ExtractTextPlugin({
          filename: '[name].[hash].css',
          allChunks: true,
        }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: '../index.html',
        chunks: ['app','style'],
        inject: 'body'
      }),
     new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|css)$/,
        threshold: 10240,
        minRatio: 0.8
      })

  ],
};
