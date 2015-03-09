var Path = require("path");

module.exports = {
  context: Path.resolve(__dirname, "./src"),
  entry: {
    goflux: "./index.js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }],
  },
  output: {
    library: "goflux",
    libraryTarget: "umd",
    path: Path.resolve(__dirname, "./dist"),
  },
};
