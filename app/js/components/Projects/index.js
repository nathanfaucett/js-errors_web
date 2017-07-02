import React, {
    Component
} from "react";
import {
    injectIntl
} from "react-intl";
import {
    connect
} from "react-redux";

import projects from "../../reducers/projects";

import Layout from "../Layout";
import Wrapper from "../Wrapper";


class Projects extends Component {

    getStyles() {
        const styles = {
            root: {}
        };

        return styles;
    }

    componentDidMount() {
        this.props.allProjects();
    }

    render() {
        const styles = this.getStyles();

        return <Layout>
            <Wrapper className="Projects">
                <div style={styles.root}>
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