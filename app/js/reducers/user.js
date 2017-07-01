import extend from "@nathanfaucett/extend";
import request from "@nathanfaucett/request";
import cookies from "@nathanfaucett/cookies";
import app from "../app";


const HEADER_TOKEN = app.HEADER_TOKEN;


const actions = {
    GET_USER_BY_TOKEN: "user.GET_USER_BY_TOKEN",

    GET_USER_SUCCESS: "user.GET_USER_SUCCESS",
    GET_USER_ERROR: "user.GET_USER_ERROR",

    SIGN_OUT: "user.SIGN_OUT"
};

const getInitialState = () => {
    return {
        error: {},
        email: "",
        token: null
    };
};

const getUserByToken = (store, token, callback) => {
    request.defaults.headers[HEADER_TOKEN] = token;
    request.get(app.config.baseUrl + "/api/users/current_user")
        .then((response) => {
            store.dispatch({
                type: actions.GET_USER_SUCCESS,
                token: token,
                user: response.data
            });
            if (callback) {
                callback(undefined, response.data);
            }
        })
        .catch((response) => {
            store.dispatch({
                type: actions.GET_USER_ERROR,
                error: response.data
            });
            if (callback) {
                callback(response.data);
            }
        });
};

const userMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case actions.GET_USER_BY_TOKEN:
            getUserByToken(store, action.token);
            break;
    }
    next(action);
};

const user = (state, action) => {

    switch (action.type) {

        case actions.GET_USER_SUCCESS:
            const user = action.user;

            cookies.set(HEADER_TOKEN, action.token);
            request.defaults.headers[HEADER_TOKEN] = action.token;

            return extend({}, state, {
                error: {},
                token: action.token,
                email: user.email
            });

        case actions.GET_USER_ERROR:
            cookies.remove(HEADER_TOKEN);
            delete request.defaults.headers[HEADER_TOKEN];

            return extend({}, state, {
                error: action.error,
                token: null,
                email: ""
            });

        case actions.SIGN_OUT:
            cookies.remove(HEADER_TOKEN);
            delete request.defaults.headers[HEADER_TOKEN];


            return extend({}, state, {
                error: {},
                token: null,
                email: ""
            });

        default:
            return state || getInitialState();
    }
};


user.actions = actions;
user.getInitialState = getInitialState;
user.middleware = userMiddleware;
user.getUserByToken = getUserByToken;

export default user;