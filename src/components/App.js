/* eslint-disable import/no-named-as-default */
import {Link, Route, Switch, withRouter} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import MyStudiesPage from "./my-studies-page/MyStudiesPage";
import {Spinner} from "react-redux-spinner";
import * as actions from "../actions/appActions";
import connect from "react-redux/es/connect/connect";
import FacebookLogin from 'react-facebook-login';
import GroupCreationPage from "./group-creation-page/GroupCreationPage";
import 'bootstrap/dist/css/bootstrap.css';
import MyGroupsPage from "./my-groups-page/MyGroupsPage";
import RecruitmentPage from "./recruitment-page/RecruitmentPage";


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
const ROUTE = {
  FILE_LIST: '/file-list',
  CREATE_GROUP: '/create-group',
  MY_GROUPS: '/my-groups',
  RECRUITMENT: '/recruitment',
  HOME: '/'
};

export const TABS = {
  FILE_LIST: 'Moje studia',
  EXPLORE_SUBJECTS: 'Katalog przedmiotów',
  CREATE_GROUP: 'Utwórz grupę',
  MY_GROUPS: 'Moje grupy'
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  tabSelected(selectedTabName) {
    const {tabSelected} = this.props;
    tabSelected(selectedTabName);
  }

  responseFacebook(data) {
    const {facebookLogin} = this.props;
    facebookLogin(data);
  }

  render() {
    const loginPageImage = require('../../images/students.JPG');
    if (this.props.isAuthenticated) {
      return (
        <div className="app">
          <Spinner/>
          <div className="navbar sticky-top si-color">
            <Link to={ROUTE.FILE_LIST} className="navbar-brand si-color-text si-navbar-option"
                  onClick={() => this.tabSelected(TABS.FILE_LIST)}>{TABS.FILE_LIST}</Link>
            <Link to="/" className="navbar-brand si-color-text si-navbar-option"
                  onClick={() => this.tabSelected(TABS.EXPLORE_SUBJECTS)}>{TABS.EXPLORE_SUBJECTS}</Link>
            <Link to={ROUTE.CREATE_GROUP} className="navbar-brand si-color-text si-navbar-option"
                  onClick={() => this.tabSelected(TABS.CREATE_GROUP)}>{TABS.CREATE_GROUP}</Link>
            <Link to={ROUTE.MY_GROUPS} className="navbar-brand si-color-text si-navbar-option"
                  onClick={() => this.tabSelected(TABS.MY_GROUPS)}>{TABS.MY_GROUPS}</Link>
            <div className="navbar-brand ml-auto text-white"> {this.props.user}</div>
          </div>
          <div className="page-content">
            <div className={this.props.loadingCount !== 0 ? "loading" : ""}>
              <Switch>
                <Route exact path={ROUTE.HOME} component={HomePage}/>
                <Route path={ROUTE.FILE_LIST} component={MyStudiesPage}/>
                <Route path={ROUTE.CREATE_GROUP} component={GroupCreationPage}/>
                <Route path={ROUTE.MY_GROUPS} component={MyGroupsPage}/>
                <Route path='/recruitment/:hash' component={RecruitmentPage}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login-screen">
          <div className="login-content">
            <div className="login-description">
              <div>Student-integration to serwis pozwalający na dzielenie się materiałami z innymi studentami.</div>
              <div className="mt-2 mb-3">Zaloguj się i sprawdź jak to działa!</div>
              <FacebookLogin appId={this.props.appId}
                             autoLoad={false}
                             language="en_US"
                             scope="public_profile,email"
                             callback={this.responseFacebook}
                             fields="name, email, picture"
                             cssClass="login-button"
                             buttonText="Zaloguj z Facebookiem"/>
            </div>
            <div className="login-image">
              <img src={loginPageImage} alt="Test"/>
            </div>
          </div>
        </div>
      )
    }
  }
}

App.propTypes = {
  currentTab: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  appId: PropTypes.number,
  user: PropTypes.string,
  loadingCount: PropTypes.number,
  tabSelected: PropTypes.func,
  facebookLogin: PropTypes.func

};

const mapStateToProps = (state) => {
  const {currentTabName, isAuthenticated, appId, user, loadingCount} = state.app;
  return {
    currentTab: currentTabName,
    isAuthenticated: isAuthenticated,
    appId: appId,
    user: user,
    loadingCount: loadingCount
  };
};

const mapDispatchToProps = (dispatch) => ({
  tabSelected: (selectedTabName) => dispatch(actions.tabSelected(selectedTabName)),
  facebookLogin: (data) => dispatch(actions.facebookLoggedIn(data))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App)));
