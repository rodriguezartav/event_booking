const path = require('path');
const webpack = require('webpack');

module.exports = {
  cache: true,
  context: path.resolve(__dirname, 'src'),
  entry: {
   app: ['react-hot-loader/patch','./app.jsx']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist','assets'),
    publicPath: '/assets/',                          // New
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot:true
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

     // new webpack.HotModuleReplacementPlugin()



      ],
};
