import app from "../../app";
import route from "../../reducers/route";


const notFound = (ctx, next) => {

    if (ctx.route) {
        next();
    } else {

        app.store.dispatch({
            type: route.actions.SET_STATE,
            state: "not_found"
        });

        next();
    }
};


export {
    notFound
};
export default notFound;