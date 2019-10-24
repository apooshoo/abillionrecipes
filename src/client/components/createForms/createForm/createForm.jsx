import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';
import IngredientForm from '../ingredientForm/ingredientForm';
import InstructionForm from '../instructionForm/instructionForm';

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


//let recipeId be decided by the database so there wont be conflict. for now, set recipeId in addRecipe()
export class Recipe {
    constructor(title, imgs, authorId, author, servings, ingredients, instructions, recipeId = null) {
        this.title = title,
        this.imgs = imgs,
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
        imgsInput: [],
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
    let newRecipe = new Recipe(this.state.titleInput, this.state.imgsInput, this.props.userId, this.props.username, this.state.servingsInput, [...this.state.ingredientsInput], [...this.state.instructionsInput]);
    return newRecipe;
  }

  addRecipe(recipe){
    this.props.addRecipe(recipe);
  }

  createAndAddRecipe(){
    this.addRecipe(this.createRecipe());
  }

  //BLOODY BUGGED!
  //Seems to crop properly, but always uploads the un-cropped picture anyway
  createWidget(){
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'moggle93',
      uploadPreset: 'jmiuat3r',
      sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
      multiple: false,
      cropping: true,
      showSkipCropButton: false,
      croppingShowDimensions: true,
      maxImageFileSize: 4000000,
      croppingAspectRatio: 1,
      // croppingCoordinatesMode: 'custom',
      // customCoordinates:
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('result:', result);
            console.log('Done! Here is the image info: ', result.info);
            this.setState({imgsInput: [...this.state.imgsInput].concat(result.info.public_id)});
            //if there is a database, save and then setState upon success
        } else if (error){
            console.log(error)
            console.log(result)
            alert("Upload failed!")
        }
      }
    );
    //max 4 imgs, then remove upload option
    if ([...this.state.imgsInput].length <= 3){
        return <div>
                <button type="button" className="btn btn-link" id="upload_widget" onClick={()=>this.openWidget(myWidget)}>Upload images (max 4)</button>
              </div>
    };
  }

  openWidget(widget){
    widget.open();
  }

  render() {
    let imgsInputList = [...this.state.imgsInput].map((img, imgIndex) => {
        return <Image cloudName="moggle93" publicId={img} >
                    <Transformation width="200" height="200" crop="scale" />
                </Image>
    });

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
        <div className="row">
          <div className="create-form col-10 offset-1 col-md-6 offset-md-3">

              <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Author: </span>
                </div>
                <input type="text" className="form-control" id={"author-input"} value={this.props.username} readOnly/>
              </div>

              <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Recipe Title: </span>
                </div>
                <input type="text" className="form-control" id={"title-input"} placeholder={"eg. Mom's Spaghetti"} value={this.state.titleInput} onChange={()=>{this.titleInputHandler(event)}}/>
              </div>

              <div>
                {imgsInputList}
              </div>

              {this.createWidget()}

              <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Serving Size: </span>
                </div>
                <input type="text" className="form-control" id={"servings-input"} placeholder={"eg. 5 pax"} value={this.state.servingsInput} onChange={()=>{this.servingsInputHandler(event)}}/>
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
        </div>
    );
  }
}

export default CreateForm;