import React from 'react';
import styled from 'styled-components';
import RecipeListItem from './recipeListItem/recipeListItem';
import SearchBar from '../searchBar/searchBar';
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
        sortedCurrentRecipes: null,
        showSortedRecipes: false, //true or false to show if searching or not

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
  selectRecipeAndChangeMode(recipe, recipeIndex, modeToChangeTo){
    this.props.selectRecipeAndChangeMode(recipe, recipeIndex, modeToChangeTo);
  }

  filterCurrentRecipesBySearch(searchInputValue, searchCategory){
    if (searchInputValue.trim() === ""){
        if (this.state.showSortedRecipes === true){
            this.setState({showSortedRecipes: false});
        }
    } else {
        let currentRecipes = [...this.state.currentRecipes];
        let filteredCurrentRecipes;

        switch (searchCategory) {
            case "title":
                filteredCurrentRecipes = currentRecipes.filter(recipe => {
                    //if recipe title includes searchValue, return recipe
                    return recipe.title.trim().toLowerCase().includes(searchInputValue.trim().toLowerCase());
                });
            break;
            case "ingredient":
                // category = recipe.ingredients;
                filteredCurrentRecipes = currentRecipes.filter(recipe => {
                    //goes through each ingredient. Returns those that include searchValue.
                    let ingredientPresent = recipe.ingredients.filter((ingredient, ingredientIndex) => {
                        return ingredient.name.trim().toLowerCase().includes(searchInputValue.trim().toLowerCase());
                    });

                    //if there is at least one ingredient returned, return recipe.
                    return ingredientPresent.length > 0;
                });
            break;
            case "tag":
                filteredCurrentRecipes = currentRecipes.filter(recipe => {
                    //cycles through each ingredient
                    let ingredientWithTagsPresent = recipe.ingredients.filter((ingredient) => {
                        //goes through each tag of that ingredient, returns those that include searchValue
                        let tagsPresent = ingredient.tags.filter(tag => {
                            return tag.name.trim().toLowerCase().includes(searchInputValue.trim().toLowerCase());
                        });
                        //if ingredient has at least one tag returned, return ingredient
                        return tagsPresent.length > 0;
                    });
                    //if recipe has at least one ingredient that has at least one tag that includes search value, return recipe
                    return ingredientWithTagsPresent.length > 0;
                });
            break;
        };

        if (this.state.showSortedRecipes === false){
            this.setState({showSortedRecipes: true});
        };

        this.setState({sortedCurrentRecipes: filteredCurrentRecipes});
    };
  }

  componentDidMount(){
    this.filterRecipesToShow(this.props.mode);
  }

  componentDidUpdate(){
    // console.log(this.state)
  }


  render() {
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
        let recipes = this.state.showSortedRecipes ? [...this.state.sortedCurrentRecipes] : [...this.state.currentRecipes];
        recipesList = recipes.map((recipe, recipeIndex) => {

            return <RecipeListItem
                        recipe={recipe}
                        recipeIndex={recipeIndex}
                        key={recipeIndex}
                        selectRecipeAndChangeMode={(e, e2, e3)=>{this.selectRecipeAndChangeMode(e, e2, e3)}}
                    />

        });
    };

    return (
      <div className="recipe-list">
        <SearchBar filterCurrentRecipesBySearch={(e1, e2)=>{this.filterCurrentRecipesBySearch(e1, e2)}}/>
        {recipesList}
      </div>
    );
  }
}

export default RecipeList;