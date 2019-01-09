import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import './SubjectDetails.css';


class SubjectDetails extends React.Component {
  render() {
    return (
      <div>
        Subject details
      </div>
    )
  }
}

SubjectDetails.propTypes = {
  subjectDetails: PropTypes.object
};

const mapStateToProps = (state) => {
  const {success} = state.groupRecruitment.groupEnter;
  return {
    success: success
  };
}


const mapDispatchToProps = (dispatch) => ({
    enterToGroup: (actionHash) => dispatch(actionHash)
  })
;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectDetails));
