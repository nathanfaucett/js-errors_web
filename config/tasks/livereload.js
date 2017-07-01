var livereload = require("@nathanfaucett/livereload");


module.exports = function(config) {
    return function(callback) {

        livereload.listen({
            port: config.liveReloadPort
        });

        callback();
    };
};
