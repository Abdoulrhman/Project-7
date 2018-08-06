import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound"
/*Stateless Function For Routing the UI components */
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} /> {/*Route 1 if [/] Render {App}*/}
            <Route component={NotFound} /> {/*Route 2  else Render {NotFound}*/}
        </Switch>
    </BrowserRouter>
);

export default Router;
