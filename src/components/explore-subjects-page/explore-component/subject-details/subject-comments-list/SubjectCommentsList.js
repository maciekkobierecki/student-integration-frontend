import React from 'react';
import * as actions from "../../../../../actions/exploreActions";
import connect from "react-redux/es/connect/connect";
import './SubjectCommentsList.css';
import PropTypes from 'prop-types';

import {withRouter} from "react-router-dom";
import SubjectComment from "./subject-comment/SubjectComment";


class SubjectCommentsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {inputValue: ''};
    this.commentSubject = this.commentSubject.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchComments(this.props.subjectId);
  }

  handleSearchInputChange(evt) {
    this.setState({inputValue: evt.target.value});
  }

  commentSubject(evt, subjectId){
    evt.preventDefault();
    this.props.addComment(subjectId, this.state.inputValue);
    this.setState({inputValue: ""});
  }

  render() {
    let comments = this.props.comments;
    let subjectId = this.props.subjectId;
    debugger;
    return (
      <div className="">
        <form onSubmit={(evt) => this.commentSubject(evt, subjectId)}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="wpisz komentarz"
                   value={this.state.inputValue} onChange={this.handleSearchInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Dodaj komentarz</button>
            </div>
          </div>
        </form>

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
  fetchComments: PropTypes.func,
  addComment: PropTypes.func
};

const mapStateToProps = (state) => {
  let {comments} = state.explore.subjectDetails;
  debugger;
  return {
    comments: comments
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchComments: (subjectId) => dispatch(actions.fetchSubjectComments(subjectId)),
  addComment: (subjectId, content) => dispatch(actions.addComment(subjectId, content, () => dispatch(actions.fetchSubjectComments(subjectId))))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectCommentsList));
