import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';
import * as fileListActions from './fileListActions';

export function getDataRequested(){
  return {
    type: types.FETCH_MY_STUDIES_LIST_REQUESTED
  }
}

export function getDataDone(data){
  return {
    type: types.FETCH_MY_STUDIES_LIST_DONE,
    data: data
  }
}

export function getDataFailed(error){
  return {
    type: types.FETCH_MY_STUDIES_LIST_FAILED,
    error: error
  }
}

export function fetchMyStudiesList(){
  return dispatch => {

    dispatch(getDataRequested());
    fetch('http://localhost:8080/my-studies')
      .then(response => response.json())
      .then(data => {
        dispatch(getDataDone(data));
      })
      .catch(error => {
        dispatch(getDataFailed(error));
      })
  }
}

export function academyItemSelected(selectedItem){
  return dispatch => {
    dispatch({
      type: types.ACADEMY_ITEM_SELECTED,
      selectedItem: selectedItem
    })
  }
}

export function semesterItemSelected(selectedItem){
  return dispatch => {
    dispatch({
      type: types.SEMESTER_ITEM_SELECTED,
      selectedItem: selectedItem
    })
  }
}

export function subjectItemSelectedAction(selectedItem){
  return {
    type: types.SUBJECT_ITEM_SELECTED,
    selectedItem: selectedItem
  }
}

export function subjectItemSelected(selectedItem){
  return dispatch => {
    debugger;
    dispatch(subjectItemSelectedAction(selectedItem));
    dispatch(fileListActions.fetchFileList(selectedItem.id));
  }
}
