'use strict';
import './styles.css';
import React from "react";
import ReactDOM from "react-dom";
import App from './app.js';

const newMeals = JSON.parse(
  document.getElementsByClassName('new-meals')[0].attributes[1].value
);
  

ReactDOM.render(
  <App rawInput={newMeals} />,
  document.getElementById('root')
);
