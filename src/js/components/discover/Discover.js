import React from "react";
import { connect } from "react-redux";
import { institutionDueDateChange, institutionClientDueDateChange } from "../../actions/DiscoverActions"

@connect((store) => {
  return {
    institution: "discover",
    dueDate: store.discoverReducer.dueDate,
    dueDateUnformatted: store.discoverReducer.dueDateUnformatted,
    userInputErrorMessage: store.discoverReducer.userInputErrorMessage
  };
})

export default class Discover extends React.Component {
  constructor() {
    super();
  }

  dueDateChange(e) {
    this.props.dispatch(institutionClientDueDateChange(e.target.value));
  }

  update(e) {
    this.props.dispatch(institutionDueDateChange({
      institution: "discover",
      dueDate: this.props.dueDateUnformatted
    }));
  }
//<span id="dueDateErrorMsg" style={errorMessageStyle}>{errorInfo.dueDate.message}</span>

  render() {
    var errorMessageStyle = {color: "#a94442"};
    var errorInfo = (this.props.userInputErrorMessage === undefined) ? {
        dueDate: {hasError:false}
      } : JSON.parse(this.props.userInputErrorMessage);
    var classForDueDateInput = (errorInfo.dueDate.hasError) ? "input-group has-error": "input-group";
    return (
      <div class="discover-component">
        <b>Update Discover account due date</b>
        <div class={classForDueDateInput}>
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onClick={this.update.bind(this)}>Update</button>
          </span>
          <input type="text" class="form-control" placeholder="YYYY-MM-DD" value={this.props.dueDateUnformatted} onChange={this.dueDateChange.bind(this)}/>
        </div>
        <span id="dueDateErrorMsg" style={errorMessageStyle}>{errorInfo.dueDate.message}</span>
      </div>
    );
  }
}
