import React from "react";
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

  render() {
    if (this.props.expenses.fetching) {
      return <ReactSpinner config={this.spinnerConfig}/>
    } else {
      if (this.props.expenses.fetched) {
        const ExpenseComponent = this.props.expenses.expenses.map((expense) => {
          var parsedDate = moment(expense.duedate, "YYYY-MM-DD");
          var duedateformatted = parsedDate.format("MMM Do YYYY");
          return <ExpenseItem key={expense.id} name={expense.name} amount={expense.amount} include={expense.include} duedate={duedateformatted}/>
        });
        return <div class="list-group">
          {ExpenseComponent}
        </div>
      } else {
        return <div>You gots an error dog!</div>
      }
    }
  }
};
