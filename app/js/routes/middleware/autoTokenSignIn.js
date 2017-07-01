import cookies from "@nathanfaucett/cookies";
import page from "@nathanfaucett/page";
import app from "../../app";
import user from "../../reducers/user";


const autoTokenSignIn = (ctx, next) => {
    var token = cookies.get(app.HEADER_TOKEN);

    if (token && token !== app.store.getState().user.token) {
        user.getUserByToken(app.store, token, function onGetUser(error /* currentUser */ ) {
            if (error) {
                page.go("/sign_in");
            } else {
                next();
            }
        });
    } else {
        next();
    }
};


export default autoTokenSignIn;