import * as types from '../constants/actionTypes';
import * as fileListActions from './fileListActions';
import axios from "../axios";

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
  debugger;
  return {
    type: types.FETCH_MY_STUDIES_LIST_FAILED,
    error: error
  }
}

export function fetchMyStudiesList(){
  return dispatch => {

    dispatch(getDataRequested());
    axios().get(
      `/my-studies`
    )
      .then(response => response.data)
      .then(data => {
        dispatch(getDataDone(data));
        dispatch(academyItemSelected(data[0])); })
      .catch(error => {
        debugger;
        dispatch(getDataFailed(error));
      })

  }
}

export function academyItemSelectedAction(selectedItem){
  return {
    type: types.ACADEMY_ITEM_SELECTED,
    selectedItem: selectedItem
  };
}

export function academyItemSelected(selectedItem){
  return dispatch => {
    dispatch(academyItemSelectedAction(selectedItem));
    dispatch(semesterItemSelected(selectedItem.semesters[0]))
  }
}

export function semesterItemSelectedAction(selectedItem){
 return {
   type: types.SEMESTER_ITEM_SELECTED,
   selectedItem: selectedItem
 };
}

export function semesterItemSelected(selectedItem){
  return dispatch => {
    dispatch(semesterItemSelectedAction(selectedItem));
    dispatch(subjectItemSelected(selectedItem.subjects[0]));
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
    dispatch(subjectItemSelectedAction(selectedItem));
    dispatch(fileListActions.fetchFileList(selectedItem.id));
  }
}
