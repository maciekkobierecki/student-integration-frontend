import React from 'react';
import PropTypes from 'prop-types';
import './Subject.css';


const Subject = ({subject}) => {
  return (
    <div className="container">
      <div className="row">
       <div>{subject.subjectName}</div>
        <div>({subject.subjectNameShort})</div>
      </div>
    </div>
  )
};

Subject.propTypes = {
  subject: PropTypes.object.isRequired
}
export default Subject;
