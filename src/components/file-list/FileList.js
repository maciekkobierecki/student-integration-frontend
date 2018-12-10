import React from 'react';
import * as actions from "../../actions/fileListActions";
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

  fileSearch(e, criteria)
  {
    e.preventDefault();
    this.props.searchFile(criteria);
  }

  fileUpload(){

  }

  openFile(url){
    window.open(url, "_blank");
  }

  fileEditApproved(evt){
    evt.preventDefault();
    const { fileEditApproved } = this.props;
    fileEditApproved();
  }

  render()
  {
    debugger;
    const onFileEdit = this.props.fileEdit;
    const onFileEditDone = this.fileEditApproved;
    const onFileOpen = this.openFile;
    const onCreateDocument = this.props.createDocument;
    const { editingFile, searchCriteria, isLoading } = this.props;
    return (
      <div className="file-list">
        <div className={ isLoading ? "loading": ""}>
        <OperationsBar onFileCreate={onCreateDocument} onFileUpload={this.fileUpload} onSearch={this.fileSearch} criteria={searchCriteria}/>
        <div>
            <ul>
              {this.props.files.map(function (listValue) {
                return <File key={listValue.id}
                             editing={ editingFile !== null ? listValue.id === editingFile.id : false }
                             file={ editingFile !== null && listValue.id === editingFile.id ? editingFile : listValue}
                             onFileOpen={onFileOpen}
                             onFileEdit={onFileEdit}
                             onFileEditDone={onFileEditDone}/>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  editingFile: PropTypes.object,
  searchCriteria: PropTypes.string.isRequired,
  clearFileList: PropTypes.func.isRequired,
  fetchFileList: PropTypes.func.isRequired,
  fileEdit: PropTypes.func.isRequired,
  fileEditApproved: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  searchFile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { files, filesLoading, editingFile, searchCriteria } = state.fileList;
    return {
      files: files,
      isLoading: filesLoading,
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
      searchFile: (criteria) => dispatch(actions.searchFile(criteria))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList));
