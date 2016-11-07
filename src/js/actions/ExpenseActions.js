import dispatcher from "../dispatcher";

export function createExpense(name, amount) {
    dispatcher.dispatch({
      type: "CREATE_EXPENSE",
      name,
      amount
    })
}
