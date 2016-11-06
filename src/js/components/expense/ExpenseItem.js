import React from "react";
import { ListGroupItem } from 'react-bootstrap';

export default class ExpenseItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <a href="#" class="list-group-item">
          <h4 class="list-group-item-heading">{this.props.name}</h4>
          <p class="list-group-item-text">${this.props.amount}</p>
        </a>
      </div>
    );
  }
}
