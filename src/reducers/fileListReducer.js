import * as types from './../constants/actionTypes'
import initalState from './initialState';

//TODO: use Immutable
export default function fileList(state = initalState, action){
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
      return {...state, criteria: action.criteria };
    default:
      return state;
  }
}
