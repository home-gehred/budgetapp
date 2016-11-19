import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import * as Accounting from "../../accounting.js";
import {
  expenseSelectedForUpdate,
  expenseSelectedForEdit,
  expenseSelectedForSave,
  expenseAmountChange } from "../../actions/ExpenseActions"
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
  selectedForEdit(e) {
    this.props.dispatch(expenseSelectedForEdit({
      expenseId: this.props.expenseId
    }));
  }
  selectedForSave(e) {
    this.props.dispatch(expenseSelectedForSave({
      expenseId: this.props.expenseId,
      amount: this.props.amount,
      dueDate: this.props.duedate
    }));
  }
  changeExpenseAmount(e) {
    this.props.dispatch(expenseAmountChange({
      expenseId: this.props.expenseId,
      amount: e.target.value
    }));
  }

  render() {
    var formatedAmount = Accounting.formatMoney(this.props.amount);
    var classForItem = (this.props.include) ? "list-group-item list-group-item-success" : "list-group-item";
    if (this.props.isEditMode) {
      return (
        <div ref="editExpense">
          <a href='#' class={classForItem}>
            <h4 class="list-group-item-heading">{this.props.name}</h4>
            <input type="text" value={this.props.amount} onChange={this.changeExpenseAmount.bind(this)}></input>
            <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.selectedForSave.bind(this)}>Save</button>
          </a>
        </div>
      );
    } else {
      return (
        <div ref="expenses">
          <a href="#" class={classForItem} onClick={this.selectedForEdit.bind(this)}>
            <input type="checkbox" onClick={this.selectedForUpdate.bind(this)}></input><h4 class="list-group-item-heading">{this.props.name}</h4>
            <p class="list-group-item-text">{formatedAmount}</p>
            <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
          </a>
        </div>
      );
    }
  }
}
