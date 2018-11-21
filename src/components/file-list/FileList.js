import React from 'react';
import * as actions from "../../actions/fileListActions";
import connect from "react-redux/es/connect/connect";
import { lang } from '../../constants/translations';
import './FileList.css';
import PropTypes from 'prop-types';

import File from './file/File';
import OperationsBar from './operations-bar/OperationsBar';

import {
  Spinner, // The React component
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end, // The action value if a "long" running task ended
  endAll // The action value if all running tasks must end
} from 'react-redux-spinner';
import {withRouter} from "react-router-dom";


class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.goToDrive = this.goToDrive.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
    this.fileEdit = this.fileEdit.bind(this);
    this.fileEditDone = this.fileEditDone.bind(this);

  }

  componentDidMount(){
}


  goToDrive(){
    const { clearFileList } = this.props;
    clearFileList();
  }

  fileEdit(id){
    debugger;
    const { fileEdit } = this.props;
    fileEdit(id);
  }

  fileEditDone(id){
    const { fileEditDone } = this.props;
    fileEditDone(id);
  }

  fetchFiles() { this.props.fetchFileList() }

  fileSearch(){

  }

  createDocument(){

  }

  fileUpload(){

  }

  render()
  {
    debugger;
    const onFileOpen = this.goToDrive;
    const onFileEdit = this.fileEdit;
    const onFileEditDone = this.fileEditDone;
    const { editingFileId } = this.props;
    return (
      <div className="file-list">
        <div className={ this.props.isLoading ? "loading": ""}>
        <OperationsBar onFileCreate={this.createDocument} onFileUpload={this.fileUpload} onSearch={this.fileSearch}/>
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
  clearFileList: PropTypes.func.isRequired,
  fetchFileList: PropTypes.func.isRequired,
  fileEdit: PropTypes.func.isRequired,
  fileEditDone: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { files, filesLoading, editingFileId } = state.fileListReducer;
    return {
      files: files,
      isLoading: filesLoading,
      editingFileId: editingFileId
    };
  }


const mapDispatchToProps = (dispatch) => ({
      clearFileList: () => dispatch(actions.clearFileList()),
      fetchFileList: (subjectId) => dispatch(actions.fetchFileList(subjectId)),
      fileEdit: (fileId) => dispatch(actions.fileEdit(fileId)),
      fileEditDone: (fileId) => dispatch(actions.fileEditDone(fileId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList));
