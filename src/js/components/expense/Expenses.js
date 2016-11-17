import React from "react";
import ReactDOM from "react-dom";
import ReactSpinner from "react-spinjs";
import { connect } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import moment from "moment";
import { fetchExpenses } from "../../actions/ExpenseActions";

@connect((store) => {
  return {
    expenses: store.expenses
  };
})
export default class Expenses extends React.Component {
  constructor() {
    super();
    this.spinnerConfig = {
      opacity: 0,
      speed: 0.5,
      scale: 2,
      color: '#0349ba'
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchExpenses());
  }

  handleUpdateExpenses(e) {
    var toUpdate = this.props.expenses.expenses.filter((expense) => {
      return (expense.isSelectedForUpdate === true)
    });
    console.log("Update Payload is ", toUpdate);
  }

  render() {
    if (this.props.expenses.fetching) {
      return <ReactSpinner config={this.spinnerConfig}/>
    } else {
      if (this.props.expenses.fetched) {
        const ExpenseComponent = this.props.expenses.expenses.map((expense) => {
          var parsedDate = moment(expense.duedate, "YYYY-MM-DD");
          var duedateformatted = parsedDate.format("MMM Do YYYY");
          return <ExpenseItem
             key={expense.id}
             name={expense.name}
             expenseId={expense.id}
             amount={expense.amount}
             include={expense.include}
             duedate={duedateformatted}
             isSelectedForUpdate={expense.isSelectedForUpdate}/>
        });
        return <div class="list-group checked-list-box">
          <button type="button" class="btn btn-primary btn-sm" onClick={this.handleUpdateExpenses.bind(this)}>Update Due Date</button>
          {ExpenseComponent}
        </div>
      } else {
        return <div>You gots an error dog!</div>
      }
    }
  }
};
