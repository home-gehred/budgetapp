import React from "react";
import TimePeriod from "./timeperiod/TimePeriod"
import Expenses from "./expense/Expenses";
import CurrentBalance from "./currentbalance/CurrentBalance";

export default class AppBody extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <TimePeriod />
          <CurrentBalance />
          <Expenses />
        </div>
    );
  }
}
