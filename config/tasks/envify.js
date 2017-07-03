var vfs = require("vinyl-fs"),
    filePath = require("@nathanfaucett/file_path"),
    envify = require("gulp-envify");


module.exports = function(config) {
    return function () {
        return vfs.src(config.paths.js_out)
            .pipe(envify({
                NODE_ENV: config.env
            }))
            .pipe(vfs.dest(filePath.dirname(config.paths.js_out)));
    };
};
