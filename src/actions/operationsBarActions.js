import * as types from "../constants/actionTypes";
import {begin, end, pendingTask} from "react-redux-spinner";
import axios from "../axios";
import {backendLoginRequested, backendLoginDone, backendLoginFailed, loadingTurnOn, loadingTurnOff} from './appActions';

export function createDocumentRequested(){
  return {
    type: types.CREATE_DOCUMENT_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function createDocumentDone(data){
  return {
    type: types.CREATE_DOCUMENT_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function createDocumentFailed(error){
  return {
    type: types.CREATE_DOCUMENT_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function createDocument(){
  return dispatch => {
    dispatch(backendLoginRequested());
    dispatch(loadingTurnOn());
    axios().get(
      '/api/files/${subjectId}'
    )
      .then(response => response.data)
      .then(data => {
        dispatch(backendLoginDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(backendLoginFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}
