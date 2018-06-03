'use strict';
import React from "react";
import ReactDOM from "react-dom";

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.amount+":"+this.props.item;
  }
}

export default Ingredient;
