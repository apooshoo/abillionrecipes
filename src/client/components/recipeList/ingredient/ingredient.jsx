import React from 'react';
import styled from 'styled-components';

import styles from './style.scss';

class Ingredient extends React.Component {
  constructor() {
    super();
    this.state = {
        display: true,
        open: true,
    };
  }

  toggleOpenAndClose(){
    this.setState({open: !this.state.open});
  }

  toggleDisplayAndHide(){
    this.setState({display: !this.state.display});
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
      <div className={styles.ingredient} style={{display: this.state.display ? false : 'none'}}>
        <span onClick={()=>{this.toggleOpenAndClose()}}>Ingredient: {ingredient.name}</span>
        <button onClick={()=>{this.toggleDisplayAndHide()}}>Hide</button>
        <div className={styles.collapsibleIngredientData} style={{display: this.state.open ? false : 'none'}}>
            <p>Amount: {ingredient.amount}</p>
            {tags}
        </div>
      </div>
    );
  }
}

export default Ingredient;