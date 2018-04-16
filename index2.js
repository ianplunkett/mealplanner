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
        const liStyle = {
            color: 'red',
            height: '100px',
            borderStyle: 'solid solid none solid'
        };
        return <li style={liStyle}>{this.props.meal}</li>;
    }
}
class Day extends React.Component {
    render() {

        const divStyle = {
            color: 'blue',
            display: 'inline-block',
            width: '200px',
            verticalAlign: 'top'

        };
        const ulStyle = {
            listStyleType: 'none',
            borderStyle: 'none none solid none'
        };

        return (
            <div style={divStyle}>
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
        console.log('Render Calendar');
        console.log(this.props.meals);

        const daysOfWeek = this.props.meals.map(
            (day) =>
                <Day meals={day} />
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
            mealTime: 'lunch',
            day: 'Sunday',
            value: '',
            checked: true
        };
    }

    handleRadioChange = (event) => {
        this.setState({
            checked: !this.state.checked,
            mealTime: event.target.value
        });
    }

    handleTextChange = (event) => {
        this.setState({ value: event.target.value });
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
                <option value={day}>{day}</option>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Lunch:
		    <input type="text"
                        id="lunch"
                        value={this.state.lunch}
                        onChange={this.handleTextChange} />
                </label>
                <br />
                <label>
                    Lunch:
		    <input type="text"
                        id="dinner"
                        value={this.state.dinner}
                        onChange={this.handleTextChange} />
                </label>
                <br />
                <label>
                    Day:
		    <select onChange={this.handleSelectChange}>
                        {daysOfWeek}
                    </select>
                </label>
                <br />
                <label>
                    Lunch:
          <input type="radio"
                        value="Lunch"
                        checked={this.state.checked}
                        onChange={this.handleRadioChange} />
                </label>
                <br />
                <label>
                    Dinner:
          <input type="radio"
                        value="Dinner"
                        checked={!this.state.checked}
                        onChange={this.handleRadioChange} />
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
        console.log('Render MealPlanner');
        console.log(this.props.meals);
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
        const aMeal = {
            day: meal.day,
            lunch: meal.value,
            dinner: meal.value
        };
        console.log('A Meal');
        console.log(aMeal);
        this.setState({ meals: [aMeal] });
    }

    render() {
        console.log('Render App');
        console.log(this.state.meals);
        return <MealPlanner meals={this.state.meals} onMealChange={this.handleMealChange} />;
    }

}

const meals = JSON.parse(document.getElementsByClassName('meals').item(0).attributes[1].value);
ReactDOM.render(<App meals={meals} />, document.getElementById('root'));
