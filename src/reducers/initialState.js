import TABS from '../components/App';

export default {
  currentTabName: TABS.FILE_LIST,
  files:[],
  editingFile: null,
  filesLoading: true,
  academies: [],
  academiesLoading: true,
  selectedAcademy: {},
  selectedSemester: {},
  selectedSubject: {},
  searchCriteria: "wyszukaj",
  isAuthenticated: !!localStorage.getItem('jwt'),
  user: localStorage.getItem('username'),
  appId: 2108929732752092
};
