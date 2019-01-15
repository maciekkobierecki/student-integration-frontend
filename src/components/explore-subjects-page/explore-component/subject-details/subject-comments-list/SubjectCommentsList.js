import React from 'react';
import * as actions from "../../../../../actions/exploreActions";
import connect from "react-redux/es/connect/connect";
import './SubjectCommentsList.css';
import PropTypes from 'prop-types';

import {withRouter} from "react-router-dom";
import SubjectComment from "./subject-comment/SubjectComment";


class SubjectCommentsList extends React.Component {
  componentDidMount(){
    this.props.fetchComments(this.props.subjectId);
  }

  render() {
    let comments = this.props.comments;
    debugger;
    return (
      <div className="">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="wpisz komentarz"
                 aria-label="wpisz komentarz" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Dodaj komentarz</button>
            </div>
        </div>

        <ul>
            {comments && comments.map(function (listValue) {
              return <SubjectComment key={listValue.id}
                           comment={listValue}/>
            })}
          </ul>
        </div>
    )
  }
}

SubjectCommentsList.propTypes = {
  comments: PropTypes.array,
  subjectId: PropTypes.number.isRequired,
  fetchComments: PropTypes.func
};

const mapStateToProps = (state) => {
  let {comments} = state.explore.subjectDetails;
  debugger;
  return {
    comments: comments
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchComments: (subjectId) => dispatch(actions.fetchSubjectComments(subjectId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectCommentsList));
