import React from "react";
import moment from "moment";
import CurrentBalanceStore from "../../Stores/CurrentBalanceStore";

export default class CurrentBalance extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBalance: 1500.32,
      currentBalanceDateString: moment().format("MMM Do YYYY"),
      expensesDue: undefined,
      predictedBalance: undefined,
      predictedBalanceDateString: undefined

    }
  }

  componentWillMount() {
    CurrentBalanceStore.on("expensesduechange", (range, amountDue) => {
      this.setState({
        predictedBalanceDateString: range.end.format("MMM Do YYYY"),
        expensesDue: amountDue.toString(),
        predictedBalance: (this.state.currentBalance - amountDue).toString()
      });
    });
  }

  changeCurrentBalance(e) {
    this.setState({
      currentBalance: e.target.value
    });
  }

  changePredictedBalance(e) {

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
    return (
      <div class="currentbalance-component">
        <h5>Current Balance</h5>
        <div class="input-group">
          <span class="input-group-addon">{this.state.currentBalanceDateString}</span>
          <input type="number" class="form-control" defaultValue={this.state.currentBalance} onChange={this.changeCurrentBalance.bind(this)}/>
        </div>
        <h5>Predicted Balance</h5>
        <div style={groupStyle}>
          <span style={style}>{this.state.predictedBalanceDateString}</span>
          <span style={formControl}>{this.state.currentBalance} - {this.state.expensesDue} = {this.state.predictedBalance}</span>
        </div>
      </div>
    );
  }
}
