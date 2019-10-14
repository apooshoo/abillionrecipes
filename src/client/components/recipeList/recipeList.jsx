import React from 'react';
import styled from 'styled-components'

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
        selectedImgs: null,
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
  initialiseDefaultStateForSelectedImgs(recipes){
    let selectedImgs = [];
    recipes.forEach(recipe => {
        selectedImgs.push(0);
    });
    this.setState({selectedImgs: selectedImgs});
  }

  //changes each recipe's main image thumbnail on click
  editDefaultStateForSelectedImgs(recipeIndex, imgIndexToChangeTo){
    let selectedImgs = [...this.state.selectedImgs];
    selectedImgs[recipeIndex] = imgIndexToChangeTo;
    this.setState({selectedImgs: selectedImgs});
  }

  componentDidMount(){
    this.filterRecipesToShow(this.props.mode);
    this.initialiseDefaultStateForSelectedImgs(this.props.recipes);
  }

  returnRecipeTitle(recipe, recipeIndex){
    return <h3 key={recipeIndex}>{recipe.title}</h3>;
  }

  returnMainImgThumbnail(recipe, recipeIndex, selectedImgIndex){
    let MainImgThumbnail = styled.div`
        background-image: url('${recipe.imgs[selectedImgIndex]}');
        background-size: cover;
        width: 200px;
        height: 200px;
    `;
    return <MainImgThumbnail />;
  }

  returnImgThumbnail(img, imageIndex, recipeIndex){
    let ImgThumbnail = styled.div`
        background-image: url('${img}');
        background-size: cover;
        width: 50px;
        height: 50px;
        display: inline-block;
    `
    let imgThumbnail = <ImgThumbnail key={imageIndex} onClick={()=>{this.editDefaultStateForSelectedImgs(recipeIndex, imageIndex)}}/>
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
    // let a = new Recipe('yo', 'yolo');
    // console.log(a)
    //recipes: title (string), imgs (arr), authorId(int), author (string), servings (string), instructions (arr), ingredients (arr)
            //ingredients: name (str), amount(str), tags(arr)
                //tags: name(str), display(boolean)
    let recipesList;
    if (this.props.recipes === null || this.props.recipes === undefined || this.state.currentRecipes === null) {
        recipesList = <p>Loading...</p>
    } else {
        recipesList = this.state.currentRecipes.map((recipe, recipeIndex) => {
            let recipeTitle = this.returnRecipeTitle(recipe, recipeIndex);

            //returns main image thumbnail
            let mainImgThumbnail;
            if(this.state.selectedImgs != null){
                mainImgThumbnail = this.returnMainImgThumbnail(recipe, recipeIndex, this.state.selectedImgs[recipeIndex]);
            } else {
                mainImgThumbnail = <p>Loading</p>
            };

            //returns each image thumbnail
            let imgThumbnails = recipe.imgs.map((img, imageIndex) => {
                return this.returnImgThumbnail(img, imageIndex, recipeIndex);
            });

            //filters and returns tag by display === true
            let displayTags = this.returnDisplayTags(recipe);


            return <div className="recipe-list-item" key={recipeIndex} style={{width: "600px", height: "500px"}}>
                        {recipeTitle}
                        {mainImgThumbnail}
                        <div style={{width: "600px", height: "100px"}}>
                            {imgThumbnails}
                        </div>
                        <div style={{height: "100px"}}>
                            {displayTags}
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