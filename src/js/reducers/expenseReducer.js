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
      return {...state,
        fetching: true,
        fetched: false};
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
    case "EXPENSE_SELECTED_FOR_UPDATE": {
      var expenseId = actions.payload.expenseId;
      var isSelected = actions.payload.isSelected;
      var updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === expenseId) {
          expense.isSelectedForUpdate = isSelected;
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses
      };
      break;
    }
    case "EXPENSE_UPDATE_DUEDATE_PENDING": {
      return {...state, fetching: true};
      break;
    }
    case "EXPENSE_UPDATE_DUEDATE_REJECTED": {
      return {...state,
              fetching: false,
              fetched: false,
              error: actions.payload };
      break;
    }
    case "EXPENSE_UPDATE_DUEDATE_FULFILLED": {
      return {...state,
              fetching: false,
              fetched: true,
              expenses: actions.payload.data };
      break;
    }

  }
  return state;
};
