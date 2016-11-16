import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";
import timePeriodReducer from "./timePeriodReducer";
import currentBalanceReducer from "./currentBalanceReducer";

export default combineReducers({
  expenses: expenseReducer,
  timeperiod: timePeriodReducer,
  currentBalance: currentBalanceReducer
});
