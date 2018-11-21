import TABS from '../components/App';

export default {
  currentTabName: TABS.FILE_LIST,
  files:[],
  editingFileId: null,
  filesLoading: true,
  academies: [],
  academiesLoading: true,
  selectedAcademy: {},
  selectedSemester: {},
  selectedSubject: {}
};
