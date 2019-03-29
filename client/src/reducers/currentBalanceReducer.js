import moment from "moment"
import momentRange from "moment-range"
import * as Accounting from "../accounting.js";

const initialState = {
  currentBalance: Accounting.formatMoney(0),
  currentBalanceFormated: Accounting.formatMoney(0),
  currentBalanceDateString: moment().format("MMM Do YYYY"),
  expensesDue: Accounting.formatMoney(0.00),
  predictedBalance: Accounting.formatMoney(0),
  predictedBalanceDateString: undefined,
  fetching: false,
  fetched: false,
  error: {}
};

export default function currentBalanceReducer(state=initialState, actions) {
  var expensesDue = state.expensesDue;
  switch (actions.type)
  {
    case "CURRENT_BALANCE_CHANGING": {
      return {...state,
        currentBalance: actions.payload
      };
    }
    /*case "CURRENT_BALANCE_CHANGED": {
      return {...state,
        currentBalance: Accounting.formatMoney(actions.payload.balance),
        currentBalanceFormated: Accounting.formatMoney(actions.payload.balance),
        predictedBalance: Accounting.formatMoney(Accounting.unformat(actions.payload.balance) - Accounting.unformat(expensesDue))
      };
    }*/
    case "BALANCE_SAVE_PENDING": {
      return {...state,
        saving: true,
        saved: false,
        saveError: {}
      };
    }
    case "BALANCE_SAVE_REJECTED": {
      return {...state,
        saving: false,
        saved: false,
        saveError: actions.payload
      };
    }
    case "BALANCE_SAVE_FULFILLED": {
      var balanceInfo = actions.payload.data;
      var currentBalanceDate = moment(balanceInfo.date, "YYYY-MM-DD");

      return {...state,
        saving: false,
        saved: true,
        saveError: {},
        currentBalance: Accounting.formatMoney(balanceInfo.currentBalance),
        currentBalanceFormated: Accounting.formatMoney(balanceInfo.currentBalance),
        predictedBalance: Accounting.formatMoney(balanceInfo.currentBalance - Accounting.unformat(expensesDue)),
        currentBalanceDateString: currentBalanceDate.format("MMM Do YYYY")
      };
    }
    case "TIMEPERIOD_CHANGE": {
      return {...state,
        currentBalanceDateString: actions.payload.start.format("MMM Do YYYY"),
        predictedBalanceDateString: actions.payload.end.format("MMM Do YYYY")
      };
    }
    case "BALANCE_PENDING": {
      return {...state,
          fetching: true,
          fetched: false,
          error: {}
        };
    }
    case "BALANCE_REJECTED": {
      return {...state,
          fetching: false,
          fetched: false,
          error: actions.payload
        };
    }
    case "BALANCE_FULFILLED": {
      var balanceInfo = actions.payload.data;
      var currentBalanceDate = moment(balanceInfo.date, "YYYY-MM-DD");
      return {...state,
        fetching: false,
        fetched: true,
        currentBalance: Accounting.formatMoney(balanceInfo.currentBalance),
        currentBalanceFormated: Accounting.formatMoney(balanceInfo.currentBalance),
        currentBalanceDateString: currentBalanceDate.format("MMM Do YYYY")
      }
    }
  }
  return state;
};
