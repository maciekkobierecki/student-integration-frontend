import initalState from "./initialState";
import * as types from "../constants/actionTypes";

export default function explore(state = initalState.explore, action) {
  switch (action.type) {
    case types.FETCH_SUBJECTS_REQUESTED:
      return {...state, isFetching: true, limit: action.data.limit, offset: action.data.offset};
    case types.FETCH_SUBJECTS_DONE:
      return {...state, subjects: action.data.subjects.concat(state.subjects), hasMore: action.data.hasMore, isFetching: false};
    case types.FETCH_SUBJECTS_FAILED:
        return {...state, hasMore: false, isFetching: false};
    default:
      return state;
  }
}
