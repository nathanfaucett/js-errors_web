import React, {
    Component
} from "react";
import {
    injectIntl,
    FormattedMessage
} from "react-intl";
import {
    connect
} from "react-redux";

import RaisedButton from "material-ui/RaisedButton";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class Home extends Component {

    getStyles() {
        const styles = {
            root: {
                padding: "64px 0px",
                textAlign: "center"
            },
            p: {
                paddingTop: "16px"
            },
            a: {
                paddingTop: "32px"
            }
        };

        return styles;
    }

    render() {
        const {
            intl,
            signedIn
        } = this.props;
        const styles = this.getStyles();

        return <Layout>
            <Wrapper>
                <div className="Top" style={styles.root}>
                    <h3><FormattedMessage id="app.slogan"/></h3>
                    <p style={styles.p}><FormattedMessage id="app.about"/></p>
                    {
                        signedIn ?
                        <empty/> :
                        <a style={styles.a} href="/sign_in">
                            <RaisedButton
                                label={intl.formatMessage({id: "sign_in.sign_in_up"})}
                            />
                        </a>
                    }
                </div>
            </Wrapper>
        </Layout>;
    }
}


const mapDispatchToProps = ( /* dispatch */ ) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        signedIn: !!state.user.token
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));