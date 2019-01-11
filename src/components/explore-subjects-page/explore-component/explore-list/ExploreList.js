import React from 'react';
import PropTypes from 'prop-types';
import ReduxLazyScroll from "redux-lazy-scroll";
import './ExploreList.css';
import Subject from "./subject/Subject";

class ExploreList extends React.Component {
    render(){
      let isFetching = this.props.isFetching;
      let errorMessage = null;
      let hasMore = this.props.hasMore;
    return (
      <div className="container posts-lazy-scroll">
        <ReduxLazyScroll
          isFetching={isFetching}
          errorMessage={errorMessage}
          loadMore={(param) => this.props.onFetchSubjects(param)}
          hasMore={hasMore}
        >
          {this.props.subjects.map(subject => (
            <Subject key={subject.id} subject={subject}/>
          ))}
        </ReduxLazyScroll>
      </div>
    )
  }
}

ExploreList.propTypes = {
  subjects: PropTypes.array,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  onFetchSubjects: PropTypes.func

};

export default ExploreList;
