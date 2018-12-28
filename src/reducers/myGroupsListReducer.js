import initalState from "./initialState";
import * as types from "../constants/actionTypes";

export default function myGroupsList(state = initalState, action) {
  switch (action.type) {
    case types.FETCH_MY_GROUPS_DONE:
      return {...state, groups: action.data };
    default:
      return state;
  }
}
