import React from "react";
import { ListGroup } from 'react-bootstrap';
import ExpenseItem from "./ExpenseItem"

export default class Expenses extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="list-group">
        <ExpenseItem name="Gas/Electric" amount="185.76"/>
        <ExpenseItem name="Max Education" amount="200.00"/>
        <ExpenseItem name="Holy Family Church" amount="65.00"/>
      </div>
    );
  }
}
