import React from 'react';
import PropTypes from 'prop-types';
import { MdBuild, MdCheck } from 'react-icons/md';
import { lang } from '../../../constants/translations';
import './File.css';


const File = ({file, editing, onFileOpen, onFileEdit, onFileEditDone}) => {
  if(editing){
      return (
        <div className="file edit">
          <div className="row">
            <div>
              <form onSubmit={(evt) => onFileEditDone(evt)}>
                <input className="file-edit-input orange" type="text" name="name" value={file.name} onChange={ (e) => onFileEdit({...file, name: e.target.value}) }/>
              </form>
            </div>
            <div className="createDate">{file.createDate}</div>
            <div className="edit-file-button" onClick={() => onFileEdit(file)}>
            </div>
          </div>
          <form onSubmit={(evt) => onFileEditDone(evt)}>
            <input className="file-edit-input max-width fs14" type="text" name="description" value={file.content} onChange={ (e) => onFileEdit({...file, content: e.target.value}) }/>
          </form>
          <div className="tr mr5 mt5">
            <MdCheck className="apply-button" onClick={() => onFileEditDone()}/>
          </div>
        </div>);
    }
    return (
      <div className="file">
        <div className="row">
          <div className="name">{file.name}</div>
          <div className="createDate">{file.createDate}</div>
          <div className="edit-file-button" onClick={() => onFileEdit(file)}>
            <MdBuild/>
          </div>
        </div>
        <div className="file-description">{file.content}</div>
        <div className="drive-btn mt5" onClick={() => onFileOpen(file.url)}>{lang.buttons.goToDrive}</div>
      </div>
    )
  };

File.propTypes={
  file: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  onFileOpen: PropTypes.func.isRequired,
  onFileEdit: PropTypes.func.isRequired,
  onFileEditDone: PropTypes.func.isRequired,
}
export default File;
