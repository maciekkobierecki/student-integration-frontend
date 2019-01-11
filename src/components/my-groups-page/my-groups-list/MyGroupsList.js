import React from 'react';
import * as actions from "../../../actions/myGroupsListActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import Group from './group/Group';
import './MyGroupsList.css';

import {withRouter} from "react-router-dom";


class MyGroupsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGroups();
  }


  render() {
    let groups = this.props.groups;
    if(!groups.length){
      return(
        <div className="alert alert-primary">
          Nie należysz do żadnej grupy! Utwórz grupę lub dołącz do istniejącej poprzez kliknięcie w link rekrutacyjny!
        </div>
      )
    }
    return (
      <div>
        <ul className="list-group list-group-flush">
          {this.props.groups.map(function (listValue) {
            return <Group key={listValue.id} group={listValue}/>
          })}
        </ul>
      </div>
    )
  }
}

MyGroupsList.propTypes = {
  groups: PropTypes.array.isRequired,
  fetchGroups: PropTypes.func
};

const mapStateToProps = (state) => {
  const {myGroups} = state.myStudies;
  return {
    groups: myGroups
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchGroups: () => dispatch(actions.fetchMyGroups())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyGroupsList));
