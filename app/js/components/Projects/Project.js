import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import PropTypes from "prop-types";
import {
    ListItem
} from "material-ui/List";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Visibility from "material-ui/svg-icons/action/visibility";
import Delete from "material-ui/svg-icons/action/delete";
import app from "../../app";


class Project extends Component {

    constructor(props, context) {
        super(props, context);

        this.mounted = false;
        this.state = {
            open: false
        };

        this.onDoubleClick = () => {
            app.page.go("/projects/" + this.props.project.id);
        };
        this.onClick = () => {
            let open = !this.state.open;

            process.nextTick(() => {
                if (open !== this.state.open && this.mounted) {
                    this.setState({
                        open: open
                    });
                }
            });
        };
        this.onRequestChange = (open) => {
            let openState = this.state.open;

            process.nextTick(() => {
                if (open !== openState && this.mounted) {
                    this.setState({
                        open: open
                    });
                }
            });
        };

        this.onRegenerateToken = () => {
            this.props.regenerateProjectToken(this.props.project.id);
        };
        this.onDeleteProject = () => {
            this.props.deleteProject(this.props.project.id);
        };
    }

    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    getStyles() {
        const styles = {
            root: {},
            menuIconButton: {
                padding: "0px",
                width: "24px",
                height: "24px"
            },
            iconButton: {
                padding: "0px",
                overflow: "hidden"
            }
        };

        return styles;
    }

    render() {
            const props = this.props;
            const {
                project,
                intl
            } = props;
            const styles = this.getStyles();

            return <ListItem
            className="Project"
            style={styles.root}
            primaryText={project.name}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
            rightIcon={<IconMenu
                    open={this.state.open}
                    onRequestChange={this.onRequestChange}
                    iconButtonElement={<IconButton style={styles.menuIconButton}>
                        <MoreVertIcon/>
                    </IconButton>}
                    targetOrigin={{horizontal: "right", vertical: "top"}}
                    anchorOrigin={{horizontal: "right", vertical: "top"}}
                >
                <MenuItem
                    href={"/projects/" + project.id}
                    primaryText={intl.formatMessage({id: "projects.view"})}
                    leftIcon={<IconButton style={styles.iconButton}>
                        <Visibility/>
                    </IconButton>}
                />
                <MenuItem
                    onTouchTap={this.deleteProject}
                    primaryText={intl.formatMessage({id: "projects.delete"})}
                    leftIcon={<IconButton style={styles.iconButton}>
                        <Delete/>
                    </IconButton>}
                />
            </IconMenu>}
        />;
    }
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired,
    regenerateProjectToken: PropTypes.func.isRequired
};


export default injectIntl(Project);