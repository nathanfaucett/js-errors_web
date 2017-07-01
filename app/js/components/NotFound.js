import React, {
    Component
} from "react";
import {
    FormattedMessage
} from "react-intl";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class NotFound extends Component {

    getStyles() {
        const styles = {
            root: {
                margin: "32px 0px 128px",
                textAlign: "center"
            },
            h1: {
                fontWeight: "normal"
            }
        };
        return styles;
    }

    render() {
        const styles = this.getStyles();

        return <Layout>
            <Wrapper className="NotFound">
                <div style={styles.root}>
                    <h1 style={styles.h1}><FormattedMessage id="errors.not_found"/></h1>
                </div>
            </Wrapper>
        </Layout>;
    }
}


export default NotFound;