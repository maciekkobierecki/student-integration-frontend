import * as types from "../constants/actionTypes";
import {begin, end, pendingTask} from "react-redux-spinner";
import {loadingTurnOff, loadingTurnOn} from "./appActions";
import axios from "../axios";

export function addToGroupRequested() {
  return {
    type: types.ENTER_TO_GROUP_REQUESTED,
    [pendingTask]: begin
  }
}

export function addToGroupDone(data) {
  return {
    type: types.ENTER_TO_GROUP_DONE,
    [pendingTask]: end,
    data: data
  }
}

export function addToGroupFailed(error) {
  return {
    type: types.ENTER_TO_GROUP_FAILED,
    [pendingTask]: end,
    error: error
  }
}


export function enterToGroup(actionHash) {
  return (dispatch) => {
    dispatch(addToGroupRequested());
    dispatch(loadingTurnOn());
    axios().post(
      `/api/groups/enter/`+actionHash
    )
      .then(response => response.data)
      .then(data => {
        dispatch(addToGroupDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(addToGroupFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}

export function enterToGroupClear(){
  return (dispatch) => {
    dispatch({
      type: types.ENTER_TO_GROUP_CLEAR
    })
  }
}
