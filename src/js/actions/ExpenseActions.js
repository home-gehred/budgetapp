import axios from "axios";
import moment from "moment";


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

export function expenseSelectedForUpdate(expenseSelection) {
  return {
    type: "EXPENSE_SELECTED_FOR_UPDATE",
    payload: expenseSelection
  }
}

export function expenseUpdateDueDate(expenseDueDateUpdate) {
  return {
    type: "EXPENSE_UPDATE_DUEDATE",
    payload: axios.post("http://localhost:3000/expenses", expenseDueDateUpdate)
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
  if (isNaN(Number.parseInt(userInput))) {
    hasError = true,
    message = "Amount has to be a valid number."
  }
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
