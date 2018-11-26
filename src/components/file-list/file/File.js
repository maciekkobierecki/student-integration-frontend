import React from 'react';
import PropTypes from 'prop-types';
import { MdBuild, MdCheck } from 'react-icons/md';
import { lang } from '../../../constants/translations';
import './File.css';


const File = ({id, createDate, name, content, url, editing, onFileOpen, onFileEdit, onFileEditDone}) => {
  if(editing){
    return (
      <div className="file edit">
        <div className="row">
          <div>
            <form onSubmit={ () => onFileEditDone(id) }>
                <input className="file-edit-input orange" type="text" name="name" defaultValue={name}/>
            </form>
          </div>
          <div className="createDate">{createDate}</div>
          <div className="edit-file-button" onClick={ () => onFileEdit(id) }>
        </div>
        </div>
          <form onSubmit={ () => onFileEditDone(id) }>
            <input className="file-edit-input max-width fs14" type="text" name="description" defaultValue={content} />
          </form>
        <div className="tr mr5 mt5">
          <MdCheck className="apply-button" onClick={ () => onFileEditDone(id)}/>
        </div>
      </div>);
  }
  return (
  <div className="file">
    <div className="row">
      <div className="name">{name}</div>
      <div className="createDate">{createDate}</div>
      <div className="edit-file-button" onClick={ () => onFileEdit(id) }>
        <MdBuild/>
      </div>
    </div>
    <div className="file-description">{content}</div>
    <div className="drive-btn mt5" onClick={() => onFileOpen(url)}>{lang.buttons.goToDrive}</div>
  </div>
)};

File.propTypes={
  id: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  onFileOpen: PropTypes.func.isRequired,
  onFileEdit: PropTypes.func.isRequired,
  onFileEditDone: PropTypes.func.isRequired,
}
export default File;
