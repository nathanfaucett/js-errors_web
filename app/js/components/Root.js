import React, {
    Component
} from "react";
import {
    PropTypes
} from "prop-types";
import {
    Provider
} from "react-redux";
import App from "./App";


class Root extends Component {
    render() {
        return <Provider store={this.props.store}>
            <App/>
        </Provider>;
    }
}

Root.propTypes = {
    store: PropTypes.shape({
        getState: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    }).isRequired
};


export default Root;