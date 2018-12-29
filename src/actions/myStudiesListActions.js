import * as types from '../constants/actionTypes';
import * as fileListActions from './fileListActions';
import axios from "../axios";
import {loadingTurnOff, loadingTurnOn} from "./appActions";

export function fetchMyGroupsRequested() {
  return {
    type: types.FETCH_MY_GROUPS_LIST_REQUESTED
  }
}

export function fetchMyGroupsDone(data) {
  return {
    type: types.FETCH_MY_GROUPS_LIST_DONE,
    data: data
  }
}

export function fetchMyGroupsFailed(error) {
  return {
    type: types.FETCH_MY_GROUPS_LIST_FAILED,
    error: error
  }
}

export function fetchMyGroupsList() {
  return dispatch => {

    dispatch(fetchMyGroupsRequested());
    dispatch(loadingTurnOn());
    axios().get(
      `/api/groups`
    )
      .then(response => response.data)
      .then(data => {
        dispatch(fetchMyGroupsDone(data));
        dispatch(groupItemSelected(data[0]));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(fetchMyGroupsFailed(error));
        dispatch(loadingTurnOff());
      })

  }
}

export function groupItemSelectedAction(selectedItem) {
  return {
    type: types.GROUP_ITEM_SELECTED,
    selectedItem: selectedItem
  };
}

export function groupItemSelected(selectedItem) {
  return dispatch => {
    dispatch(groupItemSelectedAction(selectedItem));
    dispatch(subjectItemSelected(selectedItem.subjects[0]))
  }
}

export function subjectItemSelectedAction(selectedItem) {
  return {
    type: types.SUBJECT_ITEM_SELECTED,
    selectedItem: selectedItem
  };
}

export function subjectItemSelected(selectedItem) {
  return dispatch => {
    dispatch(subjectItemSelectedAction(selectedItem));
    dispatch(fileListActions.fetchFileList(selectedItem.id));
  }
}
