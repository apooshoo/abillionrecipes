import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';
import IngredientForm from '../ingredientForm/ingredientForm';

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
        titleInput: "eg. Mom's Spaghetti",
        servingsInput: "eg. 5 pax",
        ingredientsInput: [{name: "", amount: "", tags: [], done: false}],
    };
  }

  titleInputHandler(e){
    this.setState({titleInput: e.target.value});
  }

  servingsInputHandler(e){
    this.setState({servingsInput: e.target.value});
  }

  updateIngredientsInput(ingredientIndex, ingredientCategory, inputValue){
    let ingredientsInput = [...this.state.ingredientsInput];
    //save updated ingredient
    ingredientsInput[ingredientIndex][ingredientCategory] = inputValue;

    this.setState({ingredientsInput: ingredientsInput});
  }


  render() {
    let ingredientsInputList = [...this.state.ingredientsInput].map((ingredient, ingredientIndex) => {
        return <IngredientForm key={ingredientIndex}
                    //give base data, all manipulation handled in IngredientForm
                    ingredient={ingredient}
                    ingredientIndex={ingredientIndex}
                    //give IngredientForm ability to update ingredientsInput here
                    updateIngredientsInput={(e1, e2, e3)=>{this.updateIngredientsInput(e1, e2, e3)}}
                />

    });

    return (
      <div className="create-form">
          <div>
            <label htmlFor={"author-input"}>Author: </label>
            <input id={"author-input"} value={this.props.username} readOnly/>
          </div>

          <div>
            <label htmlFor={"title-input"}>Recipe Title: </label>
            <input id={"title-input"} value={this.state.titleInput} onChange={()=>{this.titleInputHandler(event)}}/>
          </div>

          <div>
            <label htmlFor={"servings-input"}>Serving size: </label>
            <input id={"servings-input"} value={this.state.servingsInput} onChange={()=>{this.servingsInputHandler(event)}}/>
          </div>

          <div>
            {ingredientsInputList}
          </div>
      </div>
    );
  }
}

export default CreateForm;