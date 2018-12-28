import React from 'react';
import { withRouter } from "react-router-dom";
import './MyStudiesList.css';
import * as actions from "../../actions/myStudiesListActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';



class MyStudiesList extends React.Component {
  constructor(props){
    super(props);
  }


  componentDidMount(){
    const { fetchMyGroupsList } = this.props;
    fetchMyGroupsList();
  }

  groupSelected(item){
    const { groupSelected } = this.props;
    groupSelected(item);
  }

  subjectSelected(item){
    const { subjectSelected } = this.props;
    subjectSelected(item);
  }

  render(){
    const data = this.props.myGroups;
    const selectedGroup = this.props.selectedGroup;
    const selectedSubject = this.props.selectedSubject;

    return (
      <div className="my-studies-list">
        <div className="list-info-label">
          Moje studia
        </div>
        <ul>
          <div className="list-info-label">
            Grupa
          </div>
          {data && data.map( group  => (
            <li key={group.id} style={ selectedGroup.id === group.id ? {backgroundColor: '#e1e1e1'} : {}}>
                <div className="list-option" onClick={()=>this.groupSelected(group)}>
                {group.name}
                </div>
            </li>
          ))}
        </ul>

        { selectedGroup.id && (
          <ul>
            <div className="list-info-label">
              Przedmioty
            </div>
            {selectedGroup.subjects.map(subject => (
              <li key={subject.id} style={ selectedSubject.id === subject.id ? {backgroundColor: '#e1e1e1'} : {}}>
                <div className="list-option" onClick={()=>this.subjectSelected(subject)}>
                  {subject.subjectName}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

MyStudiesList.propTypes ={
  fetchMyGroupsList: PropTypes.func,
  groupSelected: PropTypes.func,
  subjectSelected: PropTypes.func,
  myGroups: PropTypes.array,
  selectedGroup: PropTypes.object,
  selectedSubject: PropTypes.object
}

const mapStateToProps = (state) => {
  const { myGroups, selectedGroup, selectedSubject } = state.myStudiesList;
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
