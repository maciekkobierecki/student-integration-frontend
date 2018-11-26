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


export function fetchFileList(){
  return (dispatch, getState) => {
    debugger;
    dispatch(getDataRequested());
    var state = getState();
    var subjectId = state.myStudiesList.selectedSubject.id;
    var criteria = state.fileList.criteria;
    fetch(`http://localhost:8080/files`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(
          {
            subjectId:subjectId,
            criteria:criteria
          })
      })
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

//document create
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
    type: types.CREATE_DOCUMENT_DONE,
    [ pendingTask ]: end,
    error: error
  }
}

export function createDocument(){
  return (dispatch, getState) => {
    dispatch(createDocumentRequested());
    var state = getState();
    var subjectId = state.myStudiesList.selectedSubject.id;
    fetch(`http://localhost:8080/files/${subjectId}`)
      .then(fetchFileList())
      .catch(error => {
        dispatch(createDocumentFailed(error));
      })
  }
}

//file upload
export function uploadFile(){

}

//fileSearch
export function searchFileAction(criteria){
  return {
    type: types.SEARCH_FILE,
    criteria: criteria
  }
}
export function searchFile(criteria){
  return dispatch => {
    dispatch(searchFileAction(criteria));
    dispatch(fetchFileList());
  }
}
