module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: "./",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['jsx-loader'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'], exclude: /node_modules/ }
        ]
    }
}
