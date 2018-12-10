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
import * as actions from "../actions/appActions";
import connect from "react-redux/es/connect/connect";
import FacebookLogin from 'react-facebook-login';


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
  constructor(props){
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  tabSelected(selectedTabName){
    const { tabSelected } = this.props;
    tabSelected(selectedTabName);
  }

  responseFacebook(data){
    debugger;
    const { facebookLogin } = this.props;
    facebookLogin(data);
  }

  render() {
    if(this.props.isAuthenticated) {
      return (
        <div className="app">
          <Spinner/>
          <div className="navbar">
            <Link to="/file-list" className="option" onClick={() => this.tabSelected(TABS.FILE_LIST)}>{TABS.FILE_LIST}</Link>
            <Link to="/" className="option"
                  onClick={() => this.tabSelected(TABS.EXPLORE_SUBJECTS)}>{TABS.EXPLORE_SUBJECTS}</Link>
            <Link to="/" className="option" onClick={() => this.tabSelected(TABS.CREATE_GROUP)}>{TABS.CREATE_GROUP}</Link>
            <div className="user-email"> {this.props.user}</div>
          </div>
          <div className="page-content">
            <Switch>
              <Route exact path={ROUTE.HOME} component={HomePage}/>
              <Route path={ROUTE.FILE_LIST} component={MyFilesPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
        </div>
      );
    }else{
      return (
        <div className="login-screen">
          <FacebookLogin appId={this.props.appId}
                         autoLoad={false}
                         language="en_US"
                         scope="public_profile,email"
                         callback={this.responseFacebook}
                         fields="name, email, picture"
                         className="facebook-login"
                         buttonText="Login With Facebook"/>
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
  tabSelected: PropTypes.func,
  facebookLogin: PropTypes.func

};

const mapStateToProps = (state) => {
  const { currentTabName, isAuthenticated, appId, user } = state.app;
  return {
    currentTab: currentTabName,
    isAuthenticated: isAuthenticated,
    appId: appId,
    user: user
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
