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
