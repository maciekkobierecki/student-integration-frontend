import React from 'react';
import PropTypes from 'prop-types';
import { lang } from '../../../constants/translations';
import './File.css';



const File = ({createDate, subject, content, url, onClick}) => (
  <div className="file">
    <div className="row">
      <div className="subject">{subject}</div>
      <div className="createDate">{createDate}</div>
    </div>
    <div className="file-description">{content}</div>
    <div className="drive-btn" onClick={() => onClick(url)}>{lang.buttons.goToDrive}</div>
  </div>
)

File.propTypes={
  createDate: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
export default File;
