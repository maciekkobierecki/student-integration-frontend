import initalState from "./initialState";
import * as types from "../constants/actionTypes";
import set from 'lodash/fp/set';

export default function groupCreation(state = initalState.groupCreation, action) {
  switch (action.type) {
    case types.CLEAR_GROUP_CREATION_DATA:
      return {...state, creatingGroup: {}, allAcademies: [], subjects: []};
    case types.FETCH_ACADEMIES_DONE:
      return {...state, allAcademies: action.data };
    case types.FETCH_DEGREES_DONE:
      return {...state, degrees: action.data};
    case types.CREATE_GROUP_ACADEMY_SELECTED:
      return set('creatingGroup.academyId', action.data, state);
    case types.CREATE_GROUP_DEGREE_SELECTED:
      return set('creatingGroup.degreeId', action.data, state);
    case types.CREATE_GROUP_DATA_CHANGED:
      return set(`creatingGroup.${action.propertyName}`, action.propertyValue, state);
    default:
      return state;
  }
}
