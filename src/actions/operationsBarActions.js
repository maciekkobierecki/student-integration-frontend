import * as types from "../constants/actionTypes";
import {begin, end, pendingTask} from "react-redux-spinner";
import axios from "../axios";

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


export function createDocument(subjectId){
  return dispatch => {
    dispatch(backendLoginRequested());
    axios().get(
      '/files/${subjectId}'
    )
      .then(response => response.data)
      .then(data => {
        dispatch(backendLoginDone(data));
      })
      .catch(error => {
        dispatch(backendLoginFailed(error));
      })
  }
}
