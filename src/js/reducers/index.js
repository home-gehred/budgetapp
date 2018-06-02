import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";
import timePeriodReducer from "./timePeriodReducer";
import currentBalanceReducer from "./currentBalanceReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  expenses: expenseReducer,
  timeperiod: timePeriodReducer,
  currentBalance: currentBalanceReducer,
  groupReducer: groupReducer
});
