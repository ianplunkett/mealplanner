class App extends React.Component {
    constructor(props) {
        super(props);
        const daysOfWeek = ['Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'];
    }

    render() {
        const meals = {
            sunday: {
                day: 'Sunday',
                lunch: 'Kale Salad',
                dinner: 'Chick Cauliflower Rice'
            },
            monday: {
                day: 'Monday',
                lunch: 'Salad with veggies nuts & turkey pastrami or chicken',
                dinner: 'Burger with veggies'
            }
        };

        return <Calendar meals={meals} />;
    }
}

class Meal extends React.Component {
    render() {
        return <li>{this.props.meal}</li>;
    }
}

class Day extends React.Component {
    render() {
        return (
            <ul>
                <li>{this.props.meals.day}</li>
                <Meal meal={this.props.meals.lunch} />
                <Meal meal={this.props.meals.dinner} />
            </ul>
        );
    }
}

class Calendar extends React.Component {
    render() {
        return (
            <Day meals={this.props.meals.sunday} />
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
