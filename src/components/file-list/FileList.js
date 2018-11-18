import React from 'react';
import * as actions from "../../actions/fileListActions";
import connect from "react-redux/es/connect/connect";
import { lang } from '../../constants/translations';
import './FileList.css';

import File from './file/File';
import FileLoader from './file-loader/FileLoader';
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

  }

  componentDidMount(){

    const { fetchFileList } = this.props;
    fetchFileList(1);
}


  goToDrive(){
    const { clearFileList } = this.props;
    clearFileList();
  }

  fetchFiles() { this.props.fetchFileList() }

  render()
  {
    const onClickFile = this.goToDrive;
    return (
      <div className="file-list">
        <div className={ this.props.isLoading ? "loading": ""}>
        <FileLoader/>
        <OperationsBar/>
        <div>
          <div onClick={this.fetchFiles}>{lang.buttons.refresh}</div>
            <ul style={{padding: '0px'}}>
              {this.props.files.map(function (listValue) {
                return <File key={listValue.id}
                             createDate={listValue.createDate}
                             subject={listValue.subject}
                             content={listValue.content}
                             id={listValue.id}
                             url={listValue.url}
                             onClick={onClickFile}/>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { files, filesLoading } = state.fileListReducer;
    return {
      files: files,
      isLoading: filesLoading
    };
  }


const mapDispatchToProps = (dispatch) => ({
      clearFileList: () => dispatch(actions.clearFileList()),
      fetchFileList: (subjectId) => dispatch(actions.fetchFileList(subjectId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList));
