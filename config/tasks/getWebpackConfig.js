var webpack = require("webpack");


module.exports = function getWebpackConfig(config) {
    return {
        entry: [
            config.paths.js_src
        ],
        devtool: "source-map",
        output: {
            path: config.paths.out,
            filename: "index.js"
        },
        module: {
            loaders: [{
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["es2015", "react", "stage-1"]
                }
            }]
        }
    };
}
