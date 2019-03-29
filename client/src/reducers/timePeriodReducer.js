import moment from "moment"
import momentRange from "moment-range"

const initialState = {
  value: moment.range([moment(), moment()])
};

export default function timePeriodReducer(state=initialState, actions) {
  var range = actions.payload;
  switch (actions.type)
  {
    case "TIMEPERIOD_CHANGE": {
      return {...state,
        value: range,
        startString: range.start.format("MMM Do YYYY"),
        endString: range.end.format("MMM Do YYYY"),
        fullRangeString: range.start.format("MMM Do YYYY") + " to " + range.end.format("MMM Do YYYY")
      };
      break;
    }
  }
  return state;
};
