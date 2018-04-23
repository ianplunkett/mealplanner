'use strict';

class Recipe extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const ingredients = this.props.ingredients.map(
      (ingredient,key) => <li key={key}><Ingredient {...ingredient} /></li>
    );


    const instructions = this.props.instructions.map(
      (instructions,key) => <li key={key}><Instructions {...instructions} /></li>
    );

    return (
      <div>
	<h1>{this.props.name}</h1>
	<ul>{ingredients}</ul>
	<ul>{instructions}</ul>
      </div>
    );
  }
}

class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.order+":"+this.props.item;
  }
}

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.amount+":"+this.props.item;
  }
}

class Meal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
	<h2>{this.props.mealTime}</h2>
	<Recipe {...this.props} />
      </div>
    );
  }
}

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
	<ul>
	  <li>{this.props.day}</li>
	  <li><Meal mealTime="lunch" {...this.props} /></li>
	  <li><Meal mealTime="dinner" {...this.props} /></li>
	</ul>
      </div>
    );
  }
}

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
	<div>
	  <Day
	    key={key}
	    day={day.day}
	    name={this.state.rawInput.recipes[day.lunch].name}
	    ingredients={[{amount:'1oz',item:'water'},{amount:'1oz',item:'vinegar'}]}
	    instructions={[{order:'1',item:'boil water'},{order:'2',item:'add vinegar'}]} />
	</div>
      )
    );
    return meals;
  }
}

const newMeals = JSON.parse(
  document.getElementsByClassName('new-meals')[0].attributes[1].value);

ReactDOM.render(
  <App rawInput={newMeals} />,
  document.getElementById('root')
);
