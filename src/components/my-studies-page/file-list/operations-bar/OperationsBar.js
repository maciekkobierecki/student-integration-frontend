import React from 'react';

import './OperationsBar.css';
import PropTypes from 'prop-types';


const OPERTAION = {
  CREATE_DOC: 'Utwórz dokument',
  ADD_FILE: 'Dodaj plik'
}

class OperationsBar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {criteria, onFileCreate, onFileUpload, onSearch} = this.props;
    const searchValue = null;
    return (
      <div>
        <div className="container operations-bar">
          <div>
            <div className="row form-group">
              <div className="col-6">
                <div className="btn-group">
                  <div className="btn btn-outline-secondary" onClick={() => onFileCreate()}>{OPERTAION.CREATE_DOC}</div>
                  <div className="btn btn-outline-secondary" onClick={() => onFileUpload()}>{OPERTAION.ADD_FILE}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input type="text" className="form-control" name="name" defaultValue={criteria}/>
                  <div className="input-group-append">
                    <div className="btn btn-outline-secondary" onClick={() => onSearch()}>Szukaj</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

OperationsBar.propTypes = {
  criteria: PropTypes.string.isRequired,
  onFileCreate: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default OperationsBar;
