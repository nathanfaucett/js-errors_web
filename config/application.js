var extend = require("@nathanfaucett/extend"),
    filePath = require("@nathanfaucett/file_path"),
    utils = require("./utils");


var application = exports,
    env = process.env.NODE_ENV || "development",
    port = process.env.PORT || 8080,
    liveReloadPort = process.env.LIVERELOAD_PORT || 35729;


application.port = port;
application.env = env;
application.liveReloadPort = liveReloadPort;
application.port = port;
application.utils = utils;
application.settings = utils.loadSettings(env);
application.paths = utils.loadPaths(env);
