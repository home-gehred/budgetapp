import React from "react";
import moment from "moment";
import momentRange from "moment-range"
/*import CurrentBalanceStore from "../../Stores/CurrentBalanceStore";*/
import { connect } from "react-redux";
import { currentBalanceChanging, currentBalanceChanged, fetchBalance} from "../../actions/CurrentBalanceActions"
import * as Accounting from "../../accounting.js";

@connect((store) => {
  return {
    expenses: store.expenses,
    currentBalance: store.currentBalance,
    timePeriod: store.timeperiod
  };
})
export default class CurrentBalance extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(fetchBalance());
  }

  changeCurrentBalance(e) {
    this.props.dispatch(currentBalanceChanging(e.target.value));
  }

  formatCurrentBalance(e) {
    var balance = Accounting.unformat(e.target.value);
    this.props.dispatch(currentBalanceChanged(this.props.timePeriod.value, balance));
  }

  render() {
    var style = {
      "padding": "6px 12px",
      "fontSize": "14px",
      "fontWeight": "normal",
      "lineHeight": "1",
      "color": "#555",
      "textAlign": "center",
      "backgroundColor": "#eee",
      "border": "1px solid #ccc",
      "borderRadius": "4px",
      "display": "table-cell",
      "verticalAlign": "middle",
      "width": "1%",
      "whiteSpace": "nowrap",
      "verticalAlign": "middle",
      "borderTopRightRadius": "0",
      "borderBottomRightRadius": "0"
    };
    var formControl = {
      "display": "block",
      "height": "34px",
      "padding": "6px 12px",
      "fontSize": "14px",
      "lineHeight": "1.42857143",
      "color": "#555",
      "backgroundColor": "#fff",
      "backgroundImage": "none",
      "border": "1px solid #ccc",
      "borderRadius": "4px",
      "borderTopLeftRadius": "0",
      "borderBottomLeftRadius": "0"
    };
    var groupStyle = {
      "width": "100%",
      "position": "relative",
      "display": "table",
      "borderCollapse": "separate"
    };
    var balance = this.props.currentBalance;

    // TODO: Gehred thinks this is way to much business logic in render code.
    var expensesDue = 0;
    if (this.props.timePeriod !== undefined) {
      this.props.expenses.expenses.forEach((expense) => {
        var dueDate = moment(expense.duedate, "YYYY-MM-DD", true);
        if (this.props.timePeriod.value.contains(dueDate)) {
          expensesDue += expense.amount;
        }
      });
    }
    // End rant

    var expenseDueFormated = Accounting.formatMoney(expensesDue);
    var totalDue = Accounting.formatMoney((Accounting.unformat(balance.currentBalanceFormated) - expensesDue));
    return (
      <div class="currentbalance-component">
        <h5>Current Balance</h5>
        <div class="input-group">
          <span class="input-group-addon">{balance.currentBalanceDateString}</span>
          <input type="text" class="form-control" value={balance.currentBalance} onChange={this.changeCurrentBalance.bind(this)} onBlur={this.formatCurrentBalance.bind(this)}/>
        </div>
        <h5>Predicted Balance</h5>
        <div style={groupStyle}>
          <span style={style}>{balance.predictedBalanceDateString}</span>
          <span style={formControl}>{balance.currentBalanceFormated} - {expenseDueFormated} = {totalDue}</span>
        </div>
      </div>
    );
  }
}
