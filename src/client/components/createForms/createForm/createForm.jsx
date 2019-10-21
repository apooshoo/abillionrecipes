import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';
import IngredientForm from '../ingredientForm/ingredientForm';
import InstructionForm from '../instructionForm/instructionForm';

//let recipeId be decided by the database so there wont be conflict. for now, set recipeId in addRecipe()
export class Recipe {
    constructor(title, authorId, author, servings, ingredients, instructions, recipeId = null) {
        this.title = title,
        this.authorId = authorId,
        this.author = author,
        this.servings = servings,
        this.ingredients = ingredients,
        this.instructions = instructions
    }
}

export class Ingredient {
    constructor(name, amount, tags, done) {
        this.name = name,
        this.amount = amount,
        this.tags = tags,
        this.done = done
    }
}

export class Error {
    constructor(category, text){
        this.category = category,
        this.text = text
    }
}

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
        titleInput: "",
        servingsInput: "",
        ingredientsInput: [{name: "", amount: "", tags: [], done: false}],
        instructionsInput: [""],
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

  updateInstructionsInput(instructionIndex, inputValue){
    let instructionsInput = [...this.state.instructionsInput];
    instructionsInput[instructionIndex] = inputValue;

    this.setState({instructionsInput: instructionsInput});
  }

  addIngredient(){
    let newIngredient = new Ingredient("", "", [], false);
    let ingredientsInput = [...this.state.ingredientsInput];
    this.setState({ingredientsInput: ingredientsInput.concat(newIngredient)});
  }

  addInstruction(){
    let newInstruction = "";
    let instructionsInput = [...this.state.instructionsInput];
    this.setState({instructionsInput: instructionsInput.concat(newInstruction)});
  }

//   export class Recipe {
//     constructor(title, authorId, author, servings, ingredients) {
//         this.title = title,
//         this.authorId = authorId,
//         this.author = author,
//         this.servings = servings,
//         this.ingredients = ingredients
//     }
// }

  createRecipe(){
    let newRecipe = new Recipe(this.state.titleInput, this.props.userId, this.props.username, this.state.servingsInput, [...this.state.ingredientsInput], [...this.state.instructionsInput]);
    return newRecipe;
  }

  addRecipe(recipe){
    this.props.addRecipe(recipe);
  }

  createAndAddRecipe(){
    this.addRecipe(this.createRecipe());
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

    let instructionsInputList = [...this.state.instructionsInput].map((instruction, instructionIndex) => {
        return <InstructionForm key={instructionIndex}
                    instruction={instruction}
                    instructionIndex={instructionIndex}
                    updateInstructionsInput={(e1, e2)=>{this.updateInstructionsInput(e1, e2)}}
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
            <input id={"title-input"} placeholder={"eg. Mom's Spaghetti"} value={this.state.titleInput} onChange={()=>{this.titleInputHandler(event)}}/>
          </div>

          <div>
            <label htmlFor={"servings-input"}>Serving size: </label>
            <input id={"servings-input"} placeholder={"eg. 5 pax"} value={this.state.servingsInput} onChange={()=>{this.servingsInputHandler(event)}}/>
          </div>

          <div>
            {ingredientsInputList}
            <FontAwesomeIcon icon="plus" onClick={()=>{this.addIngredient()}} style={{cursor: "pointer"}}/>
            <span>Add Ingredient</span>
          </div>

          <div>
            {instructionsInputList}
            <FontAwesomeIcon icon="plus" onClick={()=>{this.addInstruction()}} style={{cursor: "pointer"}}/>
            <span>Add Instruction</span>
          </div>

          <div>
              <FontAwesomeIcon icon="check" onClick={()=>{this.createAndAddRecipe()}} style={{cursor: "pointer"}}/>
              <span>Save Recipe</span>
          </div>
      </div>
    );
  }
}

export default CreateForm;