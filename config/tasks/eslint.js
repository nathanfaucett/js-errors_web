var vfs = require("vinyl-fs"),
    eslint = require("gulp-eslint");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.js + "/**/*.js")
            .pipe(eslint({
                useEslintrc: false,
                parserOptions: {
                    ecmaVersion: 6,
                    sourceType: "module",
                    ecmaFeatures: {
                        impliedStrict: true,
                        modules: true,
                        jsx: true
                    }
                },
                plugins: [
                    "react"
                ],
                rules: {
                    "react/jsx-uses-react": "error",
                    "react/jsx-uses-vars": "error",
                    eqeqeq: "warn",
                    curly: "warn",
                    semi: "warn",
                    "no-unused-expressions": "warn",
                    "no-unused-labels": "warn",
                    "no-unused-vars": "warn",
                }
            }))
            .pipe(eslint.format());
    };
};
