import React from "react";
import DateRangePicker from "react-daterange-picker"
import moment from "moment"
import momentRange from "moment-range"
import "../../../../node_modules/react-daterange-picker/dist/css/react-calendar.css";

export default class TimePeriod extends React.Component {
  constructor() {
    super();
    this.state = {value: moment()};
    //this.state.value = new Date(2016, 11, 1);
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
  }
  render() {
    return (
      <div>
        <DateRangePicker
          firstOfWeek={1}
          numberOfCalendars={1}
          selectionType='range'
          onSelect={this.handleSelect.bind(this)}
        />
      <div class="well well-sm">{this.state.fullRangeString}</div>
      </div>
     );
  }
}
