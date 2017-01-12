"use strict"

const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".html", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    contentBase: 'dist',
    port: 8888
  },
}
