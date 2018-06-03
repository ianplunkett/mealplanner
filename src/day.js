'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Meal from './meal.js';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div  className="meal">
	<ul className="meal-list">
	  <li className="header">{this.props.day}</li>
	  <li><Meal mealTime="dinner" {...this.props} /></li>
	</ul>
      </div>
    );
  }
}

export default Day;
