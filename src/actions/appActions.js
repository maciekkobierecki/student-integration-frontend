import * as types from '../constants/actionTypes';
import {begin, end, pendingTask} from "react-redux-spinner";


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


export function authRequested(){
  return {
    type: types.AUTH_REUQESTED,
    [ pendingTask ]: begin
  }
}

export function authDone(data){
  return {
    type: types.AUTH_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function authFailed(error){
  return {
    type: types.AUTH_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function authenticate(data){
  return dispatch => {
    dispatch(authRequested());
    debugger;
    fetch(`http://localhost:8080/user/`)
      .then(response => response.json())
      .then(data => {
        dispatch(getDataDone(data));
      })
      .catch(error => {
        dispatch(getDataFailed(error));
      })
  }
}

