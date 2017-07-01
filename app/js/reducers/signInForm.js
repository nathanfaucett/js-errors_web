import extend from "@nathanfaucett/extend";
import request from "@nathanfaucett/request";
import app from "../app";


const actions = {
    PROVIDERS_SUCCESS: "signInForm.PROVIDERS_SUCCESS",
    PROVIDERS_ERROR: "signInForm.PROVIDERS_ERROR"
};

const getInitialState = () => {
    return {
        providers: [],
        error: {}
    };
};

const getProviders = (store) => {
    request.get(app.config.baseUrl + "/api/oauth2_services")
        .then(function onThen(response) {
            store.dispatch({
                type: actions.PROVIDERS_SUCCESS,
                providers: response.data.oauth2_providers
            });
        })
        .catch(function onCatch(response) {
            store.dispatch({
                type: actions.PROVIDERS_ERROR,
                error: response.data
            });
        });
};

const signInForm = (state, action) => {

    switch (action.type) {

        case actions.PROVIDERS_SUCCESS:
            return extend({}, state, {
                providers: action.providers
            });

        case actions.PROVIDERS_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case "app.INIT":
            getProviders(app.store);
        default:
            return state || getInitialState();
    }
};


signInForm.actions = actions;
signInForm.getInitialState = getInitialState;

export default signInForm;