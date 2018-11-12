import { combineReducers } from 'redux';
import fileListReducer from './fileListReducer';
import myStudiesListReducer from './myStudiesListReducer';

const rootReducer = combineReducers({
  fileListReducer,
  myStudiesListReducer
});

export default rootReducer;
