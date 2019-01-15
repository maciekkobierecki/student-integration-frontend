import React from 'react';
import PropTypes from 'prop-types';
import {Link, Route, withRouter} from "react-router-dom";
import './SubjectDetails.css';
import {MdChevronLeft, MdExpandLess, MdExpandMore} from "react-icons/md";
import File from "../../../my-studies-page/file-list/file/File";
import SubjectCommentsList from "./subject-comments-list/SubjectCommentsList";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../../../actions/exploreActions";
import * as fileActions from "../../../../actions/fileListActions";


class SubjectDetails extends React.Component {
  render() {
    let subjectDetails = this.props.subjectDetails;
    let files = subjectDetails && subjectDetails.files;
    const onFileMark = this.props.markFile;
    const onSubjectMark = this.props.markSubject;

    if (!subjectDetails) {
      return <div>loading</div>
    }

    return (
      <div className="container">
        <div className="row mt-2">
          <Link to="/explore/subjects" className="my-auto text-black-50">
            <MdChevronLeft size={44}/>
          </Link>
          <div className="fs30 my-auto">
            {subjectDetails.name}
          </div>
          <div className="fs30 text-lightgrey ml-2 my-auto">
            {subjectDetails.shortName}
          </div>
          <div className="ml-2">
            <div className={subjectDetails.isMarkable ? "clickable" : "disabled opacity"}
                 onClick={() => {
                   onSubjectMark(subjectDetails, true)
                 }}>
              <MdExpandLess className="text-green" size={24}/>
            </div>
            <div className="fs15">
              {parseInt(100 * subjectDetails.rating / subjectDetails.ratingCount)}%
            </div>
            <div className={subjectDetails.isMarkable ? "clickable" : "disabled opacity"}
                 onClick={() => {
                   onSubjectMark(subjectDetails, false)
                 }}>
              <MdExpandMore className="text-red" size={24}/>
            </div>
          </div>
        </div>
        <div className="row h1000 mt-2">
          <div className="col-3">
            <div className="mt-2">
              Szczegóły
            </div>
            <div className="ml-2">
              <div className="mt-2">
                {subjectDetails.academyName}
              </div>
              <div className="mt-2">
                Liczba plików: {subjectDetails.filesCount}
              </div>
              <div className="mt-2">
                Liczba komentarzy: {subjectDetails.commentsCount}
              </div>
            </div>
            <div className="mt-4">
              <Link to="/explore/subjects/details" className="nav-link">lista plików</Link>
              <Link to="/explore/subjects/details/comments" className="nav-link">komentarze</Link>
            </div>
          </div>
          <div className="col-9">
            <Route exact path='/explore/subjects/details/' render={() => (
              <div>
                {files && !files.length && <div className="alert alert-info ml-2 mr-2">Przedmiot nie posiada przypisanych jeszcze żadnych plików.</div>}
                {files && files.map(function (listValue) {
                  return <File key={listValue.id}
                               file={listValue}
                               onFileMark={(fileId, isPositive) => onFileMark(fileId, isPositive, subjectDetails.id)}/>
                })}
              </div>
            )}/>
            <Route exact path="/explore/subjects/details/comments" render={() =>
              <SubjectCommentsList subjectId={subjectDetails.id}/>}/>
          </div>
        </div>
      </div>
    )
  }
}

SubjectDetails.propTypes = {
  subjectDetails: PropTypes.object,
  markFile: PropTypes.func
};


const mapStateToProps = (state) => {
  const {subjectDetails} = state.explore;
  return {
    subjectDetails: subjectDetails
  };
};


const mapDispatchToProps = (dispatch) => ({
  markFile: (fileId, isPositive, subjectId) => dispatch(fileActions.markFile(fileId, isPositive, () => dispatch(actions.fetchPublicFileList(subjectId)))),
  markSubject: (subjectDetails, isPositive) => dispatch(actions.markSubject(subjectDetails, isPositive))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(SubjectDetails));
