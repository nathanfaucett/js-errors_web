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
import i18n from "../reducers/i18n";
import Divider from "material-ui/Divider";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import arrayMap from "@nathanfaucett/array-map";

import Wrapper from "./Wrapper";


class Footer extends Component {

    constructor(props) {
        super(props);

        this.onSelectLanguage = (e, index, value) => {
            this.props.setLocale(value);
        };
    }

    getStyles() {
        const {
            width
        } = this.props.size;
        let styles = {
            root: {
                paddingBottom: "16px"
            },
            info: {
                display: "block",
                marginTop: "34px",
                marginBottom: "0px"
            },
            locale: {
                "float": "right"
            }
        };

        if (width < 640) {
            delete styles.locale["float"];
        }

        return styles;
    }

    render() {
        const styles = this.getStyles();
        const props = this.props;
        const {
            intl
        } = props;

        return <div style={styles.root} id="Footer">
            <Divider/>
            <Wrapper className="Footer">
                <div className="grid">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <p style={styles.info}><FormattedMessage id="footer.copy" values={{year: (new Date()).getFullYear()}}/></p>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div style={styles.locale}>
                            <SelectField
                                floatingLabelText={intl.formatMessage({id: "footer.locale"})}
                                value={props.locale}
                                onChange={this.onSelectLanguage}
                            >
                                {
                                    arrayMap(props.locales, (value) => {
                                        return <MenuItem
                                            key={value.code}
                                            value={value.code}
                                            primaryText={intl.formatMessage({id: "locales." + value.code})}
                                        />;
                                    })
                                }
                            </SelectField>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </Wrapper>
        </div>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setLocale: (locale) => {
            dispatch({
                type: i18n.actions.SET_LOCALE,
                locale: locale
            });
        }
    };
};

const mapStateToProps = (state) => {
    return {
        size: state.size,
        locale: state.i18n.locale,
        locales: state.i18n.supportedLocales
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Footer));