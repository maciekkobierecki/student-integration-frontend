import * as types from './../constants/actionTypes'
import initalState from './initialState';

//TODO: use Immutable
export default function fileListReducer(state = initalState, action){
  switch(action.type){
    case types.CLEAR_FILE_LIST:
      return {...state, files: []};
    case types.FETCH_FILE_LIST_REQUESTED:
      return {...state, filesLoading: true };
    case types.FETCH_FILE_LIST_DONE:
      return {...state, filesLoading: false, files: action.data };
    case types.FETCH_FILE_LIST_FAILED:
      return {...state, filesLoading: false, isError: true };
    default:
      return state;
  }
}
