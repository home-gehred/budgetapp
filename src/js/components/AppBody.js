import React from "react";

import Expenses from "./expense/Expenses";

export default class AppBody extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <Expenses />
        </div>
    );
  }
}
