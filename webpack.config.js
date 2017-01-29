const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.svg$/, loader: "svg-url-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css'],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  plugins: [
   new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery"
    })
  ],
  node: {
    fs: "empty",
    child_process: 'empty',
    net: "empty",
    readline: 'empty'
  }
};
