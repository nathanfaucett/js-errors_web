import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import {
    white
} from "material-ui/styles/colors";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";


class Logged extends Component {

    render() {
        const {
            intl,
            signOut
        } = this.props;

        return <IconMenu
                iconStyle={{
                    color: white
                }}
                iconButtonElement={
                    <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "top"}}
            >
            <MenuItem onTouchTap={signOut} primaryText={intl.formatMessage({id: "sign_in.sign_out"})}/>
        </IconMenu>;
    }
}

Logged.propTypes = {
    signOut: PropTypes.func.isRequired
};

Logged.muiName = "IconMenu";


export default injectIntl(Logged);