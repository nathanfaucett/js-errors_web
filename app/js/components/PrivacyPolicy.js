import React, {
    Component
} from "react";
import {
    FormattedMessage
} from "react-intl";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class PrivacyPolicy extends Component {

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
                paddingLeft: "32px"
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
      <Wrapper className="PrivacyPolicy" style={styles.root}>

        <h1><FormattedMessage id="privacy_policy.privacy_policy"/></h1>

        <ul>
            <h1><FormattedMessage id="privacy_policy.part_1.header"/></h1>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.1_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.1_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.1_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.2_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.2_body"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_c"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_d"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_e"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.2_body_f"/></p></li>
                </ul>
                <p><FormattedMessage id="privacy_policy.part_1.2_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.3_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.3_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.3_body2"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_c"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_d"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_e"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_f"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_g"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_h"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.3_body2_i"/></p></li>
                </ul>
                <p><FormattedMessage id="privacy_policy.part_1.3_body3"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.3_body4"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.3_body5"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.4_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.4_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.4_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.4_body3"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.4_body3_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.4_body3_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.4_body3_c"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.4_body3_d"/></p></li>
                </ul>
                <p><FormattedMessage id="privacy_policy.part_1.4_body4"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.5_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.5_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.5_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.6_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.6_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.6_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.6_body3"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.6_body3_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.6_body3_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_1.6_body3_c"/></p></li>
                </ul>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.7_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.7_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.7_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.7_body3"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.8_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.8_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.8_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.9_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.9_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.9_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.9_body3"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.9_body4"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.10_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.10_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_1.10_body2"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_1.11_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_1.11_body"/></p>
            </li>
        </ul>

        <ul style={styles.ul}>

            <h1><FormattedMessage id="privacy_policy.part_2.header"/></h1>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.1_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.1_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.1_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.1_body3"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.1_body4"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.2_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.2_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.2_body2"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.2_body2_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.2_body2_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.2_body2_c"/></p></li>
                </ul>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.3_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.3_body"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.3_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.3_body3"/></p>
                <p><FormattedMessage
                    id="privacy_policy.part_2.3_body4"
                    values={{link: <a href="http://www.google.com/policies/privacy">http://www.google.com/policies/privacy</a>}}/>
                </p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.4_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.4_body"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.5_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.5_body"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.5_body_a"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.5_body_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.5_body_c"/></p></li>
                </ul>
                <p><FormattedMessage id="privacy_policy.part_2.5_body2"/></p>
                <p><FormattedMessage id="privacy_policy.part_2.5_body3"/></p>
            </li>

            <li style={styles.li}>
                <h2><FormattedMessage id="privacy_policy.part_2.6_header"/></h2>
                <p><FormattedMessage id="privacy_policy.part_2.6_body"/></p>
                <ul style={styles.ulInner}>
                    <li style={styles.liInner}><p>
                        <FormattedMessage
                            id="privacy_policy.part_2.6_body_a"
                            values={{link: <a href="http://support.microsoft.com/kb/278835">http://support.microsoft.com/kb/278835</a>}}/>
                    </p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.6_body_b"/></p></li>
                    <li style={styles.liInner}><p><FormattedMessage id="privacy_policy.part_2.6_body_c"/></p></li>
                </ul>
                <p><FormattedMessage id="privacy_policy.part_2.6_body2"/></p>
            </li>
        </ul>
      </Wrapper>
    </Layout>;
    }
}


export default PrivacyPolicy;