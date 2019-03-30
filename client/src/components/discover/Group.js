import React from "react";
import { connect } from "react-redux";
import { groupDueDateChange, groupClientDueDateChange } from "../../actions/GroupActions"

class Group extends React.Component {
  dueDateChange(e) {
    this.props.dispatch(groupClientDueDateChange(e.target.value));
  }

  update(e) {
    this.props.dispatch(groupDueDateChange({
      groupId: "discover",
      dueDate: this.props.dueDateUnformatted
    }));

  }
//<span id="dueDateErrorMsg" style={errorMessageStyle}>{errorInfo.dueDate.message}</span>

  render() {
    var errorMessageStyle = {color: "#a94442"};
    var userErrorInfo = (this.props.userInputErrorMessage === undefined) ? {
        dueDate: {hasError:false}
      } : JSON.parse(this.props.userInputErrorMessage);
    var serverErrorInfo = (this.props.error === undefined) ? { serverError: {hasError: false}} : { serverError: {hasError: true, error: this.props.error}};
    var classForDueDateInput = (userErrorInfo.dueDate.hasError) || (serverErrorInfo.serverError.hasError) ? "input-group has-error": "input-group";
    var errorMessage = "";
    if (userErrorInfo.dueDate.hasError) {
      errorMessage = userErrorInfo.dueDate.message;
    }
    if (serverErrorInfo.serverError.hasError) {
      errorMessage = serverErrorInfo.serverError.error.message;
    }
    return (
      <div class="discover-component">
        <b>Update Discover account due date</b>
        <div class={classForDueDateInput}>
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onClick={this.update.bind(this)}>Update</button>
          </span>
          <input type="text" class="form-control" placeholder="YYYY-MM-DD" value={this.props.dueDateUnformatted} onChange={this.dueDateChange.bind(this)}/>
        </div>
        <span id="dueDateErrorMsg" style={errorMessageStyle}>{errorMessage}</span>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    groupId: "discover",
    dueDate: store.groupReducer.dueDate,
    dueDateUnformatted: store.groupReducer.dueDateUnformatted,
    userInputErrorMessage: store.groupReducer.userInputErrorMessage,
    error: store.groupReducer.error
  };
})(Group);