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
    admin: './apps/admin/index.jsx',
    web: './apps/web/index.jsx',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',                          // New
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

    ],
  },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(["dist/*.js","dist/*.css","dist/*.html","dist/*.map","dist/*.gz"], {verbose: true}),
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
        template: './template.html',
        filename: 'index.html',
        chunks: ['web','style'],
        inject: 'body'
      }),
      new HtmlWebpackPlugin({
        template: './template.html',
        filename: 'admin.html',
        chunks: ['admin','style'],
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
