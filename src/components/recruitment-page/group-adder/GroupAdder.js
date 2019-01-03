import React from 'react';
import * as actions from "../../../actions/recruitmentActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import './GroupAdder.css';
import {withRouter} from "react-router-dom";


class GroupAdder extends React.Component {
  componentDidMount() {
    this.props.enterToGroup(this.props.match.params.hash);
  }

  componentWillUnmount() {
    this.props.enterToGroupClear();
  }


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

GroupAdder.propTypes = {
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
  enterToGroup: (actionHash) => dispatch(actions.enterToGroup(actionHash)),
  enterToGroupClear: () => dispatch(actions.enterToGroupClear())
})
;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAdder));
