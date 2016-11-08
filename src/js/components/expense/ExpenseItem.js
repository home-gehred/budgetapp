import React from "react";
import { ListGroupItem } from 'react-bootstrap';

export default class ExpenseItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("ExpenseItem Props: ", this.props);
    var classForItem = (this.props.include) ? "list-group-item list-group-item-success" : "list-group-item";
    return (
      <div>
        <a href="#" class={classForItem}>
          <h4 class="list-group-item-heading">{this.props.name}</h4>
          <p class="list-group-item-text">${this.props.amount}</p>
          <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
        </a>
      </div>
    );
  }
}
