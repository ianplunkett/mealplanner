class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return(
      <div>
	<h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    //    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
	{this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
//    this.handleLoginClick = this.handleLoginClick.bind(this);
//    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    const button = isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick}/>
    ) : (
      <LoginButton onClick={this.handleLoginClick}/>
    );
    
    return (
      <div>
	<Greeting isLoggedIn={isLoggedIn} />
	{button}
      </div>
    );
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout 
    </button>
  );
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function ActionLink() {

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hell, Stranger.</h1>;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
             src={props.author.avatarUrl}
             alt={props.author.name}
             />
      </div>
      <div className="UserInfo-name">
        {props.author.name}
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
    </div>
  );
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
	<h2>You have {unreadMessages.length} unread messages.</h2>
	}
    </div>
  );
}

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
	<WarningBanner warn={this.state.showWarning}/>
	<button onClick={this.handleToggleClick}>
	  {this.state.showWarning ? 'Hide' : 'Show'}
	</button>
      </div>
    );
  }
}

function AppOld() {
  const author = {
    avatarUrl: "https://png.icons8.com/metro/1600/manager.png"
  };

  const text = <Welcome name="Sara" />;

  const date = new Date().toLocaleTimeString();

  return (
    <div>
      <Comment author={author}
               text={text}
               />
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re:Re React'];
//const messages = [];

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>{numbers.map(
	(number) =>
	<ListItem key={number.toString()} value={number} />
    )}
    </ul>
  );
/*
  const listItems = numbers.map(
    (number) =>
      <ListItem key={number.toString()} value={number} />
  );

  return (
    <ul>{listItems}</ul>
  );
*/
}

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
      <li key={post.id}>{post.title}</li>)}
    </ul>
  );
  const content = props.posts.map(
    (post) =>
      <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
	<label>
	  Name:
	  <input type="text" value={this.state.value} onChange={this.handleChange} />
	</label>
	<input type="submit" value="Submit" />
      </form>
    );
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('An essay was submitted:' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	<label>
	  Essay:
	  <textarea value={this.state.value} onChange={this.handleChange} />
	</label>
	<input type="submit" value="Submit" />
      </form>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('Your favorite flavor is:' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	<label>
	  Pick your favority La Croix flavor:
	  <select value={this.state.value} onChange={this.handleChange}>
	    <option value="grapefruit">Grapefruit</option>
	    <option value="lime">Lime</option>
	    <option value="coconut">Coconut</option>
	    <option value="mango">Mango</option>
	  </select>
	</label>
	<input type="submit" value="Submit" />
      </form>
    );
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
	<label>
	  Is going:
	  <input
	    name="isGoing"
	    type="checkbox"
	    checked={this.state.isGoing}
	    onChange={this.handleInputChange} />
	</label>
	<br />
	<label>
	  Number of guests:
	  <input
	    name="numberOfGuests"
	    type="number"
	    value={this.state.numberOfGuests}
	    onChange={this.handleInputChange} />
	</label>
      </form>
    );
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange = (temperature) => {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange = (temperature) => {
    this.setState({scale: 'f', temperature});
  }
  
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f'
	  ? tryConvert(temperature, toCelsius)
	  : temperature;
    const fahrenheit = scale === 'c'
	  ? tryConvert(temperature, toFahrenheit)
	  : temperature;
    
    return (
      <div>
	<TemperatureInput
	  scale="c"
	  temperature={celsius}
	  onTemperatureChange={this.handleCelsiusChange} />
	<TemperatureInput
	  scale="f"
	  temperature={fahrenheit}
	  onTemperatureChange={this.handleFahrenheitChange} />
	<BoilingVerdict
	  celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
	<legend>Enter temperature in {scaleNames[scale]}:</legend>
	<input value={temperature}
	       onChange={this.handleChange} />
      </fieldset>
    );
  }
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];


const numbers = [1,2,3,4,5];

function FancyBorder(props) {
  return(
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
      />
  );
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
	{props.left}
      </div>
      <div className="SplitPane-right">
	{props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function App() {
  return (
    <SplitPane
      left={<Contacts />}
      right={<Chat/>}
      />
      
      
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
	{props.title}
      </h1>
      <p className="Dialog-message">
	{props.message}
      </p>
    </FancyBorder>
  );
}


const element = (
  <div>
    <App />
    <WelcomeDialog />
  </div>
);

ReactDOM.render(element, document.getElementById('root'));

/*
  ReactDOM.render(
  getGreeting(user),
  document.getElementById('root')
  );
*/
