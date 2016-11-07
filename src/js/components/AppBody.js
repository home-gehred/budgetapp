import React from "react";
import TimePeriod from "./timeperiod/TimePeriod"
import Expenses from "./expense/Expenses";

export default class AppBody extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <TimePeriod />
          <Expenses />
        </div>
    );
  }
}
