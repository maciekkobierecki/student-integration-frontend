import React from "react";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import StepWizard from 'react-step-wizard';
import './CreateGroupForm.css';
import * as actions from "../../../actions/createGroupActions";
import {MdNavigateNext, MdNavigateBefore, MdCheck} from 'react-icons/md';

const STEP_INDEX = {
  ACADEMIES: 1,
  DEGREES: 2,
  GROUP_NAME: 3
}

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileSearch = this.fileSearch.bind(this);
    this.fetchAcademies();
  }

  componentDidMount(){
    this.props.clearGroupCreationData();
  }

  fetchAcademies() {
    this.props.fetchAcademies();
  }

  fileSearch() {

  }

  creationDone() {
    this.props.groupCreationDone();
    this.props.history.push('/my-groups');
  }

  stepChanged(evt) {
    debugger;
    const activeStep = evt.activeStep;
    if (activeStep === STEP_INDEX.DEGREES) {
      this.props.fetchDegrees();
    }
  }

  academySelected(academyId) {
    this.props.academySelected(academyId);
  }

  degreeSelected(degreeId) {
    this.props.degreeSelected(degreeId);
  }

  render() {
    return (
      <div className="create-group-form">
        <StepWizard onStepChange={this.stepChanged.bind(this)}>
          <AcademyStep creatingGroup={this.props.creatingGroup} academies={this.props.academies}
                       onAcademySelected={this.academySelected.bind(this)}/>
          <DegreeStep creatingGroup={this.props.creatingGroup} degrees={this.props.degrees}
                      onDegreeSelected={this.degreeSelected.bind(this)}/>
          <GroupNameStep creatingGroup={this.props.creatingGroup} onGroupDataChanged={this.props.groupDataChanged}
                         onCreationDone={this.creationDone.bind(this)}/>
        </StepWizard>
      </div>
    );
  }
}

CreateGroupForm.propTypes = {
  creatingGroup: PropTypes.object,
  academies: PropTypes.array,
  degrees: PropTypes.array,
  currentStep: PropTypes.number,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  totalSteps: PropTypes.number,
  fetchAcademies: PropTypes.func,
  fetchDegrees: PropTypes.func,
  academySelected: PropTypes.func,
  degreeSelected: PropTypes.func,
  groupCreationDone: PropTypes.func,
  groupDataChanged: PropTypes.func,
  clearGroupCreationData: PropTypes.func
}

const mapStateToProps = (state) => {
  let {allAcademies, degrees, creatingGroup} = state.createGroupForm;
  return {
    creatingGroup: creatingGroup,
    academies: allAcademies,
    degrees: degrees
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchAcademies: () => dispatch(actions.fetchAcademies()),
  fetchDegrees: () => dispatch(actions.fetchDegrees()),
  academySelected: (academyId) => dispatch(actions.academySelected(academyId)),
  degreeSelected: (degreeId) => dispatch(actions.degreeSelected(degreeId)),
  groupCreationDone: () => dispatch(actions.groupCreationDone()),
  groupDataChanged: (propertyName, propertyValue) => dispatch(actions.groupDataChanged(propertyName, propertyValue)),
  clearGroupCreationData: () => dispatch(actions.clearGroupCreationData())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupForm));


const CreationActionBar = ({
                             currentStep,
                             nextStep,
                             previousStep,
                             totalSteps,
                             onCreationDone,
                             disabled
                           }) => (
  <div className="container action-bar">
    <div className="row">
      {currentStep > 1 ? <div className='step-btn col-md-6' onClick={previousStep}><MdNavigateBefore size={32}/></div> :
        <div className="col-md-6"></div>}
      {currentStep === totalSteps ?
        <div className='step-btn col-md-6' onClick={() => onCreationDone()}><MdCheck size={32}
                                                                                     style={{color: 'green'}}/></div> :
        <div className='step-btn col-md-6' onClick={() => !disabled && nextStep()}><MdNavigateNext size={32}/></div>}
    </div>
  </div>
);

/** Steps */

class AcademyStep extends React.Component {
  constructor(props) {
    super(props);
  }

  update = (e) => {
    this.props.update(e.target.name, e.target.value);
  }

  render() {
    debugger;
    if (!this.props.isActive) return null;
    const academies = this.props.academies;
    const onAcademySelected = this.props.onAcademySelected;
    let selectedAcademyId = this.props.creatingGroup.academyId;
    return (
      <div className="step">
        <div className="choose-window">
          <label>Wybierz uczelnię</label>
          {academies && academies.map(function (item) {
            return <div key={item.id} className={"option"+ (item.id ===selectedAcademyId ? " si-yellow":"")}
                        onClick={() => onAcademySelected(item.id)}>{item.academyName}</div>;
          })}
        </div>
        <CreationActionBar {...this.props} disabled={!selectedAcademyId} />
      </div>
    );
  }
}

class DegreeStep extends React.Component {
  render() {
    if (!this.props.isActive) return null;
    const degrees = this.props.degrees;
    const onDegreeSelected = this.props.onDegreeSelected;
    const selectedDegreeId = this.props.creatingGroup.degreeId;
    return (
      <div className="step">
        <div className="choose-window">
          <label>Wybierz kierunek</label>
          {degrees && degrees.map(function (item) {
            return <div key={item.id}
                        className={"option"+ (item.id ===selectedDegreeId ? " si-yellow":"")}
                        onClick={() => onDegreeSelected(item.id)}>{item.name}</div>;
          })}
        </div>
        <CreationActionBar {...this.props} disabled={!selectedDegreeId}/>
      </div>
    );
  }
}

class GroupNameStep extends React.Component {
  render() {
    return (
      <div className="step">
        <div className="mt-2 ml-2 mb-2">
          Uzupełnij informacje na temat grupy:
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="group-name">
              Nazwa grupy:
            </label>
            <input type="text" className="form-control"
                   onChange={(e) => this.props.onGroupDataChanged('groupName', e.target.value)}
                   placeholder="wpisz nazwę grupy"/>
          </div>

          <div className="form-group">
            <label htmlFor="semester-number">
              Numer semestru:
            </label>
            <input type="text" className="form-control"
                   onChange={(e) => this.props.onGroupDataChanged('semesterNo', e.target.value)}
                   placeholder="wpisz numer semestru"/>
          </div>

        </form>
        <CreationActionBar {...this.props} />
      </div>
    );
  }
}
