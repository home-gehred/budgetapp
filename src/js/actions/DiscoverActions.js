// TODO: rename DiscoverActions.js to GroupDueDateUpdateActions
// TODO: rename INSTITUTION_DUEDATE_CHANGING to GROUP_CLIENT_DUEDATE_CHANGING
// TODO: rename INSTITUTION_SAVE to GROUP_SAVE
// TODO: rename INSTITUTION_UPDATE_ERROR to GROUP_CLIENT_UPDATE_ERROR
import axios from "axios";
import moment from "moment";

function ValidateDate(userInput) {
  var hasError = (moment(userInput, "YYYY-MM-DD", true).isValid() === false);
  var message = (hasError) ?  "Due date has to be in YYYY-MM-DD format.":"";
  return {
      hasError: hasError,
      message: message
  };
}

export function institutionClientDueDateChange(dueDateChange) {
  return {
    type: "INSTITUTION_DUEDATE_CHANGING",
    payload: dueDateChange
  };
}

export function institutionDueDateChange(institutionDueDateUpdate) {
  var institutionSaveEndpoint = "http://localhost:3000/groupupdateduedate";
  var errorInfo = {
    institution: institutionDueDateUpdate.institution,
    dueDate: ValidateDate(institutionDueDateUpdate.dueDate)
  }
  if (errorInfo.dueDate.hasError === false) {
    return {
      type: "INSTITUTION_SAVE", /*INSTITUTION_UPDATE*/
      payload: axios.post(institutionSaveEndpoint, institutionDueDateUpdate)
    };
  } else {
    return {
      type: "INSTITUTION_UPDATE_ERROR",
      payload: {...institutionDueDateUpdate,
        userInputErrorMessage: JSON.stringify(errorInfo, null, null)
      }
    };
  }
}
