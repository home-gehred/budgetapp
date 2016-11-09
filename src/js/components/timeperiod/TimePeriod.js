import React from "react";
import DateRangePicker from "react-daterange-picker"
import moment from "moment"
import momentRange from "moment-range"
import "../../../../node_modules/react-daterange-picker/dist/css/react-calendar.css";
import * as TimePeriodActions from "../../actions/TimePeriodActions"

export default class TimePeriod extends React.Component {
  constructor() {
    super();
    this.state = {value: moment.range([moment(), moment()])};
  }

  handleSelect(range) {
    console.log(range);
    console.log(range.start)
    // range is a moment-range object
    this.setState({
      value: range,
      startString: range.start.format("MMM Do YYYY"),
      endString: range.end.format("MMM Do YYYY"),
      fullRangeString: range.start.format("MMM Do YYYY") + " to " + range.end.format("MMM Do YYYY")
    });
    TimePeriodActions.createTimePeriod(range);
  }
  render() {
    return (
      <div>
        <DateRangePicker
          firstOfWeek={1}
          numberOfCalendars={1}
          selectionType='range'
          onSelect={this.handleSelect.bind(this)}
          value={this.state.value}
        />
      <div class="well well-sm">{this.state.fullRangeString}</div>
      </div>
     );
  }
}
