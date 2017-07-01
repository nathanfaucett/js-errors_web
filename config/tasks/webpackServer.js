var webpack = require("webpack"),
    extend = require("@nathanfaucett/extend"),
    livereload = require("@nathanfaucett/livereload");


module.exports = function(webpackConfig, config) {
    return function(callback) {
        var mergedConfig = extend(webpackConfig, {
            watch: true
        });

        webpack(
            mergedConfig,
            function onCompile(error, stats) {
                console.log(stats.toString({
                    chunks: true,
                    colors: true
                }));
                livereload.reload();
            }
        );

        callback();
    };
};
