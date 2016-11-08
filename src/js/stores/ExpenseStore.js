import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";

class Expenses extends EventEmitter {
  constructor() {
    super();
    this.expenses = [
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
        name: "WaterBill",
        amount: 275.23,
        duedate: "2016-11-28"
      }
    ];
  }

  createExpense(name, amount) {
    this.expenses.push({
      id: Date.now(),
      name,
      amount,
    });
    this.emit("change");
  }

  getAll () {
    return this.expenses;
  }

  handleDispatchAction (action) {
    console.log("ExpenseStore received: ", action);
    switch (action.type) {
      case "CREATE_EXPENSE": {
        this.createExpense(action.name, action.amount);
        break;
      }
      case "FETCHING_EXPENSES": {
        this.emit("fetching_expenses");
        break;
      }
      case "FETCH_EXPENSES": {
        this.expenses = action.expenses;
        this.emit("change");
        break;
      }
    }
  }
}

const expenseStore = new Expenses;
dispatcher.register(expenseStore.handleDispatchAction.bind(expenseStore));
export default expenseStore;
