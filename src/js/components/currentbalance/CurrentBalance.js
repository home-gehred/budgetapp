import React from "react";
import moment from "moment";
/*import CurrentBalanceStore from "../../Stores/CurrentBalanceStore";*/
import { connect } from "react-redux";
import { currentBalanceChanging, currentBalanceChanged} from "../../actions/CurrentBalanceActions"
import * as Accounting from "../../accounting.js";

@connect((store) => {
  return {
    expenses: store.expenses,
    currentBalance: store.currentBalance
  };
})
export default class CurrentBalance extends React.Component {
  constructor() {
    super();
/*    this.state = {
      currentBalance: Accounting.formatMoney(1500.32),
      currentBalanceFormated: Accounting.formatMoney(1500.32),
      currentBalanceDateString: moment().format("MMM Do YYYY"),
      expensesDue: Accounting.formatMoney(0.00),
      predictedBalance: Accounting.formatMoney(1500.32),
      predictedBalanceDateString: undefined

    }
*/
  }

  componentWillMount() {
/*    CurrentBalanceStore.on("expensesduechange", (range, amountDue) => {
      this.setState({
        predictedBalanceDateString: range.end.format("MMM Do YYYY"),
        expensesDue: Accounting.formatMoney(amountDue),
        predictedBalance: Accounting.formatMoney((Accounting.unformat(this.state.currentBalance) - amountDue))
      });
    });*/
  }

  changeCurrentBalance(e) {
    this.props.dispatch(currentBalanceChanging(e.target.value));
/*    var expensesDue = (this.state.expensesDue === undefined) ? 0 : Accounting.unformat(this.state.expensesDue);
    this.setState({
      currentBalance: e.target.value,
      currentBalanceFormated: Accounting.formatMoney(e.target.value),
      predictedBalance: Accounting.formatMoney((Accounting.unformat(e.target.value) - expensesDue))
    });*/
  }

  formatCurrentBalance(e) {
    this.props.dispatch(currentBalanceChanged(e.target.value));
/*    this.setState({
      currentBalance: Accounting.formatMoney(e.target.value)
    });*/
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
    var expensesDue = this.props.expenses.expensesDue;
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
