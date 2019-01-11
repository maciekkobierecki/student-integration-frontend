import { TABS } from '../components/App';

export default {
  appContext:{
    currentTabName: TABS.FILE_LIST,
    isAuthenticated: !!localStorage.getItem('jwt'),
    user: localStorage.getItem('username'),
    loadingCount: 0,
    appId: 2108929732752092,
    status: {}
  },
  myStudies: {
    myGroups: [],
    selectedGroup: {},
    selectedSubject: {},
    files: [],
    editingFile: null,
    searchCriteria: null
  },
  groupCreation: {
    allAcademies: [],
    degrees: [],
    creatingGroup: {}
  },
  explore: {
    subjects:[],
    subjectDetails: null,
    fileDetails: null,
    isFetching: false,
    limit: 10,
    offset: 0,
    hasMore: true
  },
  groupEnter: {
    success: false
  },
};
