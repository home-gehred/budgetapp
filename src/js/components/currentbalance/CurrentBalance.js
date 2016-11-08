import React from "react";
import moment from "moment";
import TimePeriodStore from "../../Stores/TimePeriodStore"

export default class CurrentBalance extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBalance: 1500.32,
      currentBalanceDateString: moment().format("MMM Do YYYY"),
      predictedBalance: undefined,
      predictedBalanceDateString: undefined
    }
  }

  componentWillMount() {
    TimePeriodStore.on("setpredicteddate", (range) => {
      this.setState({
        predictedBalanceDateString: range.end.format("MMM Do YYYY")
      });
    });
  }

  changeCurrentBalance(e) {
    this.setState({
      currentBalance: e.target.value
    });
  }

  render() {
    return (
      <div class="currentbalance-component">
      <h5>Current Balance</h5>
      <div class="input-group">
        <span class="input-group-addon">{this.state.currentBalanceDateString}</span>
        <input type="number" class="form-control" defaultValue={this.state.currentBalance} onChange={this.changeCurrentBalance.bind(this)}/>
      </div>
      <h5>Predicted Balance</h5>
      <div class="input-group">
        <span class="input-group-addon">{this.state.predictedBalanceDateString}</span>
        <input type="text" class="form-control" defaultValue={this.state.predictedBalanceDateString}/>
      </div>
      </div>
    );
  }
}
