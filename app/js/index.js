import React from "react";
import ReactDOM from "react-dom";
import environment from "@nathanfaucett/environment";
import eventListener from "@nathanfaucett/event_listener";
import once from "@nathanfaucett/once";
import injectTapEventPlugin from "react-tap-event-plugin";
import app from "./app";


injectTapEventPlugin();


eventListener.on(environment.window, "load DOMContentLoaded", once(function onLoad() {
    ReactDOM.render(
        React.createElement(app.Root, {
            store: app.store
        }),
        document.getElementById("root")
    );
    app.init();
}));