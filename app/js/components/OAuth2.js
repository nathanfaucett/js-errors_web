import React, {
    Component
} from "react";
import {
    connect
} from "react-redux";
import app from "../app";
import user from "../reducers/user";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class OAuth2 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.signInWithToken(this.props.token);
    }

    componentDidUpdate() {
        if (this.props.signedIn) {
            app.page.go("/");
        }
    }

    getStyles() {
        const styles = {
            root: {}
        };
        return styles;
    }

    render() {
        const styles = this.getStyles();

        return <Layout>
          <Wrapper className="OAuth2">
            <div style={styles.root}></div>
          </Wrapper>
          </Layout>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signInWithToken: (token) => {
            dispatch({
                type: user.actions.GET_USER_BY_TOKEN,
                token: token
            });
        }
    };
};

const mapStateToProps = (state) => {
    return {
        signedIn: !!state.user.token,
        token: state.route.ctx.params.token
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OAuth2);