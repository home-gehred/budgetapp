import React from "react";
import { connect } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import moment from "moment";
import { fetchExpenses } from "../../actions/ExpenseActions";

class Expenses extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchExpenses());
  }

  render() {
    if (this.props.expenses.fetching) {
      return null;
    } else {
      if (this.props.expenses.fetched) {
        const ExpenseComponent = this.props.expenses.expenses.map((expense) => {
          var parsedDate = moment(expense.duedate, "YYYY-MM-DD");
          var dueDateformatted = parsedDate.format("MMM Do YYYY");
          var dueDateUnformatted = (expense.dueDateUnformatted === undefined) ? expense.duedate: expense.dueDateUnformatted;
          var expenseInclude = false;
          if (this.props.timePeriod !== undefined) {
            expenseInclude = (this.props.timePeriod.value !== undefined) ? this.props.timePeriod.value.contains(parsedDate) : expense.include;
          }
          return <ExpenseItem
             key={expense.id}
             name={expense.name}
             expenseId={expense.id}
             amount={expense.amount}
             include={expenseInclude}
             duedate={dueDateformatted}
             dueDateUnformatted={dueDateUnformatted}
             isSelectedForUpdate={expense.isSelectedForUpdate}
             isEditMode={expense.isEditMode}
             userInputErrorMessage={expense.userInputErrorMessage}
             groupId={expense.groupid}/>
        });
        return <div class="list-group checked-list-box">
          {ExpenseComponent}
        </div>
      } else {
        return <div>You gots an error dog!</div>
      }
    }
  }
};

export default connect((store) => {
  return {
    timePeriod: store.timeperiod,
    expenses: store.expenses
  };
})(Expenses);
