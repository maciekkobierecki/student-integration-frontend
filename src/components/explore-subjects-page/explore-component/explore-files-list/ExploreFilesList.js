import React from 'react';
import PropTypes from 'prop-types';
import ReduxLazyScroll from "redux-lazy-scroll";
import File from "../../../my-studies-page/file-list/file/File";

class ExploreFilesList extends React.Component {
  componentDidUpdate(){
    debugger;
  }
  render(){
    let isFetching = this.props.isFetching;
    let errorMessage = null;
    let hasMore = this.props.hasMore;
    return (
      <div className="container w-75 posts-lazy-scroll list-group">
        <ReduxLazyScroll
          isFetching={isFetching}
          errorMessage={errorMessage}
          loadMore={(param) => this.props.onFetchFiles(param)}
          hasMore={hasMore}
        >
          {this.props.files && this.props.files.map(file => (
            <File key={file.id} file={file} onFileMark={this.props.onFileMark}/>
          ))}
        </ReduxLazyScroll>
      </div>
    )
  }
}

ExploreFilesList.propTypes = {
  files: PropTypes.array,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  onFetchFiles: PropTypes.func,
  onFileMark: PropTypes.func

};

export default ExploreFilesList;
