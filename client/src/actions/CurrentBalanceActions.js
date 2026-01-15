import axios from "axios";

export function currentBalanceChanging(newBalance) {
  return {
    type: "CURRENT_BALANCE_CHANGING",
    payload: newBalance
  };
};

export function currentBalanceChanged(date, newBalance) {
  var transportDate = (date !== undefined) ? date.start.format("YYYY-MM-DD") : undefined;
  var transportBalance = (newBalance !== undefined) ? Number.parseFloat(newBalance) : undefined;
  return {
    type: "BALANCE_SAVE",
    payload: axios.post("/balance", {
      date: transportDate,
      balance: transportBalance
    })
  };
};

export function fetchBalance() {
  return {
    type: "BALANCE",
    payload: axios.get("/balance")
  };
};
