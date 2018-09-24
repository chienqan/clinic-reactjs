import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import indexRoutes from "./routes/index.jsx";
import configureStore from "./store/configureStore.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/styles.css?v=1.1.1";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key}/>;
                })}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);
