const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/client/index.html",
  filename: "./index.html"
});
module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve('dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.(scss|css)$/,
        use: ["style-loader", 'sass-loader', "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};