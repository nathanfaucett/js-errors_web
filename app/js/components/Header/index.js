import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import page from "@nathanfaucett/page";

import {
    connect
} from "react-redux";
import Logged from "./Logged";
import Login from "./Login";
import Nav from "./Nav";
import user from "../../reducers/user";
import header from "../../reducers/header";


class Header extends Component {

    constructor(props) {
        super(props);

        this.onToggle = () => {
            this.props.toggleNav();
        };
        this.onTitleTouchTap = () => {
            page.go("/");
        };
    }

    getStyles() {
        const styles = {
            title: {
                cursor: "pointer"
            }
        };
        return styles;
    }

    render() {
        const props = this.props;
        const intl = props.intl;
        const styles = this.getStyles();

        return <div className="Header" id="Header">
            <AppBar
                title={intl.formatMessage({id: "app.name"})}
                titleStyle={styles.title}
                onTitleTouchTap={this.onTitleTouchTap}
                iconElementLeft={
                    <IconButton onTouchTap={this.onToggle}><MenuIcon/></IconButton>
                }
                iconElementRight={props.signedIn ? <Logged signOut={props.signOut}/> : <Login/>}
            />
            <Nav {...props}/>
        </div>;
    }
}


const InjectedHeader = injectIntl(Header);

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav() {
            dispatch({
                type: header.actions.TOGGLE_NAV
            });
        },
        setNavOpen(value) {
            dispatch({
                type: header.actions.SET_NAV,
                value: value
            });
        },
        signOut() {
            dispatch({
                type: user.actions.SIGN_OUT
            });
        }
    };
};

const mapStateToProps = (state) => {
    return {
        pathname: state.route.ctx.pathname,
        signedIn: !!state.user.token,
        navOpen: state.header.navOpen
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InjectedHeader);