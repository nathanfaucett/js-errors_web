import React, {
    Component
} from "react";
import {
    FormattedMessage
} from "react-intl";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class TermsOfService extends Component {

    getStyles() {
        const styles = {
            root: {
                marginBottom: "128px"
            },
            ul: {},
            li: {
                listStyleType: "decimal"
            },
            ulInner: {
                paddingLeft: "16px"
            },
            liInner: {
                listStyleType: "lower-alpha"
            }
        };

        return styles;
    }

    render() {
        const styles = this.getStyles();

        return <Layout>
      <Wrapper className="TermsOfService" style={styles.root}>
        <h1><FormattedMessage id="terms_of_service.terms_of_service"/></h1>

        <ul style={styles.ul}>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.1_header"/></h2>
                <p><FormattedMessage id="terms_of_service.1_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.2_header"/></h2>
                <p><FormattedMessage id="terms_of_service.2_body"/></p>
                <p><FormattedMessage id="terms_of_service.2_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.3_header"/></h2>
                <p><FormattedMessage id="terms_of_service.3_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.4_header"/></h2>
                <p>
                    <FormattedMessage id="terms_of_service.4_body"/>
                    <a href="/privacy_policy"><FormattedMessage id="privacy_policy.privacy_policy"/></a>
                </p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.5_header"/></h2>
                <p><FormattedMessage id="terms_of_service.5_body"/></p>
                <p><FormattedMessage id="terms_of_service.5_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.6_header"/></h2>
                <p><FormattedMessage id="terms_of_service.6_body"/></p>
                <p><FormattedMessage id="terms_of_service.6_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.7_header"/></h2>
                <p><FormattedMessage id="terms_of_service.7_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.8_header"/></h2>
                <p><FormattedMessage id="terms_of_service.8_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.9_header"/></h2>
                <p><FormattedMessage id="terms_of_service.9_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.10_header"/></h2>
                <p><FormattedMessage id="terms_of_service.10_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.11_header"/></h2>
                <p><FormattedMessage id="terms_of_service.11_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.12_header"/></h2>
                <p><FormattedMessage id="terms_of_service.12_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.13_header"/></h2>
                <p><FormattedMessage id="terms_of_service.13_body"/></p>
                <p><FormattedMessage id="terms_of_service.13_body2"/></p>
                <p><FormattedMessage id="terms_of_service.13_body3"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.14_header"/></h2>
                <p><FormattedMessage id="terms_of_service.14_body"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="terms_of_service.14_body_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="terms_of_service.14_body_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="terms_of_service.14_body_c"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="terms_of_service.14_body_d"/></p></li>
                </ul>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.15_header"/></h2>
                <p><FormattedMessage id="terms_of_service.15_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.16_header"/></h2>
                <p><FormattedMessage id="terms_of_service.16_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.17_header"/></h2>
                <p><FormattedMessage id="terms_of_service.17_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="terms_of_service.18_header"/></h2>
                <p><FormattedMessage id="terms_of_service.18_body"/></p>
                <p><FormattedMessage id="terms_of_service.18_body2"/></p>
            </li>
        </ul>
      </Wrapper>
    </Layout>;
    }
}


export default TermsOfService;