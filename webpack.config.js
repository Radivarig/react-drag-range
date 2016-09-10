module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: "./",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    }
}
