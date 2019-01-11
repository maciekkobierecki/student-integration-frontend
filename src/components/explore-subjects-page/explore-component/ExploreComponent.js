import React from 'react';
import * as actions from "../../../actions/exploreActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import './ExploreComponent.css';
import {withRouter} from "react-router-dom";
import ExploreList from "./explore-list/ExploreList";


class ExploreComponent extends React.Component {
  componentDidMount(){
    this.props.fetchSubjects();
  }
  render() {
    return (
      <div>
        <div className="input-group mb-3 p-2 pt-4">
          <input type="text" className="form-control"
                 placeholder="Wyszukaj przedmiot wpisz nazwę uczelni, nazwę przedmiotu"
                 aria-describedby="button-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Przedmioty
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Przedmioty</a>
              <a className="dropdown-item" href="#">Pliki</a>
            </div>
          </div>
        </div>
        <div>
          <div className='row'>
            {<ExploreList onFetchSubjects={this.props.fetchSubjects} isFetching={this.props.isFetching} hasMore={this.props.hasMore} subjects={this.props.subjects}/>}
          </div>
        </div>
      </div>
    )
  }
}

ExploreComponent.propTypes = {
  subjectDetails: PropTypes.object,
  fileDetails: PropTypes.object,
  subjects: PropTypes.array,
  fetchSubjects: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

const mapStateToProps = (state) => {
  const {subjects, isFetching, hasMore, subjectDetails, fileDetails} = state.explore;
  return {
    displayingSubjectDetails: subjectDetails,
    displayingFileDetails: fileDetails,
    subjects: subjects,
    isFetching: isFetching,
    hasMore: hasMore
  };
};


const mapDispatchToProps = (dispatch) => ({
  fetchSubjects: () => dispatch(actions.fetchSubjects()),
  fetchSubjectDetails: () => dispatch(actions.fetchSubjectDetails())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreComponent));
