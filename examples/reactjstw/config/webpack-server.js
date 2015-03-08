var Path = require("path");

module.exports = {
  context: Path.resolve(__dirname, "../src"),
  entry: {
    server: "./server.js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      loader: "null-loader"
    }, ],
  },
  resolve: {
    alias: {
      goflux: Path.resolve(__dirname, "../../../src"),
    },
  },
  externals: [
    {
      "react": true, /* use the same library as node runtime */
    },
  ],
  target: "node",
  output: {
    library: true,
    libraryTarget: "commonjs2",
    path: Path.resolve(__dirname, "../server"),
    filename: "[name].js"
  },
};