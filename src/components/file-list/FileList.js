import React from 'react';
import * as actions from "../../actions/fileListActions";
import connect from "react-redux/es/connect/connect";
import { lang } from '../../constants/translations';
import './FileList.css';

import File from './file/File';
import FileLoader from './file-loader/FileLoader';
import OperationsBar from './operations-bar/OperationsBar';


class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.goToDrive = this.goToDrive.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);

  }

  componentDidMount(){
    const { fetchFileList } = this.props;
    fetchFileList();
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
      <div>
        <FileLoader/>
        <OperationsBar/>
        <div className="file-list">
          <div onClick={this.fetchFiles}>{lang.buttons.refresh}</div>
          <div style={ this.props.isLoading ? loadingStyle : {} }>
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
  const { files } = state.fileListReducer;
    return {
      files: files
    };
  }


const mapDispatchToProps = (dispatch) => ({
      clearFileList: () => dispatch(actions.clearFileList()),
      fetchFileList: () => dispatch(actions.fetchFileList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
