import initalState from "./initialState";
import * as types from "../constants/actionTypes";
import set from 'lodash/fp/set';


export default function explore(state = initalState.explore, action) {
  switch (action.type) {
    case types.RESET_STATE:
      return initalState.explore;
    case types.FETCH_SUBJECTS_REQUESTED:
      return {...state, isFetching: true, limit: action.data.limit, offset: action.data.offset};
    case types.FETCH_SUBJECTS_DONE:
      return {
        ...state,
        subjects: action.data.isReload ? action.data.subjects : state.subjects.concat(action.data.subjects),
        hasMore: action.data.hasMore,
        isFetching: false
      };
    case types.FETCH_SUBJECTS_FAILED:
      return {...state, hasMore: false, isFetching: false};
    case types.FETCH_FILES_REQUESTED:
      return {...state, isFetching: true, limit: action.data.limit, offset: action.data.offset};
    case types.FETCH_FILES_DONE:
      return {
        ...state,
        files: action.data.isReload ? action.data.files : state.files.concat(action.data.files),
        hasMore: action.data.hasMore,
        isFetching: false
      };
    case types.FETCH_FILES_FAILED:
      return {...state, hasMore: false, isFetching: false};
    case types.FETCH_SUBJECT_DETAILS_DONE:
      return {...state, subjectDetails: action.data};
    case types.FETCH_PUBLIC_FILE_LIST_DONE:
      return set(`subjectDetails.files`, action.data, state);
    case types.FETCH_SUBJECT_COMMENTS_DONE:
      return set('subjectDetails.comments', action.data, state);
    case types.MARK_SUBJECT_DONE:
      return {...state, subjectDetails: {...action.data, files: state.subjectDetails.files}};
    case types.CURRENT_SEARCHING_CHANGE:
      return {...state, currentSearching: action.data, offset: 0, hasMore: true, subjects: [], files: []};
    default:
      return state;
  }
}
