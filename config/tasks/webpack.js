var vfs = require("vinyl-fs"),
    webpackStream = require("webpack-stream");


module.exports = function(webpackConfig, config) {
    return function(callback) {
        return vfs.src(config.paths.js_src)
            .pipe(webpackStream(webpackConfig))
            .pipe(vfs.dest(webpackConfig.output.path));
    };
};
