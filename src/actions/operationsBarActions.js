import * as types from "../constants/actionTypes";
import {begin, end, pendingTask} from "react-redux-spinner";

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
    dispatch(getDataRequested());
    debugger;
    fetch(`http://localhost:8080/files/${subjectId}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getDataDone(data));
      })
      .catch(error => {
        dispatch(getDataFailed(error));
      })
  }
}
