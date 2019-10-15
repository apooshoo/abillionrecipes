import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';

class Ingredient extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }


  render() {
    let ingredient = this.props.ingredient;
    let ingredientIndex = this.props.ingredientIndex;
    let tags;
    if (tags != []){
        tags = ingredient.tags.map((tag, tagIndex) => {
            return <span>{tag.name}</span>
        });
    } else {
        tags = <p>No tags</p>
    }

    return (
      <div>
        <p>Ingredient: {ingredient.name}</p>
        <p>Amount: {ingredient.amount}</p>
        {tags}
      </div>
    );
  }
}

export default Ingredient;