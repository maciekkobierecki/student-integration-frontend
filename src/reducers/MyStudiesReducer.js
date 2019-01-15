import * as types from './../constants/actionTypes'
import initalState from './initialState';

//TODO: use Immutable
export default function myStudies(state = initalState.myStudies, action){
  switch(action.type){
    case types.CLEAR_FILE_LIST:
      return {...state, file: []};
    case types.FETCH_FILE_LIST_REQUESTED:
      return {...state, filesLoading: true };
    case types.FETCH_FILE_LIST_DONE:
      return {...state, filesLoading: false, files: action.data };
    case types.FETCH_FILE_LIST_FAILED:
      return {...state, files: [], filesLoading: false, isError: true };
    case types.FILE_EDIT:
      return {...state, editingFile: action.file };
    case types.FILE_EDIT_APPROVED_DONE:
      return {...state, editingFile: null };
    case types.FILE_EDIT_APPROVED_FAILED:
      return {...state, editingFile: null };
    case types.SEARCH_FILE:
      return {...state, searchCriteria: action.criteria };
    case types.FETCH_MY_GROUPS_LIST_DONE:
      return {...state, myGroups: action.data };
    case types.FETCH_MY_GROUPS_LIST_FAILED:
      return {...state, isError: true, myGroups: []};
    case types.GROUP_ITEM_SELECTED:
      return {...state, selectedGroup: action.selectedItem, selectedSemester: {}, selectedSubject: {}};
    case types.SUBJECT_ITEM_SELECTED:
      return {...state, selectedSubject: action.selectedItem};
    default:
      return state;
  }
}
