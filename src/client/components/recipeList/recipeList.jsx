import React from 'react';
import styled from 'styled-components';
import RecipeListItem from './recipeListItem';
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


  //changes each recipe's main image thumbnail on click
  editDefaultStateForSelectedImgIndexes(recipeIndex, imgIndexToChangeTo){
    let selectedImgIndexes = [...this.state.selectedImgIndexes];
    selectedImgIndexes[recipeIndex] = imgIndexToChangeTo;
    this.setState({selectedImgIndexes: selectedImgIndexes});
  }

  //selects and switches to selectedRecipe
  selectRecipeAndChangeMode(recipe, modeToChangeTo){
    this.props.selectRecipeAndChangeMode(recipe, modeToChangeTo);
  }

  componentDidMount(){
    this.filterRecipesToShow(this.props.mode);
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



            return <RecipeListItem
                        recipe={recipe}
                        recipeIndex={recipeIndex}
                        selectRecipeAndChangeMode={(e, e2)=>{this.selectRecipeAndChangeMode(e, e2)}}
                    />

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