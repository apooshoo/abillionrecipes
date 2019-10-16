import React from 'react';
import styled from 'styled-components';
import Ingredient from '../ingredient/ingredient';
import Instruction from '../instruction/instruction';
import styles from './style.scss';

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
  returnMainImgThumbnail(recipe, selectedImgIndex){
    let MainImgThumbnail = styled.div`
        background-image: url('${recipe.imgs[selectedImgIndex]}');
        background-size: cover;
        width: 200px;
        height: 200px;
    `;
    return <MainImgThumbnail />;
  }

  returnImgThumbnail(img, imgIndex){
    let ImgThumbnail = styled.div`
        background-image: url('${img}');
        background-size: cover;
        width: 50px;
        height: 50px;
        display: inline-block;
    `
    let imgThumbnail = <ImgThumbnail key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndex(imgIndex)}}/>
    return imgThumbnail;
  }

  editDefaultStateForSelectedImgIndex(imgIndex){
    this.setState({selectedImgIndex: imgIndex});
  }


  render() {
    let recipe = this.props.recipe;
    let recipeTitle = <h3>{recipe.title}</h3>;
    let mainImgThumbnail = this.returnMainImgThumbnail(recipe, this.state.selectedImgIndex);

    let imgThumbnails = recipe.imgs.map((img, imgIndex) => {
        return this.returnImgThumbnail(img, imgIndex);
    });

    let servings = <p>Servings: {recipe.servings}</p>
    let ingredients = recipe.ingredients.map((ingredient, ingredientIndex) => {
        return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex}/>
    });

    let instructions = recipe.instructions.map((instruction, instructionIndex) => {
        let stepNumber = instructionIndex + 1;
        return <Instruction key={instructionIndex} instruction={instruction} stepNumber={stepNumber}/>
    });

    return (
      <div className="selected-recipe">
        {recipeTitle}
        {mainImgThumbnail}
        <div className="img-thumbnails-container" style={{width: "600px", height: "100px"}}>
            {imgThumbnails}
        </div>
        <div className="ingredients-container">
            <h5 onClick={()=>{this.toggleIngredientsOpenAndClose()}} style={{cursor: "pointer"}}>Ingredients</h5>
            <div className={styles.collapsibleIngredientsList} style={{display: this.state.ingredientsOpen ? false : 'none'}}>
                {servings}
                {ingredients}
            </div>
        </div>
        <div className="instructions-container">
            <h5 onClick={()=>{this.toggleInstructionsOpenAndClose()}} style={{cursor: "pointer"}}>Instructions</h5>
            <div className={styles.collapsibleInstructionsList} style={{display: this.state.instructionsOpen ? false : 'none'}}>
                {instructions}
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