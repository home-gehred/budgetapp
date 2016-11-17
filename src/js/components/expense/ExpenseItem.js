import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import * as Accounting from "../../accounting.js";
import {expenseSelectedForUpdate} from "../../actions/ExpenseActions"
import { connect } from "react-redux";

@connect((store) => {
  return {
    expenses: store.expenses,
  };
})
export default class ExpenseItem extends React.Component {
  constructor() {
    super();
  }
  selectedForUpdate(e) {
    this.props.dispatch(expenseSelectedForUpdate({
      expenseId: this.props.expenseId,
      isSelected: e.target.checked
    }));
  }

  render() {
    var formatedAmount = Accounting.formatMoney(this.props.amount);
    var classForItem = (this.props.include) ? "list-group-item list-group-item-success" : "list-group-item";
    return (
      <div ref="expenses">
        <a href="#" class={classForItem}>
          <input type="checkbox" onClick={this.selectedForUpdate.bind(this)}></input><h4 class="list-group-item-heading">{this.props.name}</h4>
          <p class="list-group-item-text">{formatedAmount}</p>
          <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
        </a>
      </div>
    );
  }
}
