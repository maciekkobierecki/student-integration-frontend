import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import './ExploreList.css';


class ExploreList extends React.Component {
  render() {
    let groupName = this.props.groupName;
    return (
      <div>
        {this.props.loading && <div>Dodawanie do grupy...</div>}
        {this.props.success && <div className="alert alert-success" role="alert">
          Zostałeś dodany do grupy {groupName}.
        </div>}
        {this.props.failure && <div className="alert alert-danger" role="alert">
          Dodawanie do grupy zakończone niepowodzeniem! Spróbuj odświeżyć stronę.
        </div>}
      </div>
    )
  }
}

ExploreList.propTypes = {
  success: PropTypes.bool,
  loading: PropTypes.bool,
  failure: PropTypes.bool,
  groupName: PropTypes.string,
  enterToGroup: PropTypes.func.isRequired,
  enterToGroupClear: PropTypes.func.isRequired
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
    enterToGroup: () => dispatch(null)
  })
;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreList));
