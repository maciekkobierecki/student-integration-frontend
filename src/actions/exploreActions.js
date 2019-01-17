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

export function fetchSubjectsDone(subjects, isReload=false) {
  return {
    type: types.FETCH_SUBJECTS_DONE,
    [pendingTask]: end,
    data: {
      subjects: subjects,
      isReload: isReload,
      hasMore: !!subjects.length
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


export function fetchSubjects(reload = false) {
  return (dispatch, getState) => {
    let state = getState().explore;
    dispatch(fetchSubjectsRequested(state.offset, state.limit));
    dispatch(loadingTurnOn());
    let offset = reload ? 0 : state.offset;
    let limit = reload ? state.offset : state.limit;
    axios().post(
      `/api/subjects`,
      {
        offset: offset,
        limit: limit
      }
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchSubjectsDone(data, reload));
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

export function fetchFilesDone(data, isReload=false) {
  return {
    type: types.FETCH_FILES_DONE,
    [pendingTask]: end,
    data: {
      files: data,
      isReload: isReload,
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


export function fetchFiles(reload=false) {
  return (dispatch, getState) => {
    let state = getState().explore;
    dispatch(fetchFilesRequested(state.offset, state.limit));
    dispatch(loadingTurnOn());
    let offset = reload ? 0 : state.offset;
    let limit = reload ? state.offset : state.limit;
    axios().post(
      `/api/files`,
      {
        pagination:{
          offset: offset,
          limit: limit
        }
      }
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchFilesDone(data, reload));
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

export function addComment(subjectId, content, reloadMethod) {
  return (dispatch) => {
    dispatch(addCommentRequested());
    dispatch(loadingTurnOn());
    axios().post(
      `/api/subjects/comments/new`,
      {
        subjectId: subjectId,
        isAnonymous: true,
        content: content
      }
    )
      .then(response => response.data)
      .then((data)=> {
        dispatch(addCommentDone(data));
        dispatch(loadingTurnOff());
        debugger;
        if(reloadMethod){
          reloadMethod();
        }
      })
      .catch(error => {
        dispatch(addCommentFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function addCommentRequested() {
  return {
    type: types.ADD_COMMENT_REQUESTED,
    [pendingTask]: begin
  }
}

export function addCommentDone(comments) {
  return {
    type: types.ADD_COMMENT_DONE,
    data: comments,
    [pendingTask]: end
  }
}

export function addCommentFailed(error) {
  return {
    type: types.ADD_COMMENT_FAILED,
    [pendingTask]: end,
    error: error
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


