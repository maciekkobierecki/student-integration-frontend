/* eslint-disable import/no-named-as-default */
import {Link, Route, Switch, withRouter} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import MyFilesPage from "./MyFilesPage";
import {Spinner} from "react-redux-spinner";
import * as actions from "../actions/navActions";
import connect from "react-redux/es/connect/connect";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
const ROUTE={
  FILE_LIST:'/file-list',
  HOME: '/'
}

export const TABS={
  FILE_LIST: 'Moje studia',
  EXPLORE_SUBJECTS: 'Katalog przedmiotów',
  CREATE_GROUP: 'Utwórz grupę'
}


class App extends React.Component {
  tabSelected(selectedTabName){
    const { tabSelected } = this.props;
    tabSelected(selectedTabName);
  }

  render() {
    return (
      <div className="app">
        <Spinner/>
        <div className="navbar">
          <div className={"option" + (this.props.currentTab === TABS.FILE_LIST ? " selected" : "")}>
            <Link to="/file-list" onClick={() => this.tabSelected(TABS.FILE_LIST)}>{TABS.FILE_LIST}</Link>
          </div>
          <div className={"option" + (this.props.currentTab === TABS.EXPLORE_SUBJECTS ? " selected" : "")}>
            <Link to="/" onClick={() => this.tabSelected(TABS.EXPLORE_SUBJECTS)}>{TABS.EXPLORE_SUBJECTS}</Link>
          </div>
          <div className={"option" + (this.props.currentTab === TABS.CREATE_GROUP ? " selected" : "")}>
            <Link to="/" onClick={() => this.tabSelected(TABS.CREATE_GROUP)}>{TABS.CREATE_GROUP}</Link>
          </div>
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
  currentTab: PropTypes.string,
  tabSelected: PropTypes.func

};

const mapStateToProps = (state) => {
  const { currentTabName } = state.appReducer;
  return {
    currentTab: currentTabName
  };
};

const mapDispatchToProps = (dispatch) => ({
  tabSelected: (selectedTabName) => dispatch(actions.tabSelected(selectedTabName))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App)));
