import { combineReducers } from 'redux';
import fileList from './fileListReducer';
import myStudiesList from './myStudiesListReducer';
import app from './appReducer';
import createGroupForm from './createGroupFormReducer';
import myGroupsList from './myGroupsListReducer';
import { pendingTasksReducer } from 'react-redux-spinner';

const rootReducer = combineReducers({
  fileList: fileList,
  myStudiesList: myStudiesList,
  pendingTasks: pendingTasksReducer,
  createGroupForm: createGroupForm,
  myGroupsList: myGroupsList,
  app: app
});

export default rootReducer;
