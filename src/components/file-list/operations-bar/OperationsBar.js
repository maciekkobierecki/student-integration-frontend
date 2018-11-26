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
    debugger;
    const {criteria, onFileCreate, onFileUpload, onSearch} = this.props;
    const searchValue = this.refs.criteria ? this.refs.criteria.value : null;
    return (
      <div>
        <div className="operations-bar">
          <div className="operation" onClick={onFileCreate}>{OPERTAION.CREATE_DOC}</div>
          <div className="operation" onClick={onFileUpload}>{OPERTAION.ADD_FILE}</div>
          <div className="search-form">
            <form onSubmit={ (e) => onSearch(e, searchValue)}>
              <label>
                <input type="text" name="name" ref="criteria" defaultValue={criteria} />
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
  criteria: PropTypes.string.isRequired,
  onFileCreate: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default OperationsBar;
