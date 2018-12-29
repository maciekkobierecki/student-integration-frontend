import initalState from "./initialState";
import * as types from "../constants/actionTypes";

export default function createGroupForm(state = initalState, action) {
  debugger;
  switch (action.type) {
    case types.FETCH_ACADEMIES_DONE:
      return {...state, allAcademies: action.data };
    case types.FETCH_DEGREES_DONE:
      return {...state, degrees: action.data};
    case types.CREATE_GROUP_ACADEMY_SELECTED:
      return {...state, creatingGroup: { ...state.creatingGroup, academyId: action.data }};
    case types.CREATE_GROUP_DEGREE_SELECTED:
      return {...state, creatingGroup: { ...state.creatingGroup, degreeId: action.data }};
    case types.CREATE_GROUP_DATA_CHANGED:
      return {...state, creatingGroup: { ...state.creatingGroup, [action.propertyName]: action.propertyValue}};
    default:
      return state;
  }
}
