import React from "react";
import { ListGroup } from 'react-bootstrap';
import ExpenseItem from "./ExpenseItem"
import ExpenseStore from "../../Stores/ExpenseStore"
import * as ExpenseActions from "../../actions/ExpenseActions"

export default class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: ExpenseStore.getAll()
    }
  }

  componentWillMount() {
    ExpenseStore.on("change", () => {
      this.setState({
        expenses: ExpenseStore.getAll()
      })
    });
  }

  createExpense() {
    ExpenseActions.createExpense("name", 0);
  }

  render() {
    const { expenses } = this.state;
    console.log(expenses);
    const ExpenseComponent = expenses.map((expense) => {
      return <ExpenseItem key={expense.id} name={expense.name} amount={expense.amount}/>
    });
    return (
      <div class="list-group">
        <button type="button" class="btn btn-primary" onClick={this.createExpense.bind(this)}>Primary</button>
        {ExpenseComponent}
      </div>
    );
  }
}
