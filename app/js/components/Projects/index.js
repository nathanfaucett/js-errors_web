import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import {
    connect
} from "react-redux";

import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Divider from "material-ui/Divider";
import {
    List
} from "material-ui/List";
import arrayMap from "@nathanfaucett/array-map";

import projects from "../../reducers/projects";
import Layout from "../Layout";
import Wrapper from "../Wrapper";
import Project from "./Project";


class Projects extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dialogOpen: false
        };

        this.onDialogOpen = () => {
            this.setState({
                dialogOpen: true
            });
        };
        this.onDialogClose = () => {
            this.setState({
                dialogOpen: false
            });
        };
        this.onNewProject = () => {
            this.props.createNewProject(this.props.newProjectName);
            this.onDialogClose();
        };
        this.onProjectNameChange = (e, value) => {
            this.props.setNewProjectName(value);
        };
    }

    componentDidMount() {
        this.props.allProjects();
    }

    getStyles() {
        const styles = {
            root: {},
            newProject: {
                padding: "16px 0px"
            },
            projects: {
                paddingBottom: "32px"
            }
        };

        return styles;
    }

    render() {
        const props = this.props;
        const {
            projects,
            intl
        } = props;
        const styles = this.getStyles();

        return <Layout>
            <Wrapper className="Projects">
                <div style={styles.root}>
                    <div style={styles.newProject}>
                        <RaisedButton
                            label={intl.formatMessage({id: "projects.new"})}
                            primary={true}
                            onTouchTap={this.onDialogOpen}
                        />
                    </div>
                    <div style={styles.projects}>
                        <List>
                        {
                            arrayMap(projects, (project, index) => {
                                return <span key={project.id + "-" + index}>
                                    <Project
                                        key={project.id}
                                        project={project}
                                        deleteProject={props.deleteProject}
                                        regenerateProjectToken={props.regenerateProjectToken}
                                    />
                                    {index < (projects.length - 1) ? <Divider/> : <empty/>}
                                </span>;
                            })
                        }
                        </List>
                    </div>
                    <Dialog
                        title={intl.formatMessage({id: "projects.new_dialog"})}
                        actions={[
                            <FlatButton
                                label={intl.formatMessage({id: "projects.cancel"})}
                                primary={false}
                                keyboardFocused={false}
                                onTouchTap={this.onDialogClose}
                            />,
                            <FlatButton
                                label={intl.formatMessage({id: "projects.create"})}
                                primary={true}
                                keyboardFocused={false}
                                onTouchTap={this.onNewProject}
                            />
                        ]}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.onDialogClose}
                    >
                    <TextField
                        fullWidth={true}
                        value={props.newProjectName}
                        onChange={this.onProjectNameChange}
                        hintText={intl.formatMessage({id: "projects.name"})}
                    />
                    </Dialog>
                </div>
            </Wrapper>
        </Layout>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        allProjects() {
            dispatch({
                type: projects.actions.ALL_PROJECTS
            });
        },
        createNewProject(name) {
            dispatch({
                type: projects.actions.CREATE_PROJECT,
                name: name
            });
        },

        setNewProjectName(value) {
            dispatch({
                type: projects.actions.SET_NEW_PROJECT_NAME,
                value: value
            });
        },

        deleteProject(id) {
            dispatch({
                type: projects.actions.DELETE_PROJECT,
                id: id
            });
        },
        regenerateProjectToken(id) {
            dispatch({
                type: projects.actions.REGENERATE_PROJECT_TOKEN,
                id: id
            });
        }
    };
};

const mapStateToProps = (state) => {
    return {
        newProjectName: state.projects.newProjectName,
        projects: state.projects.projects
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Projects));