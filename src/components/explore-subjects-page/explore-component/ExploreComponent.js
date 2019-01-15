import React from 'react';
import * as actions from "../../../actions/exploreActions";
import * as appActions from "../../../actions/appActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import './ExploreComponent.css';
import {Link, Route, withRouter} from "react-router-dom";
import ExploreSubjectsList from "./explore-subjects-list/ExploreSubjectsList";
import SubjectDetails from "./subject-details/SubjectDetails";
import * as fileActions from "../../../actions/fileListActions";
import ExploreFilesList from "./explore-files-list/ExploreFilesList";


class ExploreComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.initState();
  }

  componentDidMount() {
    this.props.fetchSubjects();
  }

  render() {
    let searchBar = (
      <div className="input-group mb-3 p-2 pt-4">
          <Route exact path='/explore/subjects' render={() =>
            <input type="text" className="form-control"
                   placeholder="Wyszukaj przedmiot wpisz nazwę uczelni, nazwę przedmiotu"
                   aria-describedby="button-addon2"/>
          }/>
          <Route exact path='/explore/files' render={() =>
            <input type="text" className="form-control"
                   placeholder="wpisz nazwę pliku lub fragment opisu"
                   aria-describedby="button-addon2"/>
          }/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">{this.props.currentSearching}
          </button>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/explore/subjects"
                  onClick={() => this.props.currentSearchingChange("Przedmioty")}>Przedmioty</Link>
            <Link className="dropdown-item" to="/explore/files"
                  onClick={() => this.props.currentSearchingChange("Pliki")}>Pliki</Link>
          </div>
        </div>
      </div>
    );
    debugger;
    let exploreSubjectsList = (
      <div className='row'>
        <ExploreSubjectsList onFetchSubjects={this.props.fetchSubjects} onSubjectSelect={this.props.onSubjectSelect}
                             isFetching={this.props.isFetching} hasMore={this.props.hasMore}
                             subjects={this.props.subjects}/>
      </div>
    );

    return (
      <div>
        <Route exact path='/explore/subjects' render={() =>
          searchBar
        }/>

        <Route exact path='/explore/files' render={() =>
          searchBar
        }/>

        <Route exact path="/explore/subjects" render={() =>
          exploreSubjectsList
        }/>

        <Route exact path='/explore/files/' render={() => (
          <div>
            <ExploreFilesList onFetchFiles={this.props.fetchFiles} onFileMark={this.props.markFile}
                              isFetching={this.props.isFetching} hasMore={this.props.hasMore}
                              files={this.props.files}/>
          </div>
        )}/>

        <Route path="/explore/subjects/details/" component={SubjectDetails}/>

      </div>
    )
  }
}

ExploreComponent.propTypes = {
  fileDetails: PropTypes.object,
  subjects: PropTypes.array,
  files: PropTypes.array,
  currentSearching: PropTypes.string,
  fetchSubjects: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  onSubjectSelect: PropTypes.func.isRequired,
  markFile: PropTypes.func.isRequired,
  initState: PropTypes.func.isRequired,
  currentSearchingChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool
};

const mapStateToProps = (state) => {
  const {subjects, files, isFetching, hasMore, fileDetails, currentSearching} = state.explore;
  return {
    fileDetails: fileDetails,
    subjects: subjects,
    files: files,
    isFetching: isFetching,
    hasMore: hasMore,
    currentSearching: currentSearching
  };
};


const mapDispatchToProps = (dispatch) => ({
  fetchSubjects: () => dispatch(actions.fetchSubjects()),
  fetchFiles: () => dispatch(actions.fetchFiles()),
  onSubjectSelect: (subjectId) => dispatch(actions.fetchSubjectDetails(subjectId)),
  onFileMark: (subjectId) => dispatch(actions.fetchSubjectDetails(subjectId)),
  currentSearchingChange: (newCurrentSearching) => dispatch(actions.currentSearchingChange(newCurrentSearching)),
  initState: () => dispatch(appActions.resetState()),
  markFile: (fileId, isPositive) => dispatch(fileActions.markFile(fileId, isPositive, () => dispatch(actions.fetchSubjects())))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreComponent));
