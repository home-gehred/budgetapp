import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import * as Accounting from "../../accounting.js";

export default class ExpenseItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    var formatedAmount = Accounting.formatMoney(this.props.amount);
    var classForItem = (this.props.include) ? "list-group-item list-group-item-success" : "list-group-item";
    return (
      <div>
        <a href="#" class={classForItem}>
          <h4 class="list-group-item-heading">{this.props.name}</h4>
          <p class="list-group-item-text">{formatedAmount}</p>
          <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
        </a>
      </div>
    );
  }
}
