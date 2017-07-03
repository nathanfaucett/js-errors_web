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

    DELETE_PROJECT: "projects.DELETE_PROJECT",
    DELETE_PROJECT_SUCCESS: "projects.DELETE_PROJECT_SUCCESS",
    DELETE_PROJECT_ERROR: "projects.DELETE_PROJECT_ERROR",

    ALL_PROJECT_ERRORS: "projects.ALL_PROJECT_ERRORS",
    ALL_PROJECT_ERRORS_SUCCESS: "projects.ALL_PROJECT_ERRORS_SUCCESS",
    ALL_PROJECT_ERRORS_ERROR: "projects.ALL_PROJECT_ERRORS_ERROR",

    CREATE_PROJECT: "projects.CREATE_PROJECT",
    REGENERATE_PROJECT_TOKEN: "projects.REGENERATE_PROJECT_TOKEN"
};

const getInitialState = () => {
    return {
        error: {},

        newProjectName: "",

        projects: [],
        projectHash: {},

        projectErrors: {}
    };
};

const findIndexById = (array, id) => {
    for (let i = 0, il = array.length; i < il; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
};

const push = (array, item) => {
    let index = findIndexById(array, item.id);

    if (index === -1) {
        array.push(item);
    } else {
        array[index] = item;
    }
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
                request.get(app.config.baseUrl + "/api/projects/" + action.id)
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
        case actions.DELETE_PROJECT:
            if (state.projectHash[action.id]) {
                request.delete(app.config.baseUrl + "/api/projects/" + action.id)
                    .then(( /* response */ ) => {
                        store.dispatch({
                            type: actions.DELETE_PROJECT_SUCCESS,
                            id: action.id
                        });
                    })
                    .catch((response) => {
                        store.dispatch({
                            type: actions.DELETE_PROJECT_ERROR,
                            error: response.data.errors
                        });
                    });
            }
            break;

        case actions.CREATE_PROJECT:
            request.post(app.config.baseUrl + "/api/projects", {
                    project: {
                        name: action.name
                    }
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

        case actions.REGENERATE_PROJECT_TOKEN:
            request.patch(app.config.baseUrl + "/api/projects/" + action.id + "/regenerate_token")
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
            break;

        case actions.ALL_PROJECT_ERRORS:
            request.get(app.config.baseUrl + "/api/projects/" + action.id + "/errors")
                .then((response) => {
                    store.dispatch({
                        type: actions.ALL_PROJECT_ERRORS_SUCCESS,
                        id: action.id,
                        projectErrors: response.data.data
                    });
                })
                .catch((response) => {
                    store.dispatch({
                        type: actions.ALL_PROJECT_ERRORS_ERROR,
                        id: action.id,
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
                    projects = state.projects.slice(),
                    project = action.project;

                projectHash[project.id] = project;
                push(projects, project);

                return extend({}, state, {
                    projectHash: projectHash,
                    projects: projects
                });
            }
        case actions.GET_PROJECT_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case actions.DELETE_PROJECT:
            {
                let projectHash = extend({}, state.projectHash),
                    projects = state.projects.slice(),
                    index = findIndexById(projects, action.id);

                if (index !== -1) {
                    delete projectHash[action.id];
                    projects.splice(index, 1);
                }

                return extend({}, state, {
                    projectHash: projectHash,
                    projects: projects
                });
            }
        case actions.DELETE_PROJECT_SUCCESS:
            return state;
        case actions.DELETE_PROJECT_ERROR:
            return extend({}, state, {
                error: action.error
            });

        case actions.CREATE_PROJECT:
            return extend({}, state, {
                newProjectName: ""
            });

        case actions.SET_NEW_PROJECT_NAME:
            return extend({}, state, {
                newProjectName: action.value
            });

        case actions.ALL_PROJECT_ERRORS_SUCCESS:
            {
                let projectErrors = extend({}, state.projectErrors);

                projectErrors[action.id] = action.projectErrors;

                return extend({}, state, {
                    projectErrors: projectErrors
                });
            }
        case actions.ALL_PROJECT_ERRORS_ERROR:
            return extend({}, state, {
                error: action.error
            });

        default:
            return state || getInitialState();
    }
};


projects.actions = actions;
projects.getInitialState = getInitialState;
projects.middleware = projectsMiddleware;

export default projects;