import React from 'react';
import styled from 'styled-components';

import IngredientsList from '../ingredientsList/ingredientsList';
import Instruction from '../instruction/instruction';
import styles from './style.scss';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




class SelectedRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
        //default first image
        selectedImgIndex: 0,
        ingredientsOpen: true,
        instructionsOpen: true,
    };
  }


  toggleIngredientsOpenAndClose(){
    this.setState({ingredientsOpen: !this.state.ingredientsOpen});
  }

  toggleInstructionsOpenAndClose(){
    this.setState({instructionsOpen: !this.state.instructionsOpen});
  }

  changeMode(modeToChangeTo){
    this.props.changeMode(modeToChangeTo);
  }


  returnImgThumbnail(img, imgIndex){
    // let ImgThumbnail = styled.div`
    //     background-image: url('${img}');
    //     background-size: cover;
    //     width: 50px;
    //     height: 50px;
    //     display: inline-block;
    // `
    // let imgThumbnail = <ImgThumbnail key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndex(imgIndex)}}/>
    // return imgThumbnail;
    return <Image cloudName="moggle93" publicId={img} key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndex(imgIndex)}} style={{cursor: "pointer"}}>
                <Transformation  width="75" height="75" crop="scale"/>
            </Image>
  }

  editDefaultStateForSelectedImgIndex(imgIndex){
    console.log('click')
    this.setState({selectedImgIndex: imgIndex});
  }


  render() {
    let recipe = this.props.recipe;
    let recipeIndex = this.props.recipeIndex;

    let mainImgThumbnail = <Image cloudName="moggle93" publicId={recipe.imgs[this.state.selectedImgIndex]}
                                style={{cursor: "pointer"}}
                                >
                                <Transformation width="300" height="300" crop="scale"/>
                            </Image>

    let imgThumbnails = recipe.imgs.map((img, imgIndex) => {
        return this.returnImgThumbnail(img, imgIndex);
    });

    // let ingredients = recipe.ingredients.map((ingredient, ingredientIndex) => {
    //     return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex}/>
    // });
    let ingredients = <IngredientsList ingredients={recipe.ingredients} recipeIndex={recipeIndex}
                            addTagToRecipe={(e1, e2, e3, e4)=>{this.props.addTagToRecipe(e1, e2, e3, e4)}}
                        />

    let instructions = recipe.instructions.map((instruction, instructionIndex) => {
        let stepNumber = instructionIndex + 1;
        return <Instruction key={instructionIndex} instruction={instruction} stepNumber={stepNumber}/>
    });

    return (
      <div className="selected-recipe row">
        <div className="col-12 col-md-4 text-center" style={{paddingTop: "10px"}}>
            {mainImgThumbnail}
            <div className="img-thumbnails-container">
                {imgThumbnails}
            </div>
        </div>
        <div className="col-12 col-md-8 overflow-auto">
            <div className="shadow-sm p-3 mb-1 bg-white rounded">{recipe.title}</div>
            <div className="shadow-sm p-3 mb-1 bg-white rounded">Servings: {recipe.servings}</div>
            <div className="ingredients-container">
                <div className="shadow-sm p-3 mb-2 bg-white rounded">
                    <span className="mr-4">Ingredients</span>
                    <FontAwesomeIcon icon={this.state.ingredientsOpen? "angle-down" : "angle-left"} onClick={()=>{this.toggleIngredientsOpenAndClose()}} style={{cursor: "pointer"}}/>
                </div>
                <div style={{display: this.state.ingredientsOpen ? 'block' : 'none'}}>
                    {ingredients}
                </div>
            </div>
            <div className="instructions-container">
                <div className="shadow-sm p-3 mb-1 bg-white rounded">
                    <span className="mr-4">Instructions</span>
                    <FontAwesomeIcon icon={this.state.instructionsOpen? "angle-down" : "angle-left"} onClick={()=>{this.toggleInstructionsOpenAndClose()}} style={{cursor: "pointer"}}/>
                </div>
                <div style={{display: this.state.instructionsOpen ? 'block' : 'none'}}>
                    {instructions}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default SelectedRecipe;
// return <div className="recipe-list-item" key={recipeIndex} style={{width: "600px", height: "500px"}}>
//                         {recipeTitle}
//                         {mainImgThumbnail}
//                         <div className="img-thumbnails-container" style={{width: "600px", height: "100px"}}>
//                             {imgThumbnails}
//                         </div>
//                         <div className="tags-container" style={{height: "100px"}}>
//                             {displayTags}
//                         </div>
//                         <div className="buttons-container">
//                             {selectButton}
//                         </div>
//                     </div>