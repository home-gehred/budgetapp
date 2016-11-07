import dispatcher from "../dispatcher";

export function createExpense(name, amount) {
    dispatcher.dispatch({
      type: "CREATE_EXPENSE",
      name,
      amount
    });
}

export function fetchExpenses() {
  dispatcher.dispatch({
    type: "FETCHING_EXPENSES",
    expenses: []
  });
  setTimeout(function () {
    var expenses = [
      {
        id: 1,
        name: "Gas/Electric",
        amount: 280.67
      },
      {
        id: 2,
        name: "Max Education",
        amount: 240.00
      },
      {
        id: 3,
        name: "Charlotte Education",
        amount: 240.00
      },
      {
        id: 4,
        name: "WaterBill",
        amount: 275.23
      }
    ];
    dispatcher.dispatch({
      type: "FETCH_EXPENSES",
      expenses: expenses
    });
  }, 5000);
}
