import extend from "@nathanfaucett/extend";
import app from "../app";


const actions = {
    SET_STATE: "route.SET_STATE",

    CHANGE: "route.CHANGE",
    CHANGE_SUCCESS: "route.CHANGE_SUCCESS",
    CHANGE_ERROR: "route.CHANGE_ERROR"
};

const copyCtx = (ctx) => {
    return {
        pathname: ctx.pathname || "/",
        params: ctx.params,
        query: ctx.query || ""
    };
};

const getInitialState = () => {
    return {
        error: null,
        ctx: copyCtx({}),
        state: null
    };
};

const routeMiddleware = (store) => (next) => (action) => {
    switch (action.type) {

        case actions.CHANGE:
            {
                const ctx = action.ctx;

                app.router.handler(ctx, function onHandle(error) {
                    if (error) {
                        store.dispatch({
                            type: actions.CHANGE_ERROR,
                            error: error,
                            ctx: copyCtx(action.ctx)
                        });
                        console.error(error);
                    } else {
                        store.dispatch({
                            type: actions.CHANGE_SUCCESS,
                            ctx: copyCtx(action.ctx)
                        });
                    }
                });
                break;
            }
    }

    return next(action);
};

const route = (state, action) => {

    switch (action.type) {

        case actions.SET_STATE:
            return extend({}, state, {
                state: action.state
            });

        case actions.CHANGE_ERROR:
            return extend({}, state, {
                error: action.error,
                ctx: action.ctx
            });

        case actions.CHANGE_SUCCESS:
            return extend({}, state, {
                error: null,
                ctx: action.ctx
            });

        default:
            return state || getInitialState();
    }
};


route.actions = actions;
route.getInitialState = getInitialState;
route.middleware = routeMiddleware;


export default route;