import extend from "@nathanfaucett/extend";


const actions = {
    TOGGLE_NAV: "header.TOGGLE_NAV",
    SET_NAV: "header.SET_NAV"
};


const getInitialState = () => {
    return {
        navOpen: false
    };
};

const header = (state, action) => {
    switch (action.type) {
        case actions.TOGGLE_NAV:
            return extend({}, state, {
                navOpen: !state.navOpen
            });

        case actions.SET_NAV:
            return extend({}, state, {
                navOpen: action.value
            });

        default:
            return state || getInitialState();
    }
};


header.actions = actions;
header.getInitialState = getInitialState;

export default header;