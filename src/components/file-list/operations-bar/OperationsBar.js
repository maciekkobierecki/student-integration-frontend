import React from 'react';

import './OperationsBar.css';
import PropTypes from 'prop-types';


const OPERTAION={
  CREATE_DOC : 'Utwórz dokument',
  ADD_FILE: 'Dodaj plik'
}

class OperationsBar extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <div className="operations-bar">
          <div className="operation">{OPERTAION.CREATE_DOC}</div>
          <div className="operation">{OPERTAION.ADD_FILE}</div>
          <div className="search-form">
            <form>
              <label>
                <input type="text" name="name" />
              </label>
              <div className="search-btn">
                szukaj
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

OperationsBar.propTypes = {
  onFileCreate: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default OperationsBar;
