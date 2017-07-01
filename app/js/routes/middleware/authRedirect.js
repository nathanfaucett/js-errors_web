import app from "../../app";


const authRedirect = (ctx, next) => {
    var pathname = ctx.pathname,
        user = app.store.getState().user;

    if (!user.token) {
        if (pathname !== "/sign_in") {
            app.page.go("/sign_in");
        } else {
            next();
        }
    } else {
        next();
    }
};


export default authRedirect;
export {
    authRedirect
};