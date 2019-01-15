import React from 'react';
import PropTypes from 'prop-types';
import './Subject.css';
import {MdChevronRight} from 'react-icons/md';
import {Link} from "react-router-dom";


const Subject = ({subject, onSelect}) => {
  return (
    <Link to={`/explore/subjects/details/`} style={{textDecoration: 'none'}}>
      <div className="container list-group-item list-group-item-action w-75 subject clickable"
           onClick={() => onSelect(subject.id)}>
        <div className="row">
          <div>{subject.subjectName}</div>
          <div>({subject.subjectNameShort})</div>
          <div className="text-lightgrey ml-2 fs15">{subject.academyName}</div>
          <MdChevronRight className="ml-auto si-color-text" size={24}/>
        </div>
      </div>
    </Link>
  )
};

Subject.propTypes = {
  subject: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}
export default Subject;
