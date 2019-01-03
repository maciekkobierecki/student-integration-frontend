import React from 'react';
import PropTypes from 'prop-types';
import {MdBuild, MdCheck, MdExpandLess, MdExpandMore} from 'react-icons/md';
import {lang} from '../../../../constants/translations';
import './File.css';


const File = ({file, editing, onFileOpen, onFileEdit, onFileEditDone}) => {
  if (editing) {
    return (
      <div className="container file">
        <div className="row">
          <div>
            <form onSubmit={(evt) => onFileEditDone(evt)}>
              <input className="file-edit-input" type="text" name="name" value={file.name}
                     onChange={(e) => onFileEdit({...file, name: e.target.value})}/>
            </form>
          </div>
          <div className="createDate">{file.createDate}</div>
          <div className="edit-file-button" onClick={() => onFileEdit(file)}>
          </div>
        </div>
        <form onSubmit={(evt) => onFileEditDone(evt)}>
          <input className="file-edit-input max-width fs14" type="text" name="description" value={file.description}
                 onChange={(e) => onFileEdit({...file, content: e.target.value})}/>
        </form>
        <div className="tr mr5 mt5">
          <MdCheck className="apply-button" onClick={() => onFileEditDone()}/>
        </div>
      </div>);
  }
  return (
    <div className="container file">
      <div className="row">
        <div className="col-11">
          <div className="container">
            <div className="row">
              <div className="name si-yellow">{file.name}</div>
              <div className="edit-file-button" onClick={() => onFileEdit(file)}>
                <MdBuild size={20}/>
              </div>
              <div className="createDate">{file.createDate}</div>
            </div>
            <div className="file-description">{file.description}</div>
            <div className="row">
              <div className="btn bg-light ml-auto mr-2"
                   onClick={() => onFileOpen(file.url)}>{lang.buttons.goToDrive}</div>
            </div>
          </div>
        </div>
        <div className="col-1">
          <div className="row">
            <div>
              <MdExpandLess className="text-green" size={30}/>
            </div>
            <div>
              50%
            </div>
            <div>
              <MdExpandMore className="text-red" size={30}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

File.propTypes = {
  file: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  onFileOpen: PropTypes.func.isRequired,
  onFileEdit: PropTypes.func.isRequired,
  onFileEditDone: PropTypes.func.isRequired,
}
export default File;
