import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';
import TagForm from '../tagForm/tagForm';

export class Tag {
    constructor(name, display, done) {
        this.name = name,
        this.display = display,
        this.done = done
    }
}

//RETURNS PAGE HEADER AND BACK BUTTON
class IngredientForm extends React.Component {
  constructor() {
    super();
    this.state = {
        tagsInput: [{name: "", display: false, done: false}],
    };
  }

  updateIngredientsInput(ingredientIndex, ingredientCategory, inputValue){
    this.props.updateIngredientsInput(ingredientIndex, ingredientCategory, inputValue);
  }

  updateTagsInput(tagIndex, tagCategory, inputValue){
    let tagsInput = [...this.state.tagsInput];
    tagsInput[tagIndex][tagCategory] = inputValue;

    this.setState({tagsInput: tagsInput});
  }

  addTag(){
    let newTag = new Tag("", false, false);
    let tagsInput = [...this.state.tagsInput];
    this.setState({tagsInput: tagsInput.concat(newTag)});
  }


  render() {
    let ingredient = this.props.ingredient;
    let ingredientIndex = this.props.ingredientIndex

    let tagsList = this.state.tagsInput.map((tag, tagIndex) => {
        return <TagForm key={tagIndex}
                    tag={tag}
                    tagIndex={tagIndex}
                    updateTagsInput={(e1, e2, e3)=>{this.updateTagsInput(e1, e2, e3)}}
                />
    });


    return (

      <div className="ingredient-item">

        <div>
            <label htmlFor={"ingredient-name-input"}>Ingredient Name: </label>
            <input id={"ingredient-name-input"} value={ingredient.name} onChange={()=>{this.updateIngredientsInput(ingredientIndex, "name", event.target.value)}}/>
        </div>

        <div>
            <label htmlFor={"ingredient-amount-input"}>Amount: </label>
            <input id={"ingredient-amount-input"} value={ingredient.amount} onChange={()=>{this.updateIngredientsInput(ingredientIndex, "amount", event.target.value)}}/>
        </div>

        <div>
            {tagsList}
            <FontAwesomeIcon icon="plus" onClick={()=>{this.addTag()}} style={{cursor: "pointer"}}/>
            <span>Add Tag</span>
        </div>

      </div>
    );
  }
}

export default IngredientForm;