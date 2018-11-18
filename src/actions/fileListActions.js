import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';
import {
  pendingTask,
  begin,
  end,
  endAll
} from 'react-redux-spinner';

export function clearFileList(){
  return {
    type: types.CLEAR_FILE_LIST
  }
}

export function getDataRequested(){
  return {
    type: types.FETCH_FILE_LIST_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function getDataDone(data){
  return {
    type: types.FETCH_FILE_LIST_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function getDataFailed(error){
  return {
    type: types.FETCH_FILE_LIST_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function fetchFileList(subjectId){
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
