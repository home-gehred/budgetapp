import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import * as Accounting from "../../accounting.js";
import {
  expenseSelectedForEdit,
  expenseSelectedForSave,
  expenseDueDateChange,
  expenseAmountChange } from "../../actions/ExpenseActions"
import { connect } from "react-redux";

/*@connect((store) => {
  return {
    expenses: store.expenses
  };
})*/
class ExpenseItem extends React.Component {
  constructor() {
    super();
  }

  selectedForEdit(e) {
    this.props.dispatch(expenseSelectedForEdit({
      expenseId: this.props.expenseId
    }));
  }

  selectedForSave(e) {
    this.props.dispatch(expenseSelectedForSave({
      expenseId: this.props.expenseId,
      amount: parseFloat(this.props.amount, 10),
      dueDate: this.props.dueDateUnformatted
    }));
  }

  changeExpenseAmount(e) {
    this.props.dispatch(expenseAmountChange({
      expenseId: this.props.expenseId,
      amount: e.target.value
    }));
  }

  changeExpenseDueDateChange(e) {
    this.props.dispatch(expenseDueDateChange({
      expenseId: this.props.expenseId,
      dueDateUnformatted: e.target.value
    }));
  }

  render() {
    var errorMessageStyle = {color: "#a94442"};
    var formatedAmount = Accounting.formatMoney(this.props.amount);
    var classForItem = (this.props.include) ? "list-group-item list-group-item-success" : "list-group-item";
    var errorInfo = (this.props.userInputErrorMessage === undefined) ? {
        amount: {hasError:false},
        dueDate: {hasError:false}
      } : JSON.parse(this.props.userInputErrorMessage);
    var classForAmountFormGroup = (errorInfo.amount.hasError) ? "form-group has-error": "form-group";
    var classForDueDateFormGroup = (errorInfo.dueDate.hasError) ? "form-group has-error": "form-group";
    var classForAmountInput = (errorInfo.amount.hasError) ? "form-control has-error": "form-control";
    var classForDueDateInput = (errorInfo.dueDate.hasError) ? "form-control has-error": "form-control";
    var groupId = (this.props.groupId === undefined) ? "" : this.props.groupId;
    var classGroupIcon = "";
    switch (groupId)
    {
      case "discover":
        classGroupIcon = "glyphicon glyphicon-flash";
      break;
      default:
        classGroupIcon = undefined;
      break;
    }
    if (this.props.isEditMode) {
      return (
        <div ref="editExpense">
          <a class={classForItem}>
            <h4 class="list-group-item-heading">{this.props.name}</h4>
            <div class={classForAmountFormGroup}>
              <input type="text" class={classForAmountInput} value={this.props.amount} onChange={this.changeExpenseAmount.bind(this)}></input>
                <span id="dueDateErrorMsg" style={errorMessageStyle}>{errorInfo.amount.message}</span>
            </div>
            <div class={classForDueDateFormGroup}>
              <input type="text" class={classForDueDateInput} value={this.props.dueDateUnformatted} onChange={this.changeExpenseDueDateChange.bind(this)} aria-describedby="dueDateErrorMsg"/>
              <span id="dueDateErrorMsg" style={errorMessageStyle}>{errorInfo.dueDate.message}</span>
            </div>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.selectedForSave.bind(this)}>Save</button>
          </a>
        </div>
      );
    } else {
      if (groupId === "")
      {
        return (
          <div ref="expenses">
            <a class={classForItem} onClick={this.selectedForEdit.bind(this)}>
              <h4 class="list-group-item-heading">{this.props.name}</h4>
              <p class="list-group-item-text">{formatedAmount}</p>
              <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
            </a>
          </div>
        );

      } else {
        return (
          <div ref="expenses">
            <a class={classForItem} onClick={this.selectedForEdit.bind(this)}>
              <h4 class="list-group-item-heading"><span class={classGroupIcon} aria-hidden="true"></span>{this.props.name}</h4>
              <p class="list-group-item-text">{formatedAmount}</p>
              <p class="list-group-item-text"><b>Due Date:</b> <i>{this.props.duedate}</i></p>
            </a>
          </div>
        );
      }
    }
  }
}
export default connect()(ExpenseItem);