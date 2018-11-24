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
  }

  fileSearch(e, criteria)
  {
    debugger;
    e.preventDefault();
    this.props.searchFile(criteria);
  }

  createDocument(){

  }

  fileUpload(){

  }

  render()
  {
    debugger;
    const onFileEdit = this.props.fileEdit;
    const onFileEditDone = this.props.fileEditDone;
    const onFileOpen = this.props.uploadFile;
    const { editingFileId, searchCriteria, isLoading } = this.props;
    return (
      <div className="file-list">
        <div className={ isLoading ? "loading": ""}>
        <OperationsBar onFileCreate={this.createDocument} onFileUpload={this.fileUpload} onSearch={this.fileSearch} criteria={searchCriteria}/>
        <div>
            <ul>
              {this.props.files.map(function (listValue) {
                return <File key={listValue.id}
                             id={listValue.id}
                             editing={listValue.id === editingFileId}
                             createDate={listValue.createDate}
                             name={listValue.name}
                             content={listValue.content}
                             url={listValue.url}
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
  editingFileId: PropTypes.string,
  searchCriteria: PropTypes.string.isRequired,
  clearFileList: PropTypes.func.isRequired,
  fetchFileList: PropTypes.func.isRequired,
  fileEdit: PropTypes.func.isRequired,
  fileEditDone: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  searchFile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { files, filesLoading, editingFileId, searchCriteria } = state.fileList;
    return {
      files: files,
      isLoading: filesLoading,
      editingFileId: editingFileId,
      searchCriteria: searchCriteria
    };
}


const mapDispatchToProps = (dispatch) => ({
      clearFileList: () => dispatch(actions.clearFileList()),
      fetchFileList: (criteria) => dispatch(actions.fetchFileList(criteria)),
      fileEdit: (fileId) => dispatch(actions.fileEdit(fileId)),
      fileEditDone: (fileId) => dispatch(actions.fileEditDone(fileId)),
      createDocument: () => dispatch(actions.createDocument()),
      uploadFile: () => dispatch(actions.uploadFile()),
      searchFile: (criteria) => dispatch(actions.searchFile(criteria))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList));
