import * as types from './../constants/actionTypes'
import initalState from './initialState';
//TODO: use Immutable
export default function app(state = initalState, action){
  switch(action.type){
    case types.TAB_CHANGED:
      return {...state, currentTabName: action.currentTabName};
    default:
      return state;
  }
}
