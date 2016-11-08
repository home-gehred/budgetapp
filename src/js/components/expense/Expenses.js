import React from "react";
import ReactSpinner from "react-spinjs";
import { ListGroup } from 'react-bootstrap';
import ExpenseItem from "./ExpenseItem";
import ExpenseStore from "../../Stores/ExpenseStore";
import TimePeriodStore from "../../Stores/TimePeriodStore";
import * as ExpenseActions from "../../actions/ExpenseActions";
import moment from "moment";

export default class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: ExpenseStore.getAll(),
      componentState: "load",
      timePeriod: undefined
    }
    this.spinnerConfig = {
      opacity: 0,
      speed: 0.5,
      scale: 2,
      color: '#0349ba'
    };
  }

  applyTimePeriod() {
    var timePeriod = this.state.timePeriod;
    var updatedExpenses = this.state.expenses.map((expense) => {
      var dueDate = moment(expense.duedate, "YYYY-MM-DD");
      expense.include = (timePeriod === undefined) ? false: timePeriod.contains(dueDate);
      return expense;
    });
    this.setState({
      expenses: updatedExpenses
    })
  }

  componentWillMount() {
    ExpenseStore.on("change", () => {
      this.setState({
        expenses: ExpenseStore.getAll(),
        componentState: "load"
      });
      this.applyTimePeriod();
    });

    ExpenseStore.on("fetching_expenses", () => {
      this.setState({
        expenses: [],
        componentState: "loading"
      })
    });

    TimePeriodStore.on("setpredicteddate", (newTimePeriod) => {
      console.log("Expenses.EVENT newTimePeriod", newTimePeriod);
      this.setState({
        timePeriod: newTimePeriod
      });
      this.applyTimePeriod();
    });
  }

  fetchExpenses() {
    ExpenseActions.fetchExpenses();
  }

  render() {

    const { expenses } = this.state;
    var spinnerStyle = {
      "display": (this.state.componentState === "load") ? "none" : undefined
    };
    var expensesStyle = {
      "display": (this.state.componentState === "load") ? undefined : "none"
    }
    console.log("Expenses from state: ", expenses);
    const ExpenseComponent = expenses.map((expense) => {
      var parsedDate = moment(expense.duedate, "YYYY-MM-DD");
      var duedateformatted = parsedDate.format("MMM Do YYYY");
      return <ExpenseItem key={expense.id} name={expense.name} amount={expense.amount} include={expense.include} duedate={duedateformatted}/>
    });
    return (
      <div class="expenses-component">
        <div style={spinnerStyle}>
          <ReactSpinner config={this.spinnerConfig}/>
        </div>
        <div class="list-group">
          <button type="button" class="btn btn-primary" id={expenses.componentState} data-loading-text="<i class='fa fa-spinner fa-spin '></i> Loading Expenses" onClick={this.fetchExpenses.bind(this)}>Load Expenses</button>
          {ExpenseComponent}
        </div>
      </div>
    );
  }
}
