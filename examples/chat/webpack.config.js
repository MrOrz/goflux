var path = require("path");

module.exports = {
  context: path.resolve("./src"),
  entry: {
    client: "./client.js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, ],
  },
  resolve: {
    alias: {
      goflux: path.resolve("../../src"),
    },
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js"
  },
};