import moment from "moment"
import momentRange from "moment-range"
import * as Accounting from "../accounting.js";

const initialState = {
  currentBalance: Accounting.formatMoney(1500.32),
  currentBalanceFormated: Accounting.formatMoney(1500.32),
  currentBalanceDateString: moment().format("MMM Do YYYY"),
  expensesDue: Accounting.formatMoney(0.00),
  predictedBalance: Accounting.formatMoney(1500.32),
  predictedBalanceDateString: undefined
};

export default function currentBalanceReducer(state=initialState, actions) {
  var expensesDue = state.expensesDue;
  switch (actions.type)
  {
    case "CURRENT_BALANCE_CHANGING": {
      return {...state,
        currentBalance: actions.payload
      };
      break;
    }
    case "CURRENT_BALANCE_CHANGED": {
      return {...state,
        currentBalance: Accounting.formatMoney(actions.payload),
        currentBalanceFormated: Accounting.formatMoney(actions.payload),
        predictedBalance: Accounting.formatMoney(Accounting.unformat(actions.payload) - Accounting.unformat(expensesDue))
      };
      break;
    }
    case "TIMEPERIOD_CHANGE": {
      return {...state,
        currentBalanceDateString: actions.payload.start.format("MMM Do YYYY"),
        predictedBalanceDateString: actions.payload.end.format("MMM Do YYYY")
      };
      break;
    }
  }
  return state;
};
