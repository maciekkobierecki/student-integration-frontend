import React from 'react';
import PropTypes from 'prop-types';
import './SubjectComment.css';


const File = ({comment}) => {
  return (
    <div className="container">
      <div className="comment bg-light padding">
        <div>
          {comment.content}
        </div>
        <div className="text-right">
          {comment.author}
        </div>
      </div>
    </div>);
};

File.propTypes = {
  comment: PropTypes.object.isRequired
};
export default File;
