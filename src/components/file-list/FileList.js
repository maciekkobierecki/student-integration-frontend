import React from 'react';
import File from './File';
import {bindActionCreators} from "redux";
import * as actions from "../../actions/fuelSavingsActions";
import connect from "react-redux/es/connect/connect";
import {FuelSavingsPage} from "../containers/FuelSavingsPage";

export class FileList extends React.Component {
  constructor() {
    super();
    this.files = [{
      "id": 5,
      "date": "12-12-2018",
      "url": "https://docs.google.com/document/d/1B_FS5pPHQXtO1_Igt1QsXSiE1Mu_TOJI2GMhciwpkxA/edit?usp=sharing"
    }, {
      "id": 6,
      "date": "11-11-2011",
      "url": "https://docs.google.com/document/d/1B_FS5pPHQXtO1_Igt1QsXSiE1Mu_TOJI2GMhciwpkxA/edit?usp=sharing"
    }, {
      "id": 7,
      "date": "11-11-2011",
      "url": "https://docs.google.com/document/d/1B_FS5pPHQXtO1_Igt1QsXSiE1Mu_TOJI2GMhciwpkxA/edit?usp=sharing"
    }];
  }

  render() {
    return (
      <ul>
        {this.files.map(function (listValue) {
          return <File key={listValue.id} date={listValue.date} id={listValue.id} url={listValue.url}/>
        })}
      </ul>
    )
  }
}

function mapStateToProps(state) {
    return {
      fileList: state.fileList
    };
  }


function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }


  export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
