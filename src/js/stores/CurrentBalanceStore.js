import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";

class CurrentBalance extends EventEmitter {
  constructor() {
    super();
  }
  handleDispatchAction (action) {
    console.log("currentBalanceStore received: ", action);
    switch (action.type) {
      case "EXPENSES_DUE_CHANGE": {
        this.emit("expensesduechange", action.timeperiod, action.amountDue);
        break;
      }
    };
  }
}

const currentBalanceStore = new CurrentBalance;
dispatcher.register(currentBalanceStore.handleDispatchAction.bind(currentBalanceStore));
export default currentBalanceStore
