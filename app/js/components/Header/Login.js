import React, {
    Component
} from "react";
import FlatButton from "material-ui/FlatButton";


class Login extends Component {

    render() {
        return (
            <a href="/sign_in"><FlatButton {...this.props} label="Login"/></a>
        );
    }
}

Login.muiName = "FlatButton";


export default Login;