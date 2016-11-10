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
          amount: 280.67,
          duedate: "2016-11-22"
        },
        {
          id: 2,
          name: "Max Education",
          amount: 240.00,
          duedate: "2016-11-5"
        },
        {
          id: 3,
          name: "Holy Family Church",
          amount: 65.00,
          duedate: "2016-11-17"
        },
        {
          id: 4,
          name: "Charlotte Education",
          amount: 240.00,
          duedate: "2016-11-5"
        },
        {
          id: 5,
          name: "WaterBill",
          amount: 275.23,
          duedate: "2016-11-28"
        }
    ];
    dispatcher.dispatch({
      type: "FETCH_EXPENSES",
      expenses: expenses
    });
  }, 5000);
}

export function expensesDueChange(timeperiod, amountDue) {
  dispatcher.dispatch({
    type: "EXPENSES_DUE_CHANGE",
    timeperiod,
    amountDue
  });
}
