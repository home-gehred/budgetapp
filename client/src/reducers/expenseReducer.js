import moment from "moment"

const initialState = {
  expenses: [],
  expensesDue: 0,
  fetching: false,
  fetched: false,
  error: null,
};
export default function expenseReducer(state=initialState, actions) {
  var updatedExpenses = {};
  var expenseId = {};
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
    case "ACCOUNTBUFFER_SAVE": {
      var timePeriod = actions.payload;
      var totalDue = 0;
      updatedExpenses = state.expenses.map((expense) => {
        var dueDate = undefined;
        var isBuffer = (expense.isbuffer === undefined) ? false : expense.isbuffer;
        if (isBuffer) {
          if (timePeriod !== undefined) {
            dueDate = timePeriod.end;
            expense.duedate = timePeriod.end.format("YYYY-MM-DD");
          }
        } else {
          dueDate = moment(expense.duedate, "YYYY-MM-DD");
        }

        expense.include = (timePeriod === undefined) ? false : timePeriod.contains(dueDate);
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
      expenseId = actions.payload.expenseId;
      updatedExpenses = state.expenses.map((expense) => {
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
      expenseId = actions.payload.expenseId;
      updatedExpenses = state.expenses.map((expense) => {
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
      expenseId = actions.payload.expenseId;
      var dueDateUnformatted = actions.payload.dueDateUnformatted;
      updatedExpenses = state.expenses.map((expense) => {
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
      expenseId = actions.payload.expenseId;
      var amount = actions.payload.amount;
      updatedExpenses = state.expenses.map((expense) => {
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
      updatedExpenses = actions.payload.data.map((expense) => {
        return expense;
      });
      return {...state,
        expenses: updatedExpenses,
        saving: false,
        saved: true
      };
    }
    case "GROUP_SAVE_FULFILLED": {
      updatedExpenses = state.expenses.map((expense) => {
        if (expense.groupid !== undefined) {
          if (expense.groupid === actions.payload.data.groupId)
          {
            expense.duedate = moment(actions.payload.data.duedate, "YYYY-MM-DD");
          }
        }
        return expense;
      });
      return {...state,
        expenses: updatedExpenses,
      };
    }
    default: {
      return {...state}
    }
  }
};
