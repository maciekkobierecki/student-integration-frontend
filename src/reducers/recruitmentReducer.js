import initalState from "./initialState";
import * as types from "../constants/actionTypes";

export default function groupRecruitment(state = initalState.groupEnter, action) {
  switch (action.type) {
    case types.ENTER_TO_GROUP_REQUESTED:
      return {...state, groupEnter: {...state.groupEnter, loading: true}};
    case types.ENTER_TO_GROUP_DONE:
      return {...state, groupEnter: {...state.groupEnter, loading: false, groupName: action.data.groupName}};
    case types.ENTER_TO_GROUP_FAILED:
      return {...state, groupEnter: {failure: true}};
    default:
      return state;
  }
}
