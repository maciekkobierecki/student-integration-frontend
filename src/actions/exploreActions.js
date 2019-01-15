import * as types from '../constants/actionTypes';
import {begin, end, pendingTask} from "react-redux-spinner";
import {loadingTurnOff, loadingTurnOn, showError} from "./appActions";
import axios from "../axios";

export function fetchSubjectsRequested(offset, limit) {
  return {
    type: types.FETCH_SUBJECTS_REQUESTED,
    data: {
      offset: offset + limit,
      limit: limit
    },
    [pendingTask]: begin
  }
}

export function fetchSubjectsDone(data) {
  return {
    type: types.FETCH_SUBJECTS_DONE,
    [pendingTask]: end,
    data: {
      subjects: data,
      hasMore: !!data.length
    }
  }
}

export function fetchSubjectsFailed(error) {
  return {
    type: types.FETCH_SUBJECTS_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function fetchSubjects() {
  return (dispatch, getState) => {
    debugger;
    let state = getState().explore;
    dispatch(fetchSubjectsRequested(state.offset, state.limit));
    dispatch(loadingTurnOn());
    axios().post(
      `/api/subjects`,
      {
        offset: state.offset,
        limit: state.limit
      }
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchSubjectsDone(data));
        dispatch(loadingTurnOff());

      })
      .catch(error => {
        dispatch(fetchSubjectsFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function fetchFilesRequested(offset, limit) {
  return {
    type: types.FETCH_FILES_REQUESTED,
    data: {
      offset: offset + limit,
      limit: limit
    },
    [pendingTask]: begin
  }
}

export function fetchFilesDone(data) {
  return {
    type: types.FETCH_FILES_DONE,
    [pendingTask]: end,
    data: {
      files: data,
      hasMore: !!data.length
    }
  }
}

export function fetchFilesFailed(error) {
  return {
    type: types.FETCH_FILES_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function fetchFiles() {
  return (dispatch, getState) => {
    let state = getState().explore;
    dispatch(fetchFilesRequested(state.offset, state.limit));
    dispatch(loadingTurnOn());
    axios().post(
      `/api/files`,
      {
        pagination:{
          offset: state.offset,
          limit: state.limit
        }
      }
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchFilesDone(data));
        dispatch(loadingTurnOff());

      })
      .catch(error => {
        dispatch(fetchFilesFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}


export function fetchSubjectDetailsRequested() {
  return {
    type: types.FETCH_SUBJECT_DETAILS_REQUESTED,
    [pendingTask]: begin
  }
}

export function fetchSubjectDetailsDone(subjectDetails) {
  return {
    type: types.FETCH_SUBJECT_DETAILS_DONE,
    [pendingTask]: end,
    data: subjectDetails
  }
}

export function fetchSubjectDetailsFailed(error) {
  return {
    type: types.FETCH_SUBJECT_DETAILS_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function fetchSubjectDetails(subjectId) {
  return (dispatch) => {
    dispatch(fetchSubjectDetailsRequested());
    dispatch(loadingTurnOn());
    axios().get(
      `/api/subjects/${subjectId}/details`
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchSubjectDetailsDone(data));
        dispatch(fetchPublicFileList(subjectId));
        dispatch(loadingTurnOff());

      })
      .catch(error => {
        dispatch(showError("Wystąpił błąd podczas pobierania danych szczegółowych o przedmiocie"));
        dispatch(fetchSubjectDetailsFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function fetchSubjectCommentsRequested() {
  return {
    type: types.FETCH_SUBJECT_COMMENTS_REQUESTED,
    [pendingTask]: begin
  }
}

export function fetchSubjectCommentsDone(comments) {
  return {
    type: types.FETCH_SUBJECT_COMMENTS_DONE,
    data: comments,
    [pendingTask]: end
  }
}

export function fetchSubjectCommentsFailed(error) {
  return {
    type: types.FETCH_SUBJECT_COMMENTS_FAILED,
    [pendingTask]: end,
    error: error
  }
}

export function fetchSubjectComments(subjectId) {
  return (dispatch) => {
    dispatch(fetchSubjectCommentsRequested());
    dispatch(loadingTurnOn());
    axios().get(
      `/api/subjects/${subjectId}/comments`
    )
      .then(response => response.data)
      .then((data)=> {
        dispatch(fetchSubjectCommentsDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(fetchSubjectCommentsFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function fetchPublicFileListRequested() {
  return {
    type: types.FETCH_PUBLIC_FILE_LIST_REQUESTED,
    [pendingTask]: begin
  }
}

export function fetchPublicFileListDone(data) {
  return {
    type: types.FETCH_PUBLIC_FILE_LIST_DONE,
    [pendingTask]: end,
    data: data
  }
}

export function fetchPublicFileListFailed(error) {
  return {
    type: types.FETCH_PUBLIC_FILE_LIST_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function fetchPublicFileList(subjectId) {
  return (dispatch, getState) => {
    debugger;
    dispatch(fetchPublicFileListRequested());
    dispatch(loadingTurnOn());
    var state = getState();
    var criteria = state.myStudies.searchCriteria;
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
        dispatch(fetchPublicFileListDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(fetchPublicFileListFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}


export function markSubjectRequested() {
  return {
    type: types.MARK_SUBJECT_REQUESTED,
    [pendingTask]: begin
  }
}

export function markSubjectDone(subjectDetails) {
  return {
    type: types.MARK_SUBJECT_DONE,
    data: subjectDetails,
    [pendingTask]: end
  }
}

export function markSubjectFailed(error) {
  return {
    type: types.MARK_SUBJECT_FAILED,
    [pendingTask]: end,
    error: error
  }
}

export function markSubject(subjectDetails, isPositive) {
  return (dispatch) => {
    dispatch(markSubjectRequested());
    dispatch(loadingTurnOn());
    axios().post(
      `/api/subjects/mark`,
      {
        subjectDetails: subjectDetails,
        isPositive: isPositive
      }
    )
      .then(response => response.data)
      .then((subjectDetails)=> {
        dispatch(markSubjectDone(subjectDetails));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(markSubjectFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function currentSearchingChange(newCurrentSearching){
  return dispatch => {
    if(newCurrentSearching === "Przedmioty"){
      //dispatch(fetchSubjects());
    }else if(newCurrentSearching ==="Pliki"){
      //dispatch(fetchFiles());
    }
    dispatch({
      type: types.CURRENT_SEARCHING_CHANGE,
      data: newCurrentSearching
    })
  }
}


