import React from "react";

import ExpenseItem from "./ExpenseItem"

export default class Expenses extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul>
        <ExpenseItem/>
      </ul>
    );
  }
}
