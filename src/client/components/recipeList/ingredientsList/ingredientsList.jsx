import React from 'react';
import styles from './style.scss';

import Ingredient from '../ingredient/ingredient';

class IngredientsList extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }



  render() {
    let ingredients = this.props.ingredients.map((ingredient, ingredientIndex) => {
        return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex}/>
    });

    return (
      <div>
        {ingredients}
      </div>
    );
  }
}

export default IngredientsList;