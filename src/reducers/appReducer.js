import * as types from './../constants/actionTypes'
import initalState from './initialState';
//TODO: use Immutable
export default function appReducer(state = initalState, action){
  switch(action.type){
    case types.TAB_CHANGED:
      return {...state, currentTab: action.currentTab};
    default:
      return state;
  }
}
