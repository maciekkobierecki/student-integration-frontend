import * as types from "../constants/actionTypes";
import {begin, end, pendingTask} from "react-redux-spinner";
import axios from "../axios";

export function fetchMyGroupsRequested(){
  return {
    type: types.FETCH_MY_GROUPS_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function fetchMyGroupsDone(data){
  return {
    type: types.FETCH_MY_GROUPS_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function fetchMyGroupsFailed(error){
  return {
    type: types.FETCH_MY_GROUPS_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function fetchMyGroups(){
  return (dispatch) => {
    dispatch(fetchMyGroupsRequested());
    axios().get(
      `/api/groups`
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchMyGroupsDone(data));
      })
      .catch(error => {
        dispatch(fetchMyGroupsFailed(error));
      })
  }
}
