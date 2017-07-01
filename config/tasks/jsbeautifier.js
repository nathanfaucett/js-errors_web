var vfs = require("vinyl-fs"),
    jsbeautifier = require("gulp-jsbeautifier");


module.exports = function(config) {
    return function() {
        return vfs.src([config.paths.js + "/**/*.js"])
            .pipe(jsbeautifier({
                js: {
                    e4x: true
                }
            }))
            .pipe(vfs.dest(config.paths.js));
    };
};
