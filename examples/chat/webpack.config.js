module.exports = {
  context: __dirname + "/src",
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
  		goflux: __dirname + "/../../src",
  	},
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
};