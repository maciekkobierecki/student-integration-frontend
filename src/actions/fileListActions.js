import * as types from '../constants/actionTypes';
import {
  pendingTask,
  begin,
  end
} from 'react-redux-spinner';
import axios from "../axios";
import {loadingTurnOff, loadingTurnOn} from "./appActions";

export function clearFileList() {
  return {
    type: types.CLEAR_FILE_LIST
  }
}

export function getDataRequested() {
  return {
    type: types.FETCH_FILE_LIST_REQUESTED,
    [pendingTask]: begin
  }
}

export function getDataDone(data) {
  return {
    type: types.FETCH_FILE_LIST_DONE,
    [pendingTask]: end,
    data: data
  }
}

export function getDataFailed(error) {
  return {
    type: types.FETCH_FILE_LIST_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function fetchFileList() {
  return (dispatch, getState) => {
    dispatch(getDataRequested());
    dispatch(loadingTurnOn());
    let state = getState();
    let criteria = state.myStudies.searchCriteria;
    let subjectId = state.myStudies.selectedSubject.id;

    axios().post(
      `/api/files`,
      JSON.stringify(
        {
          subjectId: subjectId,
          criteria: criteria
        })
    )
      .then(response => response.data)
      .then(data => {
        dispatch(getDataDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(getDataFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

function fileEditAction(file) {
  return {
    type: types.FILE_EDIT,
    file: file
  }
}

export function fileEdit(file) {
  return dispatch => {
    dispatch(fileEditAction(file));
  }
}

//fileEditDone - file edit API call
export function fileEditApprovedRequested() {
  return {
    type: types.FILE_EDIT_APPROVED_REQUESTED,
    [pendingTask]: begin
  }
}

export function fileEditApprovedDone() {
  return {
    type: types.FILE_EDIT_APPROVED_DONE,
    [pendingTask]: end
  }
}

export function fileEditApprovedFailed(error) {
  return {
    type: types.FILE_EDIT_APPROVED_FAILED,
    [pendingTask]: end,
    error: error
  }
}

export function fileEditApproved() {
  return (dispatch, getState) => {
    dispatch(fileEditApprovedRequested());
    var state = getState();
    var fileEdited = state.myStudies.editingFile;
    axios().post(
      `/api/files/edit`,
      JSON.stringify(
        {
          fileEdited
        })
    )
      .then(dispatch(fileEditApprovedDone()))
      .then(dispatch(fetchFileList()))
      .catch(error => {
        dispatch(fileEditApprovedFailed(error));
      })
  }
}

//document create
export function createDocumentRequested() {
  return {
    type: types.CREATE_DOCUMENT_REQUESTED,
    [pendingTask]: begin
  }
}

export function createDocumentDone() {
  return {
    type: types.CREATE_DOCUMENT_DONE,
    [pendingTask]: end
  }
}

export function createDocumentFailed(error) {
  return {
    type: types.CREATE_DOCUMENT_DONE,
    [pendingTask]: end,
    error: error
  }
}

export function createDocument() {
  return (dispatch, getState) => {
    dispatch(createDocumentRequested());
    dispatch(loadingTurnOn());
    let state = getState();
    let subjectId = state.myStudies.selectedSubject.id;
    axios().post(
      `/api/files/${subjectId}/new`,
      JSON.stringify(
        {
          subjectId: subjectId
        })
    )
      .then(response => response.data)
      .then(()=> {
        dispatch(createDocumentDone());
        dispatch(loadingTurnOff());
        dispatch(fetchFileList());
      })
      .catch(error => {
        dispatch(createDocumentFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

//file upload
export function uploadFile() {

}

//fileSearch
export function searchFileAction(criteria) {
  return {
    type: types.SEARCH_FILE,
    criteria: criteria
  }
}

export function searchFile(criteria) {
  return dispatch => {
    dispatch(searchFileAction(criteria));
    dispatch(fetchFileList());
  }
}



export function markFileRequested() {
  return {
    type: types.MARK_FILE_REQUESTED,
    [pendingTask]: begin
  }
}

export function markFileDone() {
  return {
    type: types.MARK_FILE_DONE,
    [pendingTask]: end
  }
}

export function markFileFailed(error) {
  return {
    type: types.MARK_FILE_FAILED,
    [pendingTask]: end,
    error: error
  }
}

export function markFile(fileId, isPositive, reloadFileListMethod) {
  return (dispatch) => {
    dispatch(markFileRequested());
    dispatch(loadingTurnOn());
    axios().post(
      `/api/files/mark`,
      {
        fileId: fileId,
        isPositive: isPositive
      }
    )
      .then(response => response.data)
      .then(()=> {
        dispatch(markFileDone());
        dispatch(loadingTurnOff());
        debugger;
        reloadFileListMethod();
      })
      .catch(error => {
        dispatch(markFileFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}


