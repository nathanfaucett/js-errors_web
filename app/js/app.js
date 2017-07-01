import environment from "@nathanfaucett/environment";
import eventListener from "@nathanfaucett/event_listener";
import cookies from "@nathanfaucett/cookies";
import page from "@nathanfaucett/page";
import request from "@nathanfaucett/request";
import layers from "@nathanfaucett/layers_browser";
import apply from "@nathanfaucett/apply";
import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import {
    composeWithDevTools
} from "redux-devtools-extension/logOnlyInProduction";
import objectForEach from "@nathanfaucett/object-for_each";
import config from "./config";
import Root from "./components/Root";
import {
    blue500,
    blue700,
    pinkA200,
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
} from "material-ui/styles/colors";
import {
    fade
} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";


import {
    addLocaleData
} from "react-intl";
import de from "react-intl/locale-data/de";


var window = environment.window,
    app = {},
    VIEWS = {},
    router = layers.Router.create(),
    reducers;


export default app;


addLocaleData([...de]);


request.defaults.headers.Accept = "application/json";
request.defaults.headers["Content-Type"] = "application/json";
request.defaults.withCredentials = true;


app.config = config;
app.Root = Root;
app.router = router;
app.page = page;
app.theme = {
    spacing: spacing,
    fontFamily: "Roboto, sans-serif",
    palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: blue500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};
app.HEADER_TOKEN = "X-Errors-User-token";

app.setView = (state, Component) => {
    VIEWS[state] = Component;
};
app.getView = (state) => {
    return VIEWS[state];
};

app.route = (path, state, Component) => {
    app.router.route(path, (ctx, next) => {
        app.store.dispatch({
            type: reducers.route.actions.SET_STATE,
            ctx: ctx,
            state: state
        });

        ctx.end();
        next();
    });

    app.setView(state, Component);
};

app.middleware = (path, fn) => {
    router.use(path, fn);
};

app.init = () => {
    app.store.dispatch({
        type: "app.INIT"
    });
    page.setHtml5Mode(config.html5Mode);
    page.listen();
};


var initialState = {},
    storeMiddleware = [];

reducers = require("./reducers")["default"];

/*eslint-disable no-unused-expressions*/
require("./routes")["default"];
/*eslint-enable no-unused-expressions*/

objectForEach(reducers, (reducer, name) => {
    initialState[name] = reducer.getInitialState();

    if (reducer.middleware) {
        storeMiddleware.push(reducer.middleware);
    }
});

app.store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(
        apply(applyMiddleware, storeMiddleware)
    )
);

app.store.subscribe(function onDispatch() {
    cookies.set("APP_STATE", app.store.getState());
});

eventListener.on(window, "resize orientationchange", function onResize() {
    app.store.dispatch({
        type: reducers.size.actions.CHANGE,
        width: window.innerWidth,
        height: window.innerHeight
    });
});

page.on("request", function onRequest(ctx) {
    app.store.dispatch({
        type: reducers.route.actions.CHANGE,
        ctx: ctx
    });
});