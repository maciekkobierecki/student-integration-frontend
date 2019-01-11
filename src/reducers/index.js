import {combineReducers} from 'redux';
import myStudies from './MyStudiesReducer';
import appContext from './appContextReducer';
import groupCreation from './createGroupFormReducer';
import {pendingTasksReducer} from 'react-redux-spinner';
import groupRecruitment from "./recruitmentReducer";
import explore from './exploreReducer';

const rootReducer = combineReducers({
  appContext,
  myStudies,
  groupCreation,
  explore,
  groupRecruitment,
  pendingTasks: pendingTasksReducer
});

export default rootReducer;
