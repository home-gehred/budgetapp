
export function currentBalanceChanging(newBalance) {
  return {
    type: "CURRENT_BALANCE_CHANGING",
    payload: newBalance
  };
};

export function currentBalanceChanged(newBalance) {
  return {
    type: "CURRENT_BALANCE_CHANGED",
    payload: newBalance
  };
};
