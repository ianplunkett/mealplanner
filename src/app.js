'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Day from "./day.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawInput: this.props.rawInput
    };
  }

  render() {
    const meals = this.state.rawInput.calendarDays.map(
      (day,key) => (
	<Day
	  key={key}
	  day={day.day}
	  name={this.state.rawInput.recipes[day.lunch].name}
	  ingredients={[{amount:'1oz',item:'water'},{amount:'1oz',item:'vinegar'}]}
	  instructions={[{order:'1',item:'boil water'},{order:'2',item:'add vinegar'}]} />
      )
    );
    return meals;
  }
}

export default App;
