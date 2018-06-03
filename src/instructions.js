'use strict';
import React from "react";
import ReactDOM from "react-dom";

class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.order+":"+this.props.item;
  }
}

export default Instructions;
