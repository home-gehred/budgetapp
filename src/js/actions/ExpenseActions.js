import axios from "axios";

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

/*
expenseId: this.props.expenseId,
amount: this.props.amount,
dueDate: this.props.duedate
*/
export function expenseSelectedForSave(expenseItemUpdate) {
  var expenseItemEndpoint = "http://localhost:3000/expenses/" + expenseItemUpdate.expenseId;
  return {
    type: "EXPENSE_SAVE",
    payload: axios.post(expenseItemEndpoint, expenseItemUpdate)
  }
}

export function expenseAmountChange(expenseSelection) {
  return {
    type: "EXPENSE_AMOUNT_CHANGE",
    payload: expenseSelection
  }
}
