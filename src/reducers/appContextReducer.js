import * as types from './../constants/actionTypes';
import initalState from './initialState';
import set from 'lodash/fp/set';

//TODO: use Immutable
export default function appContext(state = initalState.appContext, action) {
  switch (action.type) {
    case types.LOADING_ON:
      return {...state, loadingCount: state.loadingCount+1};
    case types.LOADING_OFF:
      return {...state, loadingCount: state.loadingCount-1};
    case types.TAB_CHANGED:
      return {...state, currentTabName: action.currentTabName};
    case types.FACEBOOK_LOGGED_IN:
      return {...state, user: action.user};
    case types.BACKEND_LOGIN_FAILED:
      return {...state, isAuthenticated: false, user: null};
    case types.BACKEND_LOGIN_DONE:
      return {...state, isAuthenticated: true};
    case types.ERROR:
      return set(`status.error.message`, action.message, state);
    default:
      return state;
  }
}
