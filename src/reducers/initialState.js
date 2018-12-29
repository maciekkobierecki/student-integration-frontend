import { TABS } from '../components/App';

export default {
  currentTabName: TABS.FILE_LIST,
  files:[],
  editingFile: null,
  filesLoading: true,
  myGroups: [],
  academiesLoading: true,
  selectedGroup: {},
  selectedSubject: {},
  searchCriteria: "wyszukaj",
  creatingGroup: {},
  allAcademies: [],
  subjects: [],
  isAuthenticated: !!localStorage.getItem('jwt'),
  user: localStorage.getItem('username'),
  appId: 2108929732752092,
  groups: [],
  loadingCount: 0
};
