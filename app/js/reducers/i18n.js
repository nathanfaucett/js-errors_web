import extend from "@nathanfaucett/extend";
import request from "@nathanfaucett/request";
import {
    getPreferredLanguage
} from "@jwaterfaucett/browser_langauge";
import app from "../app";


const actions = {
    SET_LOCALE: "i18n.SET_LOCALE",

    GET_SUPPORTED_LOCALES_SUCCESS: "i18n.GET_SUPPORTED_LOCALES_SUCCESS",
    GET_SUPPORTED_LOCALES_ERROR: "i18n.GET_SUPPORTED_LOCALES_ERROR",

    GET_LOCALE: "i18n.GET_LOCALE",
    GET_LOCALE_SUCCESS: "i18n.GET_LOCALE_SUCCESS",
    GET_LOCALE_ERROR: "i18n.GET_LOCALE_ERROR"
};

const getInitialState = () => {
    return {
        supportedLocales: [],
        locale: (() => {
            let locale = getPreferredLanguage("en");

            if (app.config.locales.indexOf(locale) === -1) {
                return "en";
            } else {
                return locale;
            }
        })(),
        loading: false,
        error: {},
        messages: {}
    };
};

const getSupported = (store) => {
    request.get(app.config.baseUrl + "/api/form_data/supported_locales")
        .then((response) => {
            store.dispatch({
                type: actions.GET_SUPPORTED_LOCALES_SUCCESS,
                value: response.data.value
            });
        })
        .catch((response) => {
            store.dispatch({
                type: actions.GET_SUPPORTED_LOCALES_ERROR,
                error: response.data
            });
        });
};

const i18nMiddleware = (store) => (next) => (action) => {
    switch (action.type) {

        case "app.INIT":
            getSupported(store);
            break;

        case actions.SET_LOCALE:
        case actions.GET_LOCALE:
            var messages = store.getState().i18n.messages[action.locale];

            if (!messages) {
                request.get("locale/" + action.locale + ".json")
                    .then(function onThen(response) {
                        store.dispatch({
                            type: actions.GET_LOCALE_SUCCESS,
                            locale: action.locale,
                            messages: response.data
                        });
                    })
                    .catch(function onCatch(response) {
                        store.dispatch({
                            type: actions.GET_LOCALE_ERROR,
                            error: response.data
                        });
                    });
            } else {
                store.dispatch({
                    type: actions.GET_LOCALE_SUCCESS,
                    locale: action.locale,
                    messages: messages
                });
            }
            break;
    }

    return next(action);
};

const i18n = (state, action) => {

    switch (action.type) {

        case actions.GET_SUPPORTED_LOCALES_SUCCESS:
            return extend({}, state, {
                supportedLocales: action.value
            });

        case actions.SET_LOCALE:
        case actions.GET_LOCALE:
            return extend({}, state, {
                loading: action.locale,
                locale: action.locale
            });

        case actions.GET_LOCALE_SUCCESS:
            var messages = extend({}, state.messages);

            messages[action.locale] = action.messages;

            return extend({}, state, {
                loading: false,
                messages: messages
            });

        case actions.GET_LOCALE_ERROR:
            return extend({}, state, {
                loading: false,
                error: action.error
            });

        default:
            return state || getInitialState();
    }
};


i18n.actions = actions;
i18n.getInitialState = getInitialState;
i18n.getSupported = getSupported;
i18n.middleware = i18nMiddleware;

export default i18n;