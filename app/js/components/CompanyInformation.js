import React, {
    Component
} from "react";
import {
    FormattedMessage
} from "react-intl";

import Layout from "./Layout";
import Wrapper from "./Wrapper";


class CompanyInformation extends Component {

    getStyles() {
        const styles = {
            root: {
                marginBottom: "128px"
            }
        };

        return styles;
    }

    render() {
        const styles = this.getStyles();

        return <Layout>
      <Wrapper className="CompanyInformation" style={styles.root}>

        <h2><FormattedMessage id="company_infomation.company_infomation"/></h2>

        <h2><FormattedMessage id="company_infomation.education"/></h2>
        <p><FormattedMessage id="company_infomation.education_body"/></p>

        <h2><FormattedMessage id="company_infomation.technology"/></h2>
        <p><FormattedMessage id="company_infomation.technology_body"/></p>

        <h2><FormattedMessage id="company_infomation.our_goals"/></h2>
        <p><FormattedMessage id="company_infomation.our_goals_body"/></p>

      </Wrapper>
    </Layout>;
    }
}


export default CompanyInformation;