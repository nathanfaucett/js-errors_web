import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import PropTypes from "prop-types";


class ProjectError extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getStyles() {
        const styles = {
            root: {}
        };

        return styles;
    }

    render() {
        const props = this.props;
        const {
            //intl,
            projectError
        } = props;
        const styles = this.getStyles();

        return <div className="ProjectError" style={styles.root}>
            {JSON.stringify(projectError)}
        </div>;
    }
}

ProjectError.propTypes = {
    projectError: PropTypes.object.isRequired
};


export default injectIntl(ProjectError);