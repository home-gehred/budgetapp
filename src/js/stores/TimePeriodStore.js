import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";

class TimePeriod extends EventEmitter {
  constructor() {
    super();
  }

  setPredictedDate(range) {
    this.emit("setpredicteddate", range);
  }

  handleDispatchAction (action) {
    console.log("Time Period Store received action: ", action);
    switch (action.type) {
      case "CREATE_TIMEPERIOD": {
        this.setPredictedDate(action.range);
        break;
      }
    }
  }
}

const timePeriodStore = new TimePeriod;
dispatcher.register(timePeriodStore.handleDispatchAction.bind(timePeriodStore));
export default timePeriodStore;
