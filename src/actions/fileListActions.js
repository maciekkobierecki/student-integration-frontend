import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';

export function clearFileList(){
  return {
    type: types.CLEAR_FILE_LIST
  }
}

export function getDataRequested(){
  return {
    type: types.FETCH_FILE_LIST_REQUESTED
  }
}

export function getDataDone(data){
  return {
    type: types.FETCH_FILE_LIST_DONE,
    data: data
  }
}

export function getDataFailed(error){
  return {
    type: types.FETCH_FILE_LIST_FAILED,
    error: error
  }
}


export function fetchFileList(subjectId){
  return dispatch => {
    debugger;
    dispatch(getDataRequested());

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
