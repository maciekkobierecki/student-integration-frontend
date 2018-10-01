import React from 'react';
import PropTypes from 'prop-types';
import { lang } from './../../constants/translations';

const divStyle = {
'borderRadius': '3px',
'border': 'dotted 1px lightgrey',
'height': '40px',
'fontSize':'20px',
'marginBottom':'10px',
  'padding': '5px'
}

const driveBtnStyle = {
  'background':'lightgrey',
  'minWidth':'30px',
  'minHeight':'20px',
}

const File = ({id, date}) => (
  <div style={divStyle}>
      <div>{id}</div>
      <div>{date}</div>
      <span style={driveBtnStyle} onClick={this.props.onClick}>{lang.buttons.goToDrive}</span>
  </div>
)

File.propTypes={
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
export default File;
