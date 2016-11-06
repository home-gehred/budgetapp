import React from "react";

export default class ExpenseItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li>
        <div><h5>expensename</h5><p>$100.00</p></div>
      </li>
    );
  }
}
