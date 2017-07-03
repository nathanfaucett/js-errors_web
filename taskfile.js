var vfs = require("vinyl-fs"),
    task = require("@nathanfaucett/task"),
    filePath = require("@nathanfaucett/file_path"),
    livereload = require("@nathanfaucett/livereload"),
    debounce = require("@nathanfaucett/debounce"),
    config = require("./config/application"),
    webpackConfig = require("./config/tasks/getWebpackConfig")(config);


task("eslint", "run eslint", require("./config/tasks/eslint")(config));
task("jsbeautifier", "run jsbeautifier", require("./config/tasks/jsbeautifier")(config));

task("default", task.series(task("jsbeautifier"), task("eslint")));


task("config", "compile config to build directory",
    require("./config/tasks/config")(config));
task("webpack", "use webpack to compile js",
    task.series(
        task("config"),
        require("./config/tasks/webpack")(webpackConfig, config)));
task("webpack_server", "start webpack server to compile js",
    require("./config/tasks/webpackServer")(webpackConfig, config));

task("css", "compile css into one file",
    require("./config/tasks/compile_css")(config));
task("ejs", "compile ejs into one file",
    require("./config/tasks/ejs")(config));


task("locale", "compiles locale files to build directory",
    require("./config/tasks/locale")(config));

task("clean", "clean build files", require("./config/tasks/clean")(config));


task("copy_imgs", "copys app img to build dir", function copy_imgs() {
    return vfs.src([
        config.paths.img + "/**/*"
    ]).pipe(vfs.dest(config.paths.build + "/img"));
});
task("copy", "copys app fonts to build dir", task("copy_imgs"));


task("livereload", "start livereload",
    require("./config/tasks/livereload")(config));
task("serve", "start static assets server",
    require("./config/tasks/serve")(config));

task("envify", "envify build",
    require("./config/tasks/envify")(config));
task("uglify", "uglify build js",
    require("./config/tasks/uglify")(config));
task("minify_css", "minify build css",
    require("./config/tasks/minify_css")(config));
task("minify_html", "minify build html",
    require("./config/tasks/minify_html")(config));
task("minify_json", "minify build json",
    require("./config/tasks/minify_json")(config));

task("minify", "minify built app",
    task.parallel(
        task.series(task("envify"), task("uglify")),
        task("minify_css"),
        task("minify_html"),
        task("minify_json")));


if (config.env !== "production") {
    task("build", "builds app in " + config.env, task.parallel(
        task("config"),
        task("webpack_server"),
        task("css"),
        task("ejs"),
        task("locale"))
    );
} else {
    task("build", "builds app in " + config.env,
        task.series(
            task.parallel(
                task("webpack"),
                task("css"),
                task("ejs"),
                task("copy"),
                task("locale")
            ),
            task("minify")
        )
    );
}


var callForReload = debounce(function callForReload() {
    livereload.reload();
}, 100);

function reload(done) {
    callForReload();
    done();
}

task("reload", reload);
task("config_reload", "builds js config and calls for a reload",
    task.series(task("config"), task("reload")));
task("css_reload", "builds css and calls for a reload",
    task.series(task("css"), task("reload")));
task("ejs_reload", "builds ejs and calls for a reload",
    task.series(task("ejs"), task("reload")));
task("locale_reload", "builds locale and calls for a reload",
    task.series(task("locale"), task("reload")));


function watch(files, name) {
	task.watch(files, function onChange() {
        task.run(name, function onRun() {});
    });
}

task("watch", "starts watching for changes on dev files", function(done) {
    watch([config.paths.js + "/config.js"], "config_reload");
    watch([config.paths.css + "/**/*.less"], "css_reload");
    watch([config.paths.ejs_src], "ejs_reload");
    watch([config.paths.locale + "/**/*.json"], "locale_reload");
    watch([config.paths.app + "/fonts/**/*", config.paths.app + "/img/**/*"], "reload");
    done();
});


task("run", "builds app and starts watching files",
    task.series(task("build"), task("livereload"), task("watch"), task("serve")));
