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
        const ulStyle = {
            listStyleType: 'none',
            borderStyle: 'none none solid none'
        };

        return (
            <div className="meal-div">
                <ul style={ulStyle}>
                    <li>{this.props.meals.day}</li>
                    <Meal meal={this.props.meals.lunch} />
                    <Meal meal={this.props.meals.dinner} />
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
        this.state = { meals: this.props.meals };
    }


    handleMealChange = (meal) => {
        let newMeals = this.state.meals;
        for (let i = 0; i < this.state.meals.length; i++) {
            if (this.state.meals[i].day === meal.day) {
                console.log(newMeals);
                newMeals[i] = meal;
                console.log(newMeals);
                console.log(newMeals);
            }
        }
        this.setState({ meals: newMeals });

    }

    render() {
        return <MealPlanner meals={this.state.meals} onMealChange={this.handleMealChange} />;
    }

}

const meals = JSON.parse(document.getElementsByClassName('meals').item(0).attributes[1].value);
ReactDOM.render(<App meals={meals} />, document.getElementById('root'));
