import extend from "@nathanfaucett/extend";
import request from "@nathanfaucett/request";
import arrayForEach from "@nathanfaucett/array-for_each";
import app from "../app";


const actions = {
    SET_NEW_PROJECT_NAME: "projects.SET_NEW_PROJECT_NAME",

    ALL_PROJECTS: "projects.ALL_PROJECTS",
    ALL_PROJECTS_SUCCESS: "projects.ALL_PROJECTS_SUCCESS",
    ALL_PROJECTS_ERROR: "projects.ALL_PROJECTS_ERROR",

    GET_PROJECT: "projects.GET_PROJECT",
    GET_PROJECT_SUCCESS: "projects.GET_PROJECT_SUCCESS",
    GET_PROJECT_ERROR: "projects.GET_PROJECT_ERROR",

    CREATE_PROJECT: "projects.CREATE_PROJECT",
    CREATE_PROJECT_SUCCESS: "projects.CREATE_PROJECT_SUCCESS",
    CREATE_PROJECT_ERROR: "projects.CREATE_PROJECT_ERROR"
};

const getInitialState = () => {
    return {
        error: {},

        newProjectName: "",

        projects: [],
        projectHash: {}
    };
};

const projectsMiddleware = (store) => (next) => (action) => {
    const state = store.getState().projects;

    switch (action.type) {
        case actions.ALL_PROJECTS:
            request.get(app.config.baseUrl + "/api/projects")
                .then((response) => {
                    store.dispatch({
                        type: actions.ALL_PROJECTS_SUCCESS,
                        projects: response.data.data
                    });
                })
                .catch((response) => {
                    store.dispatch({
                        type: actions.ALL_PROJECTS_ERROR,
                        error: response.data.errors
                    });
                });
            break;
        case actions.GET_PROJECT:
            if (!state.projectHash[action.id]) {
                request.get(app.config.baseUrl + "/api/project/" + action.id)
                    .then((response) => {
                        store.dispatch({
                            type: actions.GET_PROJECT_SUCCESS,
                            project: response.data.data
                        });
                    })
                    .catch((response) => {
                        store.dispatch({
                            type: actions.GET_PROJECT_ERROR,
                            error: response.data.errors
                        });
                    });
            }
            break;
        case actions.CREATE_PROJECT:
            request.post(app.config.baseUrl + "/api/project", {
                    name: action.name
                }).then((response) => {
                    store.dispatch({
                        type: actions.GET_PROJECT_SUCCESS,
                        project: response.data.data
                    });
                })
                .catch((response) => {
                    store.dispatch({
                        type: actions.GET_PROJECT_ERROR,
                        error: response.data.errors
                    });
                });
            break;
    }
    next(action);
};

const projects = (state, action) => {

    switch (action.type) {

        case actions.ALL_PROJECTS_SUCCESS:
            {
                let projectHash = {},
                    projects = action.projects.slice();

                arrayForEach(projects, (project) => {
                    projectHash[project.id] = project;
                });

                return extend({}, state, {
                    projectHash: projectHash,
                    projects: projects
                });
            }
        case actions.ALL_PROJECTS_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case actions.GET_PROJECT_SUCCESS:
            {
                let projectHash = extend({}, state.projectHash),
                    projects = state.projects.slice();

                projectHash[project.id] = project;
                projects.push(project);

                return extend({}, state, {
                    projectHash: projectHash,
                    projects: projects
                });
            }
        case actions.GET_PROJECT_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case actions.CREATE_PROJECT_SUCCESS:
            {
                let projectHash = extend({}, state.projectHash),
                    projects = state.projects.slice();

                projectHash[project.id] = project;
                projects.push(project);

                return extend({}, state, {
                    projectHash: projectHash,
                    projects: projects
                });
            }
        case actions.CREATE_PROJECT_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case actions.SET_NEW_PROJECT_NAME:
            return extend({}, state, {
                newProjectName: action.value
            });

        default:
            return state || getInitialState();
    }
};


projects.actions = actions;
projects.getInitialState = getInitialState;
projects.middleware = projectsMiddleware;

export default projects;