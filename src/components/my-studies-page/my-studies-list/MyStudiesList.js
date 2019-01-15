import React from 'react';
import {withRouter} from "react-router-dom";
import './MyStudiesList.css';
import * as actions from "../../../actions/myStudiesListActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';


class MyStudiesList extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {fetchMyGroupsList} = this.props;
    fetchMyGroupsList();
  }

  groupSelected(item) {
    const {groupSelected} = this.props;
    groupSelected(item);
  }

  subjectSelected(item) {
    const {subjectSelected} = this.props;
    subjectSelected(item);
  }

  render() {
    let myGroups = this.props.myGroups;
    let selectedGroup = this.props.selectedGroup;
    let selectedSubject = this.props.selectedSubject;

    let groups = myGroups.map(group => (
      <li key={group.id} style={selectedGroup.id === group.id ? {backgroundColor: '#e1e1e1'} : {}}>
        <div className="list-option" onClick={() => this.groupSelected(group)}>
          {group.name}
        </div>
      </li>
    ));

    let subjects = (
      <div>
        <div className="list-info-label">
          Przedmioty
        </div>
        <ul>
          {selectedGroup && selectedGroup.subjects && selectedGroup.subjects.map(subject => (
            <li key={subject.id} style={selectedSubject.id === subject.id ? {backgroundColor: '#e1e1e1'} : {}}>
              <div className="list-option" onClick={() => this.subjectSelected(subject)}>
                {subject.subjectName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="my-studies-list">
        <div className="list-info-label">
          Moje studia
        </div>
        <ul>
          <div className="list-info-label">
            Grupa
          </div>
          {myGroups.length ? groups : <div className="alert alert-light">Nie należysz do żadnej grupy</div>}
        </ul>

        {selectedGroup ? subjects : []}
      </div>
    )
  }
}

MyStudiesList.propTypes = {
  fetchMyGroupsList: PropTypes.func,
  groupSelected: PropTypes.func,
  subjectSelected: PropTypes.func,
  myGroups: PropTypes.array,
  selectedGroup: PropTypes.object,
  selectedSubject: PropTypes.object
}

const mapStateToProps = (state) => {
  const {myGroups, selectedGroup, selectedSubject} = state.myStudies;
  debugger;
  return {
    myGroups: myGroups,
    selectedGroup: selectedGroup,
    selectedSubject: selectedSubject
  };
};


const mapDispatchToProps = (dispatch) => ({
  groupSelected: (selected) => dispatch(actions.groupItemSelected(selected)),
  subjectSelected: (selected) => dispatch(actions.subjectItemSelected(selected)),
  fetchMyGroupsList: () => dispatch(actions.fetchMyGroupsList())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStudiesList));
