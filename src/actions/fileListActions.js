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
  debugger;
  return {
    type: types.FETCH_FILE_LIST_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function getDataFailed(error){
  debugger;
  return {
    type: types.FETCH_FILE_LIST_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function fetchFileList(subjectId){
  return dispatch => {
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

function fileEditAction(fileId){
  return {
    type: types.FILE_EDIT,
    fileId: fileId
  }
}

export function fileEdit(fileId){
  return dispatch => {
    dispatch(fileEditAction(fileId));
  }
}

function fileEditDoneAction(fileId){
  return {
    type: types.FILE_EDIT_DONE,
    fileId: fileId
  }
}

export function fileEditDone(fileId){
  return dispatch => {
    dispatch(fileEditDoneAction(fileId));
  }
}
