import * as types from '../constants/actionTypes';
import {begin, end, pendingTask} from "react-redux-spinner";
import {loadingTurnOff, loadingTurnOn} from "./appActions";
import axios from "../axios";

export function fetchSubjectsRequested(offset, limit){
  return {
    type: types.FETCH_SUBJECTS_REQUESTED,
    data: {
      offset: offset + limit,
      limit: limit
    },
    [ pendingTask ]: begin
  }
}

export function fetchSubjectsDone(data){
  return {
    type: types.FETCH_SUBJECTS_DONE,
    [ pendingTask ]: end,
    data: {
      subjects: data,
      hasMore: !!data.length
    }
  }
}

export function fetchSubjectsFailed(error){
  return {
    type: types.FETCH_SUBJECTS_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function fetchSubjects(){
  return (dispatch, getState) => {
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



export function fetchSubjectDetails(){

}
