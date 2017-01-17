"use strict"

require("dotenv").config({ path: '../.env' })
const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: "dist",
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT)
    })
  ]
}
