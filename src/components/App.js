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
  FILE_LIST: 'Moje studia',
  EXPLORE_SUBJECTS: 'Katalog przedmiotów',
  CREATE_GROUP: 'Utwórz grupę'
}


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="navbar">
          <Link to="/file-list" className="option">{NAV_OPTIONS.FILE_LIST}</Link>
          <Link to="/" className="option">{NAV_OPTIONS.EXPLORE_SUBJECTS}</Link>
          <Link to="/" className="option">{NAV_OPTIONS.CREATE_GROUP}</Link>
        </div>
        <div className="page-content">
          <Switch>
            <Route exact path={ROUTE.HOME} component={HomePage} />
            <Route path={ROUTE.FILE_LIST} component={MyFilesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
