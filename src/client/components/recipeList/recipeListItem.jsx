import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';

class RecipeListItem extends React.Component {
  constructor() {
    super();
    this.state = {
        currentRecipes: null,
        //default main img thumbnail
        selectedImgIndex: 0,
    };
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

  returnDisplayTags(recipe){
    let recipeTags = [];
    recipe.ingredients.map((ingredient, ingredientIndex) => {
        ingredient.tags.forEach(tag => {
            if (tag.display === true){
                recipeTags.push(tag)
            };
        });
    });
    let displayTags;
    if (recipeTags === []){
        displayTags = <p>No public tags</p>
    } else {
        displayTags = recipeTags.map((displayTag, displayTagIndex) => {
            return <p key={displayTagIndex}>{displayTag.name}</p>
        });
    };
    return displayTags;
  }

  render() {
    let recipe = this.props.recipe;
    let recipeIndex = this.props.recipeIndex;

    let recipeTitle = <h3>{recipe.title}</h3>;
    let mainImgThumbnail = this.returnMainImgThumbnail(recipe, this.state.selectedImgIndex);
    let imgThumbnails = recipe.imgs.map((img, imgIndex) => {
        return this.returnImgThumbnail(img, imgIndex);
    });
    let displayTags = this.returnDisplayTags(recipe);
    let selectButton = <button onClick={()=>{this.props.selectRecipeAndChangeMode(recipe, "selectedRecipe")}}>See More</button>

    return (
      <div className="recipe-list-item" key={recipeIndex} style={{width: "600px", height: "500px"}}>
        {recipeTitle}
        {mainImgThumbnail}
        <div className="img-thumbnails-container" style={{width: "600px", height: "100px"}}>
            {imgThumbnails}
        </div>
        <div className="tags-container" style={{height: "100px"}}>
            {displayTags}
        </div>
        <div className="buttons-container">
            {selectButton}
        </div>
      </div>
    );
  }
}

export default RecipeListItem;