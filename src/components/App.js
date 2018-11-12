/* eslint-disable import/no-named-as-default */
import {Link, Route, Switch} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import MyFilesPage from "./MyFilesPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
const ROUTE={
  FILE_LIST:'/file-list',
  HOME: '/'
}

const NAV_OPTIONS={
  FILE_LIST: 'Lista plików',
}


class App extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link to="/" className="option">Home</Link>
          <Link to="/file-list" className="option">{NAV_OPTIONS.FILE_LIST}</Link>
        </div>
        <Switch>
          <Route exact path={ROUTE.HOME} component={HomePage} />
          <Route path={ROUTE.FILE_LIST} component={MyFilesPage} />
          <Route component={NotFoundPage} />
        </Switch>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
