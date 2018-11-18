import * as types from '../constants/actionTypes';


export function tabSelectedAction(selectedTabName){
  return {
    type: types.TAB_CHANGED,
    currentTabName: selectedTabName
  }
}

export function tabSelected(selectedTabName){
  return dispatch => {
    dispatch(tabSelectedAction(selectedTabName));
  }
}
