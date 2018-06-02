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

export function groupClientDueDateChange(dueDateChange) {
  return {
    type: "GROUP_CLIENT_DUEDATE_CHANGING",
    payload: dueDateChange
  };
}

export function groupDueDateChange(institutionDueDateUpdate) {
  var institutionSaveEndpoint = "http://localhost:3000/groupupdateduedate";
  var errorInfo = {
    groupId: institutionDueDateUpdate.groupId,
    dueDate: ValidateDate(institutionDueDateUpdate.dueDate)
  }
  if (errorInfo.dueDate.hasError === false) {
    return {
      type: "GROUP_SAVE",
      payload: axios.post(institutionSaveEndpoint, institutionDueDateUpdate)
    };
  } else {
    return {
      type: "GROUP_CLIENT_UPDATE_ERROR",
      payload: {...institutionDueDateUpdate,
        userInputErrorMessage: JSON.stringify(errorInfo, null, null)
      }
    };
  }
}
