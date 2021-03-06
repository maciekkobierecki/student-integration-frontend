import React from 'react';
import PropTypes from 'prop-types';
import './Group.css';

const Group = ({group}) => {
  return (
    <li className="list-group-item">
      <h2 className="si-yellow-text">{group.name}</h2>
      <div className="row">
        <div> {group.academyName}, {group.degreeName}, Semestr {group.semesterNo}</div>
      </div>
      <div className="row">
        <div>Link dołączający do grupy:</div>
        <div>https://student-integration.pl/recruitment/{group.groupEnterHash}</div>
      </div>
    </li>
  );
};

Group.propTypes = {
  group: PropTypes.object
};
export default Group;
