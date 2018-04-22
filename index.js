'use strict';

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Meal Plan Display Classes
class Meal extends React.Component {
  render() {
    return <li className="meal-list">{this.props.meal}</li>;
  }
}

class Day extends React.Component {
  render() {
    return (
      <div className="meal-div">
        <ul className="meal-list-wrap">
          <li>{this.props.meals.day}</li>
          <a href={"?" + this.props.meals.lunch}>
	    <Meal meal={this.props.meals.lunch} />
	  </a>
	  <a href={"?" + this.props.meals.dinner}>
	    <Meal meal={this.props.meals.dinner} />
	  </a>
        </ul>
      </div>
    );
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meals: this.props.meals };
  }
  render() {

    const daysOfWeek = this.props.meals.map(
      (day) => <Day key={day.day} meals={day} />
    );

    return (
      <div>
        {daysOfWeek}
      </div>
    );
  }
}


/* Add meal interface */
class NewMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 'Sunday',
      lunch: 'Food',
      dinner: 'Food'

    };
  }

  handleLunchChange = (event) => {
    this.setState({ lunch: event.target.value });
  }

  handleDinnerChange = (event) => {
    this.setState({ dinner: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ day: event.target.value });
  }
  handleSubmit = (event) => {
    this.props.onMealChange(this.state);
    event.preventDefault();
  }

  render() {
    const daysOfWeek = daysOfTheWeek.map(
      (day) =>
        <option key={day} value={day}>{day}</option>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Lunch:
	  <input type="text"
                 id="lunch"
                 value={this.state.lunch}
                 onChange={this.handleLunchChange} />

        </label>
        <br />
        <label>
          Dinner:
	  <input type="text"
                 id="dinner"
                 value={this.state.dinner}
                 onChange={this.handleDinnerChange} />
        </label>
        <br />
        <label>
          Day:
	  <select onChange={this.handleSelectChange}>
            {daysOfWeek}
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class MealPlanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date();
    date = date.getMonth() + '-' + date.getDate();
    return (
      <div>
        <h1>Meals for Week of {date}</h1>
        <hr />
        <Calendar meals={this.props.meals} />
        <NewMeal onMealChange={this.props.onMealChange} />
      </div>
    );
  }

}

// Main entrance into application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: this.props.meals,
      ingredients: [],
      recipe: this.newRecipe()
    };

  }

  newRecipe = () => {
    const url = new URL(window.location.href);
    //Strip leading `?' and URL Encoded Spaces
    return url.search.replace(/^\?/, '').split('%20').join(" ");
  }

  handleMealChange = (meal) => {
    let newMeals = this.state.meals;
    for (let i = 0; i < this.state.meals.length; i++) {
      if (this.state.meals[i].day === meal.day) {
        newMeals[i] = meal;
      }
    }

    this.setState({
      meals: newMeals,
      recipe: this.newRecipe()
    });

  }

  handleRemoveIngredient = (id) => {
    let ingredients = this.state.ingredients;
    ingredients.splice(id,1);
    this.setState({
      ingredients: ingredients
    });
  }


  handleIngredientChange = (item, amount) => {
    this.state.ingredients.push({item: item, amount: amount});
    this.setState({
      ingredients: this.state.ingredients
    });
  }

  render() {
    if (this.state.recipe === "")
      return (
	<MealPlanner
	  meals={this.state.meals}
	  onMealChange={this.handleMealChange} />
      );
    else
      return (
	<RecipePlanner
	  recipe={this.state.recipe}
	  ingredients={this.state.ingredients}
	  onIngredientChange={this.handleIngredientChange}
	  onRemoveIngredient={this.handleRemoveIngredient}/>
      );
  }
}

class RecipePlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ item: '', amount: '' });
  }

  handleSubmit = (event) => {
    this.props.onIngredientChange(this.state.item, this.state.amount);
    this.setState({item: '', amount: '', instructions: ''});
    this.nameInput.focus();
    event.preventDefault();
  }

  handleItemChange = (event) => {
    this.setState({ item: event.target.value });
  }
  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return (
      <div>
        <h1>{this.props.recipe}</h1>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Item</td>
                <td>Amount</td>
		<td>Remove</td>
              </tr>
              <Ingredient
                items={this.props.ingredients}
		onRemoveIngredient={this.props.onRemoveIngredient} />
              <tr>
                <td>
                  <input
                    type="text"
                    value={this.state.item}
		    ref={(input)=> this.nameInput = input}
                    onChange={this.handleItemChange}
                    />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.amount}
                    onChange={this.handleAmountChange}
                    />
                </td>
                <td><input type="submit" value="Next" /></td>
              </tr>
	      <tr>
		<td>Cooking Instructions</td>
	      </tr>
	      <tr>
		<td>
		  <textarea value={this.state.instructions} />
		</td>
	      </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}


class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRemoveIngredient = (event) => {
    this.props.onRemoveIngredient(event.target.id);
    event.preventDefault();
  }

  render() {
    const ingredients = this.props.items.map(
      (item, key) => (
	<tr key={key}>
          <td>{item.item}</td>
	  <td>{item.amount}</td>
	  <td><a id={key} href="" onClick={this.handleRemoveIngredient}>X</a></td>
	</tr>
      )
    );

    return ingredients;
  }
}


const meals = JSON.parse(document.getElementsByClassName('meals').item(0).attributes[1].value);
ReactDOM.render(<App meals={meals} />, document.getElementById('root'));
