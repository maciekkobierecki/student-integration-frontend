import React from 'react';
import * as actions from "../../../actions/recruitmentActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import './ExploreComponet.css';
import {withRouter} from "react-router-dom";


class ExploreComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="input-group mb-3 p-2 pt-4">
          <input type="text" className="form-control"
                 placeholder="Wyszukaj przedmiot wpisz nazwę uczelni, nazwę przedmiotu"
                 aria-describedby="button-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Wyszukaj</button>
          </div>
        </div>
        <div>
          <div className='row'>

          </div>
        </div>
      </div>
    )
  }
}

ExploreComponent.propTypes = {
  sth: PropTypes.object
};

const mapStateToProps = (state) => {
  const {success, loading, failure} = state.groupRecruitment.groupEnter;
  return {
    success: success,
    loading: loading,
    failure: failure
  };
}


const mapDispatchToProps = (dispatch) => ({
    enterToGroup: (actionHash) => dispatch(actions.enterToGroup(actionHash)),
    enterToGroupClear: () => dispatch(actions.enterToGroupClear())
  })
;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreComponent));
