import React from "react";
import DateRangePicker from "react-daterange-picker"
import { connect } from "react-redux";
import "../../../node_modules/react-daterange-picker/dist/css/react-calendar.css";
import { timePeriodChange } from "../../actions/TimePeriodActions";
import { currentBalanceChanged } from "../../actions/CurrentBalanceActions";
import { timePeriodChangeUpdateAccountBuffer } from "../../actions/ExpenseActions";

/*@connect((store) => {
  return {
    timeperiod: store.timeperiod,
    expenses: store.expenses
  };
})*/
class TimePeriod extends React.Component {
  constructor() {
    super();
  }

  handleSelect(range) {
    this.props.dispatch(timePeriodChange(range));
    this.props.dispatch(currentBalanceChanged(range));
    this.props.dispatch(timePeriodChangeUpdateAccountBuffer({
      "range": range,
      expenses: this.props.expenses
    }));
  }

  render() {
    return (
      <div>
        <DateRangePicker
          firstOfWeek={1}
          numberOfCalendars={1}
          selectionType='range'
          onSelect={this.handleSelect.bind(this)}
          value={this.props.timeperiod.value}
        />
        <div class="well well-sm">{this.props.timeperiod.fullRangeString}</div>
      </div>
     );
  }
};
export default connect((store) => {
  return {
    timeperiod: store.timeperiod,
    expenses: store.expenses
  };
})(TimePeriod);