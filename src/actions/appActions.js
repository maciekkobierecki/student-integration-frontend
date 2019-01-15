import * as types from '../constants/actionTypes';
import {begin, end, pendingTask} from "react-redux-spinner";
import axios from '../axios';

export function showError(message){
  return dispatch => {
    dispatch({
        type: types.ERROR,
        message: message
      }
    );
  }
}

export function loadingTurnOn(){
  return dispatch => { dispatch(
    {
      type: types.LOADING_ON
    }
  )}
}

export function loadingTurnOff(){
  return dispatch => { dispatch(
    {
      type: types.LOADING_OFF
    }
  )}
}

export function resetState(){
  return dispatch => {
    dispatch(
      {
        type: types.RESET_STATE
      }
    )
  }
}

export function tabSelectedAction(selectedTabName){
  return {
    type: types.TAB_CHANGED,
    currentTabName: selectedTabName
  }
}

export function tabSelected(selectedTabName){
  return dispatch => {
    dispatch(tabSelectedAction(selectedTabName));
  }
}


export function facebookLoggedInAction(data){
  return {
    type: types.FACEBOOK_LOGGED_IN,
    user: data.name
  }
}
export function facebookLoggedIn(data){
  return dispatch => {
    localStorage.setItem('username', data.name);
    dispatch(facebookLoggedInAction(data));
    dispatch(backendLogin(data.accessToken));
  };
}

export function backendLoginRequested(){
  return {
    type: types.BACKEND_LOGIN_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function backendLoginDone(){
  return {
    type: types.BACKEND_LOGIN_DONE,
    [ pendingTask ]: end
  }
}

export function backendLoginFailed(error){
  return {
    type: types.BACKEND_LOGIN_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function backendLogin(fbAccessToken){
  return (dispatch) => {
    dispatch(backendLoginRequested());
    axios().post(
      `/api/auth/singin`,
      JSON.stringify(
        {
          facebookAccessToken:fbAccessToken,
        })
    )
      .then(response => {
        localStorage.setItem('jwt', response.data.jwt);
        dispatch(backendLoginDone());
      })
      .catch(error => {
        dispatch(backendLoginFailed(error));
      })
  }
}

