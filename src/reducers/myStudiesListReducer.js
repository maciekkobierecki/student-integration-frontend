import * as types from './../constants/actionTypes'
import initalState from './initialState';

//TODO: use Immutable
export default function myStudiesList(state = initalState, action){
  switch(action.type){
    case types.FETCH_MY_GROUPS_LIST_REQUESTED:
      return {...state, academiesLoading: true };
    case types.FETCH_MY_GROUPS_LIST_DONE:
      return {...state, myGroups: action.data };
    case types.FETCH_MY_GROUPS_LIST_FAILED:
      return {...state, academiesLoading: false, isError: true, myGroups: []};
    case types.GROUP_ITEM_SELECTED:
      return {...state, selectedGroup: action.selectedItem, selectedSemester: {}, selectedSubject: {}};
    case types.SUBJECT_ITEM_SELECTED:
      return {...state, selectedSubject: action.selectedItem};
    default:
      return state;
  }
}
