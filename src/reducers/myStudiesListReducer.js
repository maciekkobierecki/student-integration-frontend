import * as types from './../constants/actionTypes'
import initalState from './initialState';

//TODO: use Immutable
export default function myStudiesListReducer(state = initalState, action){
  switch(action.type){
    case types.FETCH_MY_STUDIES_LIST_REQUESTED:
      return {...state, isLoading: true };
    case types.FETCH_MY_STUDIES_LIST_DONE:
      return {...state, academies: action.data };
    case types.FETCH_MY_STUDIES_LIST_FAILED:
      return {...state, isLoading: false, isError: true };
    case types.ACADEMY_ITEM_SELECTED:
      return {...state, selectedAcademy: action.selectedItem, selectedSemester: {}, selectedSubject: {}};
    case types.SEMESTER_ITEM_SELECTED:
      return {...state, selectedSemester: action.selectedItem, selectedSubject: {}};
    case types.SUBJECT_ITEM_SELECTED:
      return {...state, selectedSubject: action.selectedItem};
    default:
      return state;
  }
}
