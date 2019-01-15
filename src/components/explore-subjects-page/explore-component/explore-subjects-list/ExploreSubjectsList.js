import React from 'react';
import PropTypes from 'prop-types';
import ReduxLazyScroll from "redux-lazy-scroll";
import './ExploreSubjectsList.css';
import Subject from "../explore-subjects-list/subject/Subject";

class ExploreSubjectsList extends React.Component {
    render(){
      let isFetching = this.props.isFetching;
      let errorMessage = null;
      let hasMore = this.props.hasMore;
      debugger;
    return (
      <div className="container posts-lazy-scroll list-group">
        <ReduxLazyScroll
          isFetching={isFetching}
          errorMessage={errorMessage}
          loadMore={(param) => this.props.onFetchSubjects(param)}
          hasMore={hasMore}
        >
          {this.props.subjects.map(subject => (
            <Subject key={subject.id} subject={subject} onSelect={this.props.onSubjectSelect}/>
          ))}
        </ReduxLazyScroll>
      </div>
    )
  }
}

ExploreSubjectsList.propTypes = {
  subjects: PropTypes.array,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  onFetchSubjects: PropTypes.func,
  onSubjectSelect: PropTypes.func

};

export default ExploreSubjectsList;
