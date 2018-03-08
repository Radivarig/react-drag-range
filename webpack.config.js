const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: __dirname + "/src/DragRange.jsx",
    viewer: __dirname + "/src/index.js",
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          }
        ]
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + "/src/index.html",
      filename: __dirname + "/index.html",
    })
  ],
}
