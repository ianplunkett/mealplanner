'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Recipe from './recipe.js';

class Meal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Recipe {...this.props} />
    );
  }
}

export default Meal;
