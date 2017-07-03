errors_web
=======
errors web


## Structure

app/
  - css/ - less files using [comn_css](https://github.com/nathanfaucett/js-comn_css) and [less](https://github.com/less/less.js/) to compile
  - img/
  - js/
    - components/ - all virt components
      - App.js main component, switches views
    - reducers/ - all reducers exported in reducers/index.js
    - routes/ - routes and middleware using [layers_browser](https://github.com/nathanfaucett/js-layers_browser)
    - app.js creates application state, redux store etc...
    - index.js - starts the app when dom done loading

config/
  - locale/ - json translation files
  - paths/ - paths for different envs
  - settings/ - build settings for different envs
  - tasks/ - all tasks used for build
  - application.js - app config
  - utils.js - utils to get app build config loaded

##.envrc

these ENV variables are used in the config and need to be defined
I use [http://direnv.net/](http://direnv.net/)

```bash
export NODE_ENV="development" # "development""production""test"
export LIVERELOAD_PORT=35729
```

## Building/Running
all commands are done with [task](https://github.com/nathanfaucett/task), use "$ task --help" for full list
install task cli [/task-cli](https://github.com/nathanfaucett//task-cli)

```bash
$ npm i @nathanfaucett/task-cli -g
```

### run
builds and watches project for reloads, in current env set in .envrc
```bash
$ task run
```

### build
builds project, in current env set in .envrc
```bash
$ task build
```

### clean
removes all build files
```bash
$ task clean
```
