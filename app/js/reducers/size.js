import environment from "@nathanfaucett/environment";
import extend from "@nathanfaucett/extend";


const actions = {
    CHANGE: "size.CHANGE"
};


const getInitialState = () => {
    return {
        width: environment.window.innerWidth || 960,
        height: environment.window.innerHeight || 640
    };
};

const size = (state, action) => {

    switch (action.type) {

        case actions.CHANGE:
            return extend({}, state, {
                width: action.width,
                height: action.height
            });

        default:
            return state || getInitialState();
    }
};


size.actions = actions;
size.getInitialState = getInitialState;

export default size;