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
    }
    case "EXPENSES_FULFILLED": {
      return {...state,
        fetching: false,
        fetched: true,
        expenses: actions.payload.data
      };
    }
    case "EXPENSES_REJECTED": {
      return {...state,
        fetching: false,
        fetched: false,
        error: actions.payload
      };
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
    }
    case "EXPENSE_SELECTED_FOR_EDIT": {
      var expenseId = actions.payload.expenseId;
      var updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === expenseId) {
          if (expense.isEditMode === true) {
            expense.isEditMode = false;
          } else {
            expense.isEditMode = true;
          }
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses
      };
    }
    case "EXPENSE_USER_INPUT_ERROR": {
      var expenseId = actions.payload.expenseId;
      var updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === expenseId) {
          expense.userInputErrorMessage = actions.payload.userInputErrorMessage;
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses
      };
    }
    case "EXPENSE_DUEDATE_CHANGE": {
      var expenseId = actions.payload.expenseId;
      var dueDateUnformatted = actions.payload.dueDateUnformatted;
      var updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === expenseId) {
            expense.dueDateUnformatted = dueDateUnformatted;
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses
      };
    }
    case "EXPENSE_AMOUNT_CHANGE": {
      var expenseId = actions.payload.expenseId;
      var amount = actions.payload.amount;
      var updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === expenseId) {
            expense.amount =  amount;
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses
      };
    }
    case "EXPENSE_SAVE_PENDING": {
      return {...state,
        saving: true,
        saved: false
      };
    }
    case "EXPENSE_SAVE_REJECTED": {
      return {...state,
        saving: false,
        saved: false,
        error: actions.payload
      };
    }
    case "EXPENSE_SAVE_FULFILLED": {
      var updatedExpenses = actions.payload.data.map((expense) => {
        return expense;
      });
      return {...state,
        expenses: updatedExpenses,
        saving: false,
        saved: true
      };
    }
  }
  return state;
};
