var connect = require("gulp-connect");


module.exports = function(config) {
    return function(callback) {

        connect.server({
            root: config.paths.out,
            port: config.port,
            livereload: false
        });

        callback();
    };
};
