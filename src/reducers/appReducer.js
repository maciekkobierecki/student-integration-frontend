import * as types from './../constants/actionTypes'
import initalState from './initialState';
//TODO: use Immutable
export default function app(state = initalState, action) {
  switch (action.type) {
    case types.LOADING_ON:
      return {...state, loadingCount: state.loadingCount + 1};
    case types.LOADING_OFF:
      return {...state, loadingCount: state.loadingCount - 1};
    case types.TAB_CHANGED:
      return {...state, currentTabName: action.currentTabName};
    case types.FACEBOOK_LOGGED_IN:
      return {...state, user: action.user};
    case types.BACKEND_LOGIN_FAILED:
      return {...state, isAuthenticated: false, user: null};
    case types.BACKEND_LOGIN_DONE:
      return {...state, isAuthenticated: true};
    default:
      return state;
  }
}
