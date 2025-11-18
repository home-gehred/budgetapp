import React from "react";
import Header from "./Header";
import AppBody from "./AppBody";
import Footer from "./Footer";

export default class Layout extends React.Component {

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
