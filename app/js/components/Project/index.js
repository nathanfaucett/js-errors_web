import React, {
    Component
} from "react";
import {
    FormattedMessage,
    injectIntl
} from "react-intl";
import {
    connect
} from "react-redux";

import TextField from "material-ui/TextField";
import {
    List
} from "material-ui/List";
import FontIcon from "material-ui/FontIcon";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import arrayMap from "@nathanfaucett/array-map";
import domCaret from "@nathanfaucett/dom_caret";

import projects from "../../reducers/projects";
import Layout from "../Layout";
import Wrapper from "../Wrapper";
import ProjectError from "./ProjectError";


class Project extends Component {

    constructor(props, context) {
        super(props, context);

        this.loaded = false;

        this.state = {
            showToken: false
        };

        this.onClickToken = () => {
            let tokenRef = this.refs.token;

            if (tokenRef && tokenRef.input) {
                domCaret.set(tokenRef.input, 0, this.props.project.token.length);
            }
        };
        this.onToggleShowToken = () => {
            this.setState({
                showToken: !this.state.showToken
            });
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.project && nextProps.id) {
            this.load(nextProps);
        }
    }

    load(props) {
        if (!this.loaded) {
            this.loaded = true;
            props.getProject(props.id);
            props.getProjectErrors(props.id);
        }
    }

    getStyles() {
        const styles = {
            root: {},
            header: {
                padding: "16px 0px"
            },
            info: {},
            inline: {
                verticalAlign: "top",
                display: "inline-block"
            },
            showToken: {
                cursor: "pointer",
                padding: "15px 16px 0px"
            },
            errors: {}
        };

        return styles;
    }

    render() {
        const props = this.props;
        const state = this.state;
        const {
            //intl,
            project,
            projectErrors
        } = props;
        const styles = this.getStyles();

        return <Layout>
            <Wrapper className="Project">
                <div style={styles.root}>
                    <div style={styles.header}>
                        <a href="/projects"><FormattedMessage id={"projects.back_to_projects"}/></a>
                    </div>
                    {
                        project ?
                        <div style={styles.info}>
                            <h1>{project.name}</h1>
                            <div>
                                <h3 style={styles.inline}>
                                    <FormattedMessage id={"projects.api_token"}/>
                                </h3>
                                <div style={styles.inline}>
                                    <FontIcon style={styles.showToken} onTouchTap={this.onToggleShowToken}>
                                    {
                                        state.showToken ?
                                        <Visibility/> :
                                        <VisibilityOff/>
                                    }
                                    </FontIcon>
                                </div>
                            </div>
                            <div>
                            {
                                state.showToken ?
                                <TextField
                                    ref="token"
                                    name="token"
                                    value={project.token}
                                    fullWidth={true}
                                    onTouchTap={this.onClickToken}
                                /> :
                                <empty/>
                            }
                            </div>
                        </div> :
                        <empty/>
                    }
                    <div style={styles.errors}>
                        <List>
                        {
                            projectErrors ?
                            arrayMap(projectErrors, (projectError) => {
                                return <ProjectError
                                    key={projectError.id}
                                    projectError={projectError}
                                />;
                            }) :
                            <empty/>
                        }
                        </List>
                    </div>
                </div>
            </Wrapper>
        </Layout>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getProject(id) {
            dispatch({
                type: projects.actions.GET_PROJECT,
                id: id
            });
        },
        getProjectErrors(id) {
            dispatch({
                type: projects.actions.ALL_PROJECT_ERRORS,
                id: id
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
    let id = state.route.ctx.params ? state.route.ctx.params.id : null;

    return {
        id: id,
        project: state.projects.projectHash[id],
        projectErrors: state.projects.projectErrors[id]
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Project));