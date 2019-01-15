import React from 'react';
import * as actions from "../../../actions/fileListActions";
import connect from "react-redux/es/connect/connect";
import './FileList.css';
import PropTypes from 'prop-types';

import File from './file/File';
import OperationsBar from './operations-bar/OperationsBar';
import {withRouter} from "react-router-dom";


class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.fileSearch = this.fileSearch.bind(this);
    this.fileEditApproved = this.fileEditApproved.bind(this);
  }

  fileSearch(e, criteria) {
    e.preventDefault();
    this.props.searchFile(criteria);
  }

  fileUpload() {

  }

  fileEditApproved(evt) {
    evt.preventDefault();
    const {fileEditApproved} = this.props;
    fileEditApproved();
  }

  render() {
    const onFileEdit = this.props.fileEdit;
    const onFileEditDone = this.fileEditApproved;
    const onCreateDocument = this.props.createDocument;
    const onFileMark = this.props.markFile;
    let {editingFile, searchCriteria, files, hasGroups} = this.props;

    if(!hasGroups){
      return (
        <div className="alert alert-info m-2">
          Dołącz do grupy aby móc dodawać i edytować materiały!
        </div>
      )
    }
    return (
      <div className="file-list">
        <OperationsBar onFileCreate={onCreateDocument} onFileUpload={this.fileUpload} onSearch={this.fileSearch}
                       criteria={searchCriteria}/>
        <ul className="nav justify-content-center nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="#">Wszystkie</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Odziedziczone</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Utworzone przez grupę</a>
          </li>
        </ul>
        {!files.length && <div className="alert alert-info ml-2 mr-2">Przedmiot nie posiada przypisanych jeszcze żadnych plików.</div>}
        <div className="p-1">
          <ul>
            {files.map(function (listValue) {
              return <File key={listValue.id}
                           editing={editingFile !== null ? listValue.id === editingFile.id : false}
                           file={editingFile !== null && listValue.id === editingFile.id ? editingFile : listValue}
                           onFileEdit={onFileEdit}
                           onFileEditDone={onFileEditDone}
                           onFileMark={onFileMark}/>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

FileList.propTypes = {
  files: PropTypes.array,
  hasGroups: PropTypes.bool,
  editingFile: PropTypes.object,
  searchCriteria: PropTypes.string,
  clearFileList: PropTypes.func.isRequired,
  fetchFileList: PropTypes.func.isRequired,
  fileEdit: PropTypes.func.isRequired,
  fileEditApproved: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  searchFile: PropTypes.func.isRequired,
  markFile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  let {files, editingFile, searchCriteria} = state.myStudies;
  let hasGroups = !!state.myStudies.myGroups.length;

  return {
    hasGroups: hasGroups,
    files: files,
    editingFile: editingFile,
    searchCriteria: searchCriteria
  };
}


const mapDispatchToProps = (dispatch) => ({
  clearFileList: () => dispatch(actions.clearFileList()),
  fetchFileList: (criteria) => dispatch(actions.fetchFileList(criteria)),
  fileEdit: (file) => dispatch(actions.fileEdit(file)),
  fileEditApproved: () => dispatch(actions.fileEditApproved()),
  createDocument: () => dispatch(actions.createDocument()),
  uploadFile: () => dispatch(actions.uploadFile()),
  searchFile: (criteria) => dispatch(actions.searchFile(criteria)),
  markFile: (fileId, isPositive) => dispatch(actions.markFile(fileId, isPositive, actions.fetchFileList))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList));
