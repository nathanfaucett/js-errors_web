import React, {
    Component
} from "react";
import {
    connect
} from "react-redux";
import {
    IntlProvider
} from "react-intl";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CircularProgress from "material-ui/CircularProgress";
import i18n from "../reducers/i18n";
import app from "../app";


class App extends Component {

    componentDidMount() {
        this.props.load(this.props.locale);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.locale !== nextProps.locale) {
            this.props.load(nextProps.locale);
        }
    }

    getStyles() {
        const {
            width,
            height
        } = this.props.size;
        const styles = {
            root: {},
            center: {
                position: "absolute",
                left: ((width - 40) / 2) + "px",
                top: ((height - 40) / 2) + "px"
            }
        };

        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {
            locale,
            messages,
            state
        } = this.props;
        const Component = app.getView(state);
        const loaded = !!(Component && messages);
        let children;

        if (loaded) {
            children = <IntlProvider
                key={"loaded-" + locale}
                id={"loaded-" + locale}
                locale={locale}
                messages={messages}
            >
                <Component/>
            </IntlProvider>;
        } else {
            children = <div key="not_loaded" id="not_loaded">
                <CircularProgress style={styles.center}/>
            </div>;
        }

        return <MuiThemeProvider muiTheme={getMuiTheme(app.theme)}>
            {children}
        </MuiThemeProvider>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        load: (locale) => {
            dispatch({
                type: i18n.actions.GET_LOCALE,
                locale: locale
            });
        }
    };
};

const mapStateToProps = (state) => {
    const locale = state.i18n.locale;

    return {
        state: state.route.state,
        size: state.size,
        locale: locale,
        messages: state.i18n.messages[locale]
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);