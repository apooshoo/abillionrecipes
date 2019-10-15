import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';
export class Recipe {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
        currentRecipes: null,
        selectedImgIndexes: null,
    };
  }

  //filters recipes depending on mode and saves to currentRecipes
  filterRecipesToShow(mode){
    let currentRecipes;
    switch (mode) {
        case "explore":
            currentRecipes = this.props.recipes;
            this.setState({currentRecipes: currentRecipes});
        break;
        case "see yours":
            currentRecipes = this.props.recipes.filter(recipe => {
                return recipe.authorId === this.props.userId;
            });
            console.log(currentRecipes);
            this.setState({currentRecipes: currentRecipes});
        break;
    }
  }

  //sets each recipe's selected main image to display to index 0
  initialiseDefaultStateForSelectedImgIndexes(recipes){
    let selectedImgIndexes = [];
    recipes.forEach(recipe => {
        selectedImgIndexes.push(0);
    });
    this.setState({selectedImgIndexes: selectedImgIndexes});
  }

  //changes each recipe's main image thumbnail on click
  editDefaultStateForSelectedImgIndexes(recipeIndex, imgIndexToChangeTo){
    let selectedImgIndexes = [...this.state.selectedImgIndexes];
    selectedImgIndexes[recipeIndex] = imgIndexToChangeTo;
    this.setState({selectedImgIndexes: selectedImgIndexes});
  }

  componentDidMount(){
    this.filterRecipesToShow(this.props.mode);
    this.initialiseDefaultStateForSelectedImgIndexes(this.props.recipes);
  }


  returnRecipeTitle(recipe, recipeIndex){
    return <h3 key={recipeIndex}>{recipe.title}</h3>;
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

  returnImgThumbnail(img, imgIndex, recipeIndex){
    let ImgThumbnail = styled.div`
        background-image: url('${img}');
        background-size: cover;
        width: 50px;
        height: 50px;
        display: inline-block;
    `
    let imgThumbnail = <ImgThumbnail key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndexes(recipeIndex, imgIndex)}}/>
    return imgThumbnail;
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
    console.log(this.props)
    // let a = new Recipe('yo', 'yolo');
    // console.log(a)
    //recipes: title (string), recipeId(int), imgs (arr), authorId(int), author (string), servings (string), instructions (arr), ingredients (arr)
            //ingredients: name (str), amount(str), tags(arr)
                //tags: name(str), display(boolean)

    //MAPS CURRENT RECIPES
    let recipesList;
    if (this.props.recipes === null || this.props.recipes === undefined || this.state.currentRecipes === null) {
        recipesList = <p>Loading...</p>
    } else {
        recipesList = this.state.currentRecipes.map((recipe, recipeIndex) => {
            let recipeTitle = this.returnRecipeTitle(recipe, recipeIndex);

            //returns main image thumbnail
            let mainImgThumbnail;
            if(this.state.selectedImgIndexes != null){
                mainImgThumbnail = this.returnMainImgThumbnail(recipe, this.state.selectedImgIndexes[recipeIndex]);
            } else {
                mainImgThumbnail = <p>Loading</p>
            };

            //returns each image thumbnail
            let imgThumbnails = recipe.imgs.map((img, imgIndex) => {
                return this.returnImgThumbnail(img, imgIndex, recipeIndex);
            });

            //filters and returns tag by display === true
            let displayTags = this.returnDisplayTags(recipe);

            //gives button to see selected recipe in detail
            let selectButton = <button onClick={()=>{this.props.selectRecipeAndChangeMode(recipe, "selectedRecipe")}}>See More</button>


            return <div className="recipe-list-item" key={recipeIndex} style={{width: "600px", height: "500px"}}>
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

        });
    };

    return (
      <div className="recipe-list">
        {recipesList}
      </div>
    );
  }
}

export default RecipeList;