import React, {
    Component
} from "react";
import {
    injectIntl,
    FormattedMessage
} from "react-intl";
import RaisedButton from "material-ui/RaisedButton";
import page from "@nathanfaucett/page";
import arrayMap from "@nathanfaucett/array-map";
import {
    connect
} from "react-redux";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


const SOCIAL_COLORS = {
    github: "#FFFFFF",
    google: "#24292e",
    facebook: "#FFFFFF"
};
const SOCIAL_BG_COLORS = {
    github: "#24292e",
    google: "#FFFFFF",
    facebook: "#3b5998"
};


class SignIn extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn) {
            page.go("/");
        }
    }

    getStyles() {
        const styles = {
            root: {
                maxWidth: "320px",
                margin: "0 auto"
            },
            signInFormOAuth: {
                padding: "64px 0px 128px"
            }
        };
        return styles;
    }

    render() {
        const props = this.props;
        const intl = props.intl;
        const styles = this.getStyles();

        return <Layout>
          <Wrapper className="SignIn">
            <div style={styles.root}>
                <div style={styles.signInFormOAuth}>
                    <h2 style={{textAlign: "center"}}><FormattedMessage id="sign_in.sign_in_with"/></h2>
                    <div>
                        {arrayMap(this.props.providers, (provider) => {
                            return <div key={provider.name} style={{marginBottom: "16px"}}>
                                <a href={provider.auth_url} style={{width: "100%"}}><RaisedButton
                                    fullWidth={true}
                                    labelColor={SOCIAL_COLORS[provider.name]}
                                    backgroundColor={SOCIAL_BG_COLORS[provider.name]}
                                    label={intl.formatMessage({id: "sign_in." + provider.name})}
                                    icon={<img
                                        style={{
                                            height: "50%",
                                            position: "absolute",
                                            left: "0px",
                                            top: "8px"
                                        }}
                                        src={"img/" + provider.name + ".png"}
                                    />}
                                /></a>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
          </Wrapper>
        </Layout>;
    }
}


const InjectedSignIn = injectIntl(SignIn);


const mapDispatchToProps = ( /* dispatch */ ) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        signedIn: !!state.user.token,
        providers: state.signInForm.providers
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InjectedSignIn);