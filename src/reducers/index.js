import { combineReducers } from 'redux';
import fileList from './fileListReducer';
import myStudiesList from './myStudiesListReducer';
import app from './appReducer';
import { pendingTasksReducer } from 'react-redux-spinner';

const rootReducer = combineReducers({
  fileList: fileList,
  myStudiesList: myStudiesList,
  pendingTasks: pendingTasksReducer,
  app: app
});

export default rootReducer;
