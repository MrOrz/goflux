var Path = require("path");

module.exports = {
  context: Path.resolve(__dirname, "./src"),
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
  		goflux: Path.resolve(__dirname, "./../../src"),
  	},
  },
  output: {
    path: Path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
};