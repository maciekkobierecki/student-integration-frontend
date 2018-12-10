import React from "react";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileSearch = this.fileSearch.bind(this);
  }
  render(){
    return (
        <div>
          TU JESTEM
        </div>
    );
  }
}

CreateGroupForm.propTypes = {

};

const mapStateToProps = (state) => {
  const zmienne = state.fileList;
  return {
  };
}


const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupForm));
