import React from 'react';
import { withRouter, Link, Route } from "react-router-dom";
import './MyStudiesList.css';
import * as actions from "../../actions/myStudiesListActions";
import connect from "react-redux/es/connect/connect";


class MyStudiesList extends React.Component {
  constructor(props){
    super(props);
  }


  componentDidMount(){
    const { fetchMyStudiesList } = this.props;
    fetchMyStudiesList();
  }

  academySelected(item){
    const { academySelected } = this.props;
    academySelected(item);
  }

  semesterSelected(item){
    const { semesterSelected } = this.props;
    semesterSelected(item);
  }

  subjectSelected(item){
    const { subjectSelected } = this.props;
    subjectSelected(item);
  }

  render(){
    var data = this.props.academies;
    var selectedAcademy = this.props.selectedAcademy;
    var selectedSemester = this.props.selectedSemester;
    var selectedSubject = this.props.selectedSubject;

    return (
      <div className="my-studies-list">
        <div className="list-info-label">
          Moje studia
        </div>
        <ul>
          <div className="list-info-label">
            Uczelnia
          </div>
          {data.map( academy  => (
            <li key={academy.id} style={ selectedAcademy.id === academy.id ? {backgroundColor: '#e1e1e1'} : {}}>
                <div className="list-option" onClick={()=>this.academySelected(academy)}>
                {academy.academyName}
                </div>
            </li>
          ))}
        </ul>

        { selectedAcademy.id && (
          <ul>
            <div className="list-info-label">
              Kierunek
            </div>
            {selectedAcademy.semesters.map(semester => (
              <li key={semester.id} style={ selectedSemester.id === semester.id ? {backgroundColor: '#e1e1e1'} : {}}>
                <div className="list-option" onClick={()=>this.semesterSelected(semester)}>
                  {semester.name}
                </div>
              </li>
            ))}
          </ul>
        )}

        { selectedSemester.id && (
          <ul>
            <div className="list-info-label">
              Przedmiot
            </div>
            {selectedSemester.subjects.map(subject => (
              <li key={subject.id} style={ selectedSubject.id === subject.id ? {backgroundColor: '#e1e1e1'} : {}}>
                <div className="list-option"  onClick={()=>this.subjectSelected(subject)}>
                  {subject.name}
                </div>
              </li>
            ))}
          </ul>
        )}

        { selectedSubject.id && (
          <div>
            {selectedSubject.name}
            Oceń przedmiot
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { academies, selectedAcademy, selectedSemester, selectedSubject } = state.myStudiesListReducer;
  return {
    academies: academies,
    selectedAcademy: selectedAcademy,
    selectedSemester: selectedSemester,
    selectedSubject: selectedSubject
  };
};


const mapDispatchToProps = (dispatch) => ({
  academySelected: (selected) => dispatch(actions.academyItemSelected(selected)),
  semesterSelected: (selected) => dispatch(actions.semesterItemSelected(selected)),
  subjectSelected: (selected) => dispatch(actions.subjectItemSelected(selected)),
  fetchMyStudiesList: () => dispatch(actions.fetchMyStudiesList())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStudiesList));
