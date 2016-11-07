import React from "react";
import ReactSpinner from "react-spinjs";
import { ListGroup } from 'react-bootstrap';
import ExpenseItem from "./ExpenseItem"
import ExpenseStore from "../../Stores/ExpenseStore"
import * as ExpenseActions from "../../actions/ExpenseActions"

export default class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: ExpenseStore.getAll(),
      componentState: "load"
    }
    this.spinnerConfig = {
      opacity: 0,
      speed: 0.5,
      scale: 2,
      color: '#0349ba'
    };
  }

  componentWillMount() {
    ExpenseStore.on("change", () => {
      this.setState({
        expenses: ExpenseStore.getAll(),
        componentState: "load"
      })
    });

    ExpenseStore.on("fetching_expenses", () => {
      this.setState({
        expenses: [],
        componentState: "loading"
      })
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
    console.log(expenses);
    const ExpenseComponent = expenses.map((expense) => {
      return <ExpenseItem key={expense.id} name={expense.name} amount={expense.amount}/>
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
