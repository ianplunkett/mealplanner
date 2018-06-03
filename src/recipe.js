'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Ingredient from './ingredient.js';
import Instructions from './instructions.js';

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
	<span>{this.props.name}</span>
	<ul className="no-show"><li>Ingredients</li>{ingredients}</ul>
	<ul className="no-show"><li>Instructions</li>{instructions}</ul>
      </div>
    );
  }
}

export default Recipe;
