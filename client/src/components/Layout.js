import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import AppBody from "./AppBody";
import Footer from "./Footer";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <AppBody />
        <Footer />
      </div>
    );
  }
}
