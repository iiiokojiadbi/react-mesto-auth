var path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './build/js/'),
    filename: 'bundle.js'
  }
};