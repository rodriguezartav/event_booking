const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
  context: path.resolve(__dirname, 'src'),
  entry: {
   admin: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/admin/index.jsx'],
   web: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/web/index.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',                          // New
  },
  devServer: {
    contentBase: [path.join(__dirname, "src")],
    hot: true,
  },
  resolve: {
     extensions: ['.js', '.jsx']
   },
  devtool: "eval",
  module: {
      rules: [
      {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
          },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          }],
        },
        {
          test: /\.jsx$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
         ]
        },

        // Loaders for other file types can go here
      ],
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src','template.html'),
      filename: 'admin.html',
      chunks: ['admin','style'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src','template.html'),
      filename: 'index.html',
      chunks: ['web','style'],
      inject: 'body'
    })
  ],
};
