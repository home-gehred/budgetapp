import moment from "moment"
import momentRange from "moment-range"

const initialState = {
  expenses: [],
  expensesDue: 0,
  fetching: false,
  fetched: false,
  error: null,
};
export default function expenseReducer(state=initialState, actions) {
  switch (actions.type)
  {
    case "EXPENSES_PENDING": {
      return {...state, fetching: true};
      break;
    }
    case "EXPENSES_FULFILLED": {
      return {...state,
        fetching: false,
        fetched: true,
        expenses: actions.payload.data
      };
      break;
    }
    case "EXPENSES_REJECTED": {
      return {...state,
        fetching: false,
        fetched: false,
        error: actions.payload
      };
      break;
    }
    case "TIMEPERIOD_CHANGE": {
      var timePeriod = actions.payload;
      var totalDue = 0;
      var updatedExpenses = state.expenses.map((expense) => {
        var dueDate = moment(expense.duedate, "YYYY-MM-DD");
        expense.include = (timePeriod === undefined) ? false: timePeriod.contains(dueDate);
        if (expense.include) {
          totalDue += expense.amount;
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses,
        expensesDue: totalDue
      };
    };
    break;
  }
  return state;
};