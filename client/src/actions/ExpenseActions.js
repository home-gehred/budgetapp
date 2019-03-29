/* eslint-disable no-unused-expressions */
import axios from "axios";
import moment from "moment";
import _ from "underscore"

export function fetchExpenses() {
  return {
    type: "EXPENSES",
    payload: axios.get("http://localhost:3000/expenses")
  };
};

export function expensesDueChanged(amountDue) {
  return {
    type: "EXPENSES_CHANGED",
    payload: amountDue
  }
}

export function expenseSelectedForEdit(expenseSelection) {
  return {
    type: "EXPENSE_SELECTED_FOR_EDIT",
    payload: expenseSelection
  }
}

function ValidateAmount(userInput) {
  var hasError = false;
  var message = "";
  if (isNaN(Number.parseFloat(userInput)) === true) {
    hasError = true,
    message = "Amount has to be a valid number."
  };
  return {
      hasError: hasError,
      message: message
  };
}

function ValidateDate(userInput) {
  var hasError = (moment(userInput, "YYYY-MM-DD", true).isValid() === false);
  var message = (hasError) ?  "Due date has to be in YYYY-MM-DD format.":"";
  return {
      hasError: hasError,
      message: message
  };
}
/*
expenseId: this.props.expenseId,
amount: this.props.amount,
dueDate: this.props.duedate
*/
export function expenseSelectedForSave(expenseItemUpdate) {
  var expenseItemEndpoint = "http://localhost:3000/expenses/" + expenseItemUpdate.expenseId;
  var errorInfo = {
    amount: ValidateAmount(expenseItemUpdate.amount),
    dueDate: ValidateDate(expenseItemUpdate.dueDate)
  }

  if ((errorInfo.amount.hasError === false) &&
      (errorInfo.dueDate.hasError === false)) {
    return {
      type: "EXPENSE_SAVE",
      payload: axios.post(expenseItemEndpoint, expenseItemUpdate)
    }
  } else {
    return {
      type: "EXPENSE_USER_INPUT_ERROR",
      payload: {...expenseItemUpdate,
        userInputErrorMessage: JSON.stringify(errorInfo, null, null)
      }
    }
  }
}

export function expenseAmountChange(expenseSelection) {
  return {
    type: "EXPENSE_AMOUNT_CHANGE",
    payload: expenseSelection
  }
}

export function expenseDueDateChange(expenseDueDateChange) {
  return {
    type: "EXPENSE_DUEDATE_CHANGE",
    payload: expenseDueDateChange
  }
}

export function timePeriodChangeUpdateAccountBuffer(accountUpdateInfo) {
  var accountBuffers = accountUpdateInfo.expenses.expenses.filter((expense) => {
    if (expense.isbuffer !== undefined) {
      if (expense.isbuffer) {
        return expense;
      }
    }
  });
  var timePeriodRange = accountUpdateInfo.range;

  var promiseUpdates = accountBuffers.map((accountBuffer) => {
    var dueDate = timePeriodRange.end;
    accountBuffer.duedate = timePeriodRange.end.format("YYYY-MM-DD");
    accountBuffer.expenseId = accountBuffer.id;
    accountBuffer.dueDate = accountBuffer.duedate;
    var expenseItemEndpoint = "http://localhost:3000/expenses/" + accountBuffer.id;
    return axios.post(expenseItemEndpoint, accountBuffer);
  });

  var atleastOneSuccess = false;
  var errorCount = 0;

  axios.all(promiseUpdates)
  .then(function(responses) {
    _.every(responses, ((response) => {
      if (response.status === 200) {
        atleastOneSuccess = true;
      } else {
        errorCount++;
      }
    }));
  }).catch(function(error) {
    errorCount++;
  }).finally(function() {
    if (atleastOneSuccess) {
      return {
        type: "ACCOUNTBUFFER_SAVE",
        payload: timePeriodRange
      };
    } else {
      return {
        type: "ACCOUNTBUFFER_SAVE_ERROR",
        payload: {}
      }
    }

  });

  return {
    type: "ACCOUNTBUFFER_SAVE_PENDING",
    payload: {}
  }
}
