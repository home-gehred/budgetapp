import dispatcher from "../dispatcher";

export function createTimePeriod(range) {
    dispatcher.dispatch({
      type: "CREATE_TIMEPERIOD",
      range
    });
}
