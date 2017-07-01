import React, {
    Component
} from "react";
import {
    FormattedMessage
} from "react-intl";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import arrayMap from "@nathanfaucett/array-map";
import extend from "@nathanfaucett/extend";
import app from "../../app";


const LINKS = [];


class Nav extends Component {

    constructor(props) {
        super(props);

        this.onClose = () => {
            this.props.setNavOpen(false);
        };
        this.onCloseAndSignOut = () => {
            this.props.setNavOpen(false);
            this.props.signOut();
            app.page.go("/sign_in");
        };
        this.setNavOpen = (value) => {
            this.props.setNavOpen(value);
        };
    }

    getStyles() {
        const styles = {
            link: {
                display: "block"
            }
        };
        return styles;
    }

    createLink(styles, id, href, pathname, onTouchTap) {
        let style = styles.link;

        if (href === pathname) {
            style = extend({}, style, {
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            });
        }

        return <a style={style} key={id} href={href}>
      <MenuItem onTouchTap={onTouchTap}>
        <FormattedMessage id={id}/>
      </MenuItem>
    </a>;
    }

    render() {
        const props = this.props;
        const pathname = props.pathname;
        const styles = this.getStyles();


        let links = arrayMap(LINKS, (link) => {
            return this.createLink(styles, "header.nav." + link, "/" + link, pathname, this.onClose);
        });

        links.unshift(
            this.createLink(styles, "header.nav.home", "/", pathname, this.onClose)
        );

        if (props.signedIn) {
            links.push(
                this.createLink(styles, "header.nav.sign_out", "/sign_in", pathname, this.onCloseAndSignOut)
            );
        } else {
            links.push(
                this.createLink(styles, "header.nav.sign_in", "/sign_in", pathname, this.onClose)
            );
        }

        return <div className="Nav">
      <Drawer
        docked={false}
        width={256}
        open={props.navOpen}
        onRequestChange={this.setNavOpen}
      >
        {links}
      </Drawer>
    </div>;
    }
}


export default Nav;