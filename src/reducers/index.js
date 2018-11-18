import { combineReducers } from 'redux';
import fileListReducer from './fileListReducer';
import myStudiesListReducer from './myStudiesListReducer';
import appReducer from './appReducer';
import { pendingTasksReducer } from 'react-redux-spinner';

const rootReducer = combineReducers({
  fileListReducer,
  myStudiesListReducer,
  pendingTasks: pendingTasksReducer,
  appReducer
});

export default rootReducer;
