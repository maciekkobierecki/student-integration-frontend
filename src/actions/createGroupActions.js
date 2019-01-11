import * as types from '../constants/actionTypes';
import {begin, end, pendingTask} from "react-redux-spinner";
import axios from "../axios";
import {loadingTurnOn, loadingTurnOff} from "./appActions";

export function clearGroupCreationData(){
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_GROUP_CREATION_DATA
    })
  }
}


export function fetchAcademiesRequested(){
  return {
    type: types.FETCH_ACADEMIES_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function fetchAcademiesDone(data){
  return {
    type: types.FETCH_ACADEMIES_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function fetchAcademiesFailed(error){
  return {
    type: types.FETCH_ACADEMIES_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function fetchAcademies(){
  return (dispatch) => {
    dispatch(fetchAcademiesRequested());
    dispatch(loadingTurnOn());
    axios().get(
      `/api/academies`)
      .then(response => response.data)
      .then(data => {
        dispatch(fetchAcademiesDone(data))
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(fetchAcademiesFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}


export function fetchDegreesRequested(){
  return {
    type: types.FETCH_DEGREES_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function fetchDegreesDone(data){
  return {
    type: types.FETCH_DEGREES_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function fetchDegreesFailed(error){
  return {
    type: types.FETCH_DEGREES_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}

export function fetchDegrees(){
  return (dispatch, getState) => {
    dispatch(fetchDegreesRequested());
    dispatch(loadingTurnOn());
    var state = getState();
    var academyId = state.groupCreation.creatingGroup.academyId;
    axios().get(
      `/api/academies/${academyId}/degrees`)
      .then(response => response.data)
      .then(data => {
        dispatch(fetchDegreesDone(data));
        dispatch(loadingTurnOff());
      })
      .catch(error => {
        dispatch(fetchDegreesFailed(error));
        dispatch(loadingTurnOff());
      })
  }
}


export function academySelected(academyId){
  return (dispatch) => {
    dispatch({
      type: types.CREATE_GROUP_ACADEMY_SELECTED,
      data: academyId
    });
  }
}

export function degreeSelected(degreeId){
  return (dispatch) => {
    dispatch({
      type: types.CREATE_GROUP_DEGREE_SELECTED,
      data: degreeId
    });
  }
}


//Group creation api request
export function createGroupRequested(){
  return {
    type: types.CREATE_GROUP_REQUESTED,
    [ pendingTask ]: begin
  }
}

export function createGroupDone(data){
  return {
    type: types.CREATE_GROUP_DONE,
    [ pendingTask ]: end,
    data: data
  }
}

export function createGroupFailed(error){
  return {
    type: types.CREATE_GROUP_FAILED,
    [ pendingTask ]: end,
    error: error
  }
}


export function groupCreationDone(){
  return (dispatch, getState) => {
    var state = getState();
    var groupData = state.groupCreation.creatingGroup;

    dispatch(createGroupRequested());
    axios().post(
      `/api/groups/new`,
      groupData
      )
      .then(response => response.data)
      .then(data => {
        dispatch(createGroupDone(data));
      })
      .catch(error => {
        dispatch(createGroupFailed(error));
      })
  }
}

export function groupDataChanged(propertyName, propertyValue){
  return (dispatch) => {
    dispatch({
      type:  types.CREATE_GROUP_DATA_CHANGED,
      propertyName: propertyName,
      propertyValue: propertyValue
    });
  }
}




