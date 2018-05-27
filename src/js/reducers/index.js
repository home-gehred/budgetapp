import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";
import timePeriodReducer from "./timePeriodReducer";
import currentBalanceReducer from "./currentBalanceReducer";
import discoverReducer from "./discoverReducer";

export default combineReducers({
  expenses: expenseReducer,
  timeperiod: timePeriodReducer,
  currentBalance: currentBalanceReducer,
  discoverReducer: discoverReducer
});
