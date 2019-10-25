import React from 'react';

import styles from './style.scss';
import PageHeader from '../pageHeader/pageHeader';
import Home from '../home/home';
// import SearchBar from '../searchBar/searchBar';
import RecipeList from '../recipeList/recipeList';
import SelectedRecipe from '../recipeList/selectedRecipe/selectedRecipe';

import CreateForm from '../createForms/createForm/createForm';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {Recipe} from '../recipeList/recipeList';

export class Tag {
    constructor(name, display) {
        this.name = name,
        this.display = display
    }
}


export class Error {
    constructor(category, text){
        this.category = category,
        this.text = text
    }
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        //assumes login as userId 1
        userId: 1,
        username: 'Jonathan',
        mode: "dashboard",
        modeHistory: ["dashboard"],
        //modes: dashboard, explore, see yours, create, selectedRecipe
        selectedRecipe: null,
        selectedRecipeIndex: null,
        //recipes: title (string), recipeId(int), imgs (arr), authorId(int), author (string), servings (string), instructions (arr), ingredients (arr)
            //ingredients: name (str), amount(str), tags(arr)
                //tags: name(str), display(boolean)
        recipes: [
            {
                title: "Omelette",
                recipeId: 1,
                imgs: [
                    "omelette1_tdhhc1",
                    "omelette2_snquv6"
                ],
                authorId: 1,
                author: "Jonathan",
                servings: '1 person',
                ingredients: [
                    {
                        name: "eggs",
                        amount: "2",
                        tags: [{name: "eggs", display: true}, {name: "dry", display: false}]
                    },
                    {
                        name: "water",
                        amount: "2 tablespoons",
                        tags: [{name: "wet", display: false}]
                    },
                    {
                        name: "salt",
                        amount: "1/8 tablespoons",
                        tags: [{name: "dry", display: false}]
                    },
                    {
                        name: "pepper",
                        amount: "a dash",
                        tags: [{name: "dry", display: false}]
                    },
                    {
                        name: "butter",
                        amount: "1 tablespoon",
                        tags: [{name: "dry", display: false}]
                    },
                    {
                        name: "fillings",
                        amount: "1/3 to 1/2 cups",
                        tags: [{name: "dry", display: false}]
                    }
                ],
                instructions: [
                    "BEAT eggs, water, salt and pepper in small bowl until blended.",
                    "HEAT butter in 7 to 10-inch nonstick omelet pan or skillet over medium-high heat until hot. TILT pan to coat bottom. POUR IN egg mixture. Mixture should set immediately at edges.",
                    "GENTLY PUSH cooked portions from edges toward the center with inverted turner so that uncooked eggs can reach the hot pan surface. CONTINUE cooking, tilting pan and gently moving cooked portions as needed.",
                    "When top surface of eggs is thickened and no visible liquid egg remains, PLACE filling on one side of the omelet. FOLD omelet in half with turner. With a quick flip of the wrist, turn pan and INVERT or SLIDE omelet onto plate. SERVE immediately."
                ]
            },
            {
                title: "Home-made Udon Noodles",
                recipeId: 2,
                imgs: [
                    "udon1_hsniaa",
                    "udon2_c1bbth",
                    "udon3_pibw5b",
                    "udon4_mbxpev"
                    ],
                authorId: 2,
                author: "Masaharu Morimoto",
                servings: "6 people",
                ingredients: [
                    {
                        name: "all-purpose flour, sifted",
                        amount: "600g",
                        tags: [{name: "dry", display: false}]
                    },
                    {
                        name: "kosher salt",
                        amount: "1 tablespoon plus 1 teaspoon",
                        tags: [{name: "dry", display: false}]
                    },
                    {
                        name: "water",
                        amount: "2 1/4 cups",
                        tags: [{name: "wet", display: false}]
                    }
                ],
                instructions: [
                    "In a large mixing bowl, combine flour and salt. Add 1 1/4 cups water. Use hands to mix until dough starts to come together in a few large lumps. Firmly press and knead the dough, incorporating any loose flour until there is none left. If necessary, add a little more water, 1 tablespoon at a time, until you can incorporate all of the flour.",
                    "Lightly dust work surface with flour. Knead dough (folding and firmly pressing with your palm, folding and pressing forcefully) until dough looks and feels fairly smooth, about 5 minutes. Form dough into ball, wrap in plastic wrap, and let rest at room temperature for 1-5 hours.",
                    "On a lightly floured surface with ample room, knead it again for a few minutes. Divide dough into 4 equal-sized balls. Dust each ball with flour and cover with plastic wrap until ready to roll out.",
                    "Use rolling pin to roll out the dough, occasionally rotating the dough 90 degrees and lightly using with flour if it threatens to stick to the pin, until just between 1/8″ to under 1/4″ thick. If the dough is too difficult to roll out, cover with plastic wrap, let rest for 10 minutes, and then resume. This rest allows the gluten to relax and makes it easier to roll out.",
                    "Fold the sheet of dough into thirds (like a letter fold) and then slice widthwise into approximately 1/8″ thick noodles. Gently separate the noodles and toss them with a little bit of flour, just so they don’t stick together. Cook right away.",
                    "Bring a large pot of water to boil and prepare a large bowl of icy water. Add noodles to boiling water, stirring frequently and adding 1/4 cup fresh water if the water threatens to bubble over, until they are fully cooked but not mushy, 7-12 minutes (depends on how thick your noodles are). Unlike Italian pasta, Japanese noodles shouldn’t be al-dente, but don’t let them get mushy.)",
                    "Drain noodles, transfer to icy water. Briefly and gently rub the noodles with hands to remove some of the starch. Drain from cold water."
                ]
            },
            {
                title: "Homemade Ice Cream",
                recipeId: 3,
                imgs: [
                    "icecream1",
                    "icecream2"
                ],
                authorId: 1,
                author: "Jonathan",
                servings: "6",
                ingredients: [
                    {
                        name: "heavy cream",
                        amount: "1 3/4 cups",
                        tags: [{name: "dry", public: false}],
                    },
                    {
                        name: "whole milk",
                        amount: "1 1/4 cups",
                        tags: [{name: "wet", public: false}, {name: "milk", public: true}]
                    },
                    {
                        name: "sugar",
                        amount: "3/4 cups",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "fine sea salt",
                        amount: "1/8 teaspoons",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "vanilla extract OR vanilla bean split in half lengthwise",
                        amount: "1 of either",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "OPTIONAL: add-ins: soft brownies, cookies etc",
                        amount: "2 cups",
                        tags: [{name: "dry", public: false}]
                    }
                ],
                instructions: [
                    "Pour 1 cup of the cream into a saucepan and add the sugar, salt. Scrape the seeds of the vanilla bean into the pot and then add the vanilla pod to the pot.",
                    "Warm the mixture over medium heat, just until the sugar dissolves. Remove from the heat and add the remaining cream, milk, and vanilla. Stir to combine and chill in the refrigerator.",
                    "When ready to churn, remove the vanilla pod, whisk mixture again and pour into ice cream maker. Churn according to the manufacturer’s instructions.",
                    "Transfer the finished ice cream to an airtight container and place in the freezer until ready to serve."
                ]
            },
            {
                title: "mille crepe",
                recipeId: 4,
                imgs: [
                    "mille1",
                    "mille2",
                    "mille3"
                ],
                authorId: 3,
                author: "Hannah Williams",
                servings: "8",
                ingredients: [
                    {
                        name: "butter",
                        amount: "6 tablespoons",
                        tags: [],
                    },
                    {
                        name: "milk",
                        amount: "675 ml",
                        tags: [{name: "wet", public: false}, {name: "milk", display: true}]
                    },
                    {
                        name: "eggs",
                        amount: "6",
                        tags: [{name: "dry", public: false}, {name: "eggs", public: true}]
                    },
                    {
                        name: "flour",
                        amount: "210 g",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "cocoa powder",
                        amount: "80 g",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "sugar",
                        amount: "7 tablespoons",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "whipped cream",
                        amount: "1 litre",
                        tags: [{name: "dry", public: false}]
                    }
                ],
                instructions: [
                    "Make the crepes by melting the butter and allowing it to brown slightly. Set aside.",
                    "In the same pot, warm the milk. Remove from heat.",
                    "In a bowl, whisk flour, cocoa powder, and sugar. Mix in eggs.",
                    "Gradually mix in butter and warm milk. Chill.",
                    "On a nonstick skillet over medium heat, pour ¼ cup (60 ml) of crepe batter, and tip the pan to cover the entire bottom surface. Cook until bottom surface of crepe begins to brown, then flip.",
                    "Cool crepe. Repeat until all of the crepe batter is used.",
                    "Stack crepes on top of each other, with whipped cream between each layer. Once assembled, trim edges for a cleaner look, if desired.",
                    "Enjoy!"
                ]
            },
            {
                title: "chocolate chip cookies",
                recipeId: 5,
                imgs: [
                    "cck1",
                    "cck2"
                ],
                authorId: 4,
                author: "Alvin Zhou",
                servings: "30 cookies",
                ingredients: [
                    {
                        name: "butter",
                        amount: "460 g, melted",
                        tags: [{name: "dry", public: false}],
                    },
                    {
                        name: "brown sugar",
                        amount: "440 g, packed",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "granulated sugar",
                        amount: "400 g",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "eggs",
                        amount: "4 large",
                        tags: [{name: "dry", public: false}, {name: "eggs", public: true}]
                    },
                    {
                        name: "vanilla extract",
                        amount: "1 tablespoon",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "all-purpose flour",
                        amount: "625 g",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "baking powder",
                        amount: "2 teaspoons",
                        tags: [{name: "dry", public: false}]
                    },
                    {
                        name: "chocolate chips",
                        amount: "700 g",
                        tags: [{name: "dry", public: false}]
                    }
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C).",
                    "In a large bowl, whisk together the brown sugar, granulated sugar, and melted butter, until evenly combined and light in color.",
                    "Add in the eggs and vanilla, mixing until smooth.",
                    "Add the flour and baking powder, folding the mixture until it forms a smooth dough.",
                    "Fold in the chocolate chips until evenly combined.",
                    "Using an ice cream scoop, scoop 6 balls of dough onto a baking tray lined with parchment paper.",
                    "Bake for 12 minutes, then serve!"
                ]
            }
        ],
        errors: [],
    };
  }

  changeMode(modeToChangeTo){
    // console.log("modeToChangeTo:", modeToChangeTo);
    this.setState({modeHistory: [...this.state.modeHistory].concat(this.state.mode)});
    this.setState({mode: modeToChangeTo});
  }

  revertMode(){
    let modeHistory = [...this.state.modeHistory];
    let prev = modeHistory[modeHistory.length-1];
    modeHistory.pop();
    this.setState({mode: prev, modeHistory: modeHistory});
  }

  selectRecipeAndChangeMode(recipe, recipeIndex, modeToChangeTo){
    console.log("selecting")
    this.setState({selectedRecipe: recipe, selectedRecipeIndex: recipeIndex});
    this.changeMode(modeToChangeTo);
  }

  addTagToRecipe(recipeIndex, ingredientIndex, tagName, tagDisplay){
    let newTag = new Tag(tagName, tagDisplay);
    let recipes = [...this.state.recipes];
    let recipe = recipes[recipeIndex];

                            //CHANGE THIS WHEN DATABASE IS INCLUDED. Refer instead to relational table:
                            //search users_recipes for recipe.recipeId where userId = this.state.userId,
                            //if returns result, user owns this recipe and can edit.

    //if validate user to have permission, allow edit
    if (this.state.userId === recipe.authorId){
        console.log('allow edit');
        recipe.ingredients[ingredientIndex].tags.push(newTag);
        this.setState({recipes: recipes});
    //else, stop edit and prompt user to save their own editable copy
    } else {
        console.log('do not allow edit, no permission');
        console.log('prompt user to make a save a copy');
    }
  }

// export class Error {
//     constructor(category, text){
//         this.category = category,
//         this.text = text,
//     }
// }

  validateInputs(recipeToAdd){
    console.log("VALIDATING RECIPE", recipeToAdd)
    let errors = [null, null, null, null, null, null]

    //////////////////////////////////////////////////Validate Title
        //check if title already exists
    let titleAlreadyExistsBoolean = false;
    [...this.state.recipes].forEach(recipeInDatabase => {
        if (recipeInDatabase.title.trim().toLowerCase() === recipeToAdd.title.trim().toLowerCase()){
            titleAlreadyExistsBoolean = true;
        };
    });
    //title
    if (recipeToAdd.title.length < 3){
        errors[0] = new Error("title", "Title must have at least 3 characters.");
    //already exists
    } else if (titleAlreadyExistsBoolean === true){
        errors[0] = new Error("title", "A recipe by that title already exists.");
    } else {
        errors[0] = null;
    };
    //////////////////////////////////////////////////Validate Title

    //////////////////////////////////////////////////Validate Servings
    if (recipeToAdd.servings.length < 1){
        errors[1] = new Error("servings", "Servings field is empty");
    };
    //////////////////////////////////////////////////Validate Servings

    //////////////////////////////////////////////////Validate Ingredients
    //check if ingredients empty
    if (recipeToAdd.ingredients === []){
        errors[2] = new Error("ingredients", "Recipes must at least one ingredient.");
    } else {
        recipeToAdd.ingredients.forEach((ingredient, ingredientIndex) => {
            //check tags
            //note: not required in add, but in case of edit
            if (ingredient.tags != []){
                ingredient.tags.forEach((tag, tagIndex) => {
                    if (tag.name.length < 1){
                        errors[3] = new Error("tags", "Tag name field is empty");
                        console.log('tag name error')
                    } else {
                        errors[3] = null;
                        console.log('no tag error')
                    }
                });
            };

            if(ingredient.name.length < 1){
                errors[2] = new Error("ingredients", "Ingredient name field is empty");
            } else if (ingredient.amount.length < 1){
                errors[2] = new Error("ingredients", "Ingredient amount field is empty");
            } else {
                errors[2] = null;
            };
        });
    };
    //////////////////////////////////////////////////Validate Ingredients

    //////////////////////////////////////////////////Validate Instructions
    if (recipeToAdd.instructions === []){
        errors[4] = new Error("instructions", "Recipes must at least one instruction.")
        console.log('empty instructions error')
    } else {
        recipeToAdd.instructions.forEach((instruction, instructionIndex) => {
            if (instruction.length < 1){
                errors[4] = new Error("instructions", "Instruction field is empty");
                console.log('instruction error')
            };
        });
    };
    //////////////////////////////////////////////////Validate Instructions

    //////////////////////////////////////////////////Validate Imgs
    if(recipeToAdd.imgs.length < 1){
        errors[5] = new Error("imgs", "Recipes must have at least one image")
        console.log('empty imgs error');
    };

    //////////////////////////////////////////////////Validate Imgs

    console.log(errors)
    let errorCount = 0;
    errors.forEach(error => {
        if (error != null){
            errorCount += 1;
        };
    });
    if(errorCount === 0 ){
        return true;
    } else {
        return false;
    }
  }
//   export class Recipe {
//     constructor(title, authorId, author, servings, ingredients, recipeId = null) {
//         this.title = title,
//         this.authorId = authorId,
//         this.author = author,
//         this.servings = servings,
//         this.ingredients = ingredients
//     }
// }

  addRecipe(recipe){
    let proceedWithAddRecipe = this.validateInputs(recipe); //returns true or false
    if (proceedWithAddRecipe === true){
        let newRecipe = recipe;
        let recipes = [...this.state.recipes];
        //for now, without database, set recipeId here
        let newRecipeId = recipes.length + 1;
        newRecipe.recipeId = newRecipeId;

        this.setState({recipes: recipes.concat(newRecipe)});
    } else {
        console.log('aborting add recipe');
        //highlight errors?
    };
  }

  componentDidUpdate(){
    // console.log(this.state)
  }


  render() {
    // console.log(this.state.recipes)
    let pageHeader;
    let pageContent;
    switch (this.state.mode) {
        //dashboard shows three buttons, explore, see yours and create
        case "dashboard":
            pageHeader = <PageHeader pageHeader={"Home"} revertMode={null}/>
            pageContent = <Home
                            changeMode={(e)=>this.changeMode(e)}
                        />
        break;
        //shows all recipes
        case "explore":
            pageHeader = <PageHeader pageHeader={"Explore"} revertMode={()=>{this.revertMode()}}/>
            pageContent = <React.Fragment>
                            <RecipeList recipes={this.state.recipes} mode={this.state.mode} userId={this.state.userId}
                                selectRecipeAndChangeMode={(e, e2, e3)=>{this.selectRecipeAndChangeMode(e, e2, e3)}}
                            />
                          </React.Fragment>
        break;
        //shows all recipes where
            //with database: recipeId is in users_Recipes table (users_Recipes.userId === userId)
            //without: userId === authorId
        case "see yours":
            pageHeader = <PageHeader pageHeader={"See Yours"} revertMode={()=>{this.revertMode()}}/>
            pageContent = <React.Fragment>
                            <RecipeList recipes={this.state.recipes} mode={this.state.mode} userId={this.state.userId}
                                selectRecipeAndChangeMode={(e, e2, e3)=>{this.selectRecipeAndChangeMode(e, e2, e3)}}
                            />
                          </React.Fragment>
        break;
        case "create":
            pageHeader = <PageHeader pageHeader={"Create"} revertMode={()=>{this.revertMode()}}/>
            pageContent = <CreateForm
                            userId={this.state.userId}
                            username={this.state.username}
                            addRecipe={(e)=>{this.addRecipe(e)}}
                            />
        break;
        //displays a recipe when you select from above
        case "selectedRecipe":
            pageHeader = <PageHeader pageHeader={this.state.selectedRecipe.title}revertMode={()=>{this.revertMode()}}/>
            pageContent = <React.Fragment>
                            <SelectedRecipe
                                recipe={this.state.selectedRecipe}
                                recipeIndex={this.state.selectedRecipeIndex}
                               addTagToRecipe={(e1, e2, e3, e4)=>{this.addTagToRecipe(e1, e2, e3, e4)}}
                            />
                          </React.Fragment>
        break;
    }

    return (
      <div className="row overflow-hidden" style={{height: "100vh", padding: "10px"}}>
        {/* header = string, backButton = function to change mode */}
        <div className="col-12" style={{height: "10vh"}}>
            {pageHeader}
        </div>
        <div className="col-12 overflow-auto" style={{height: "80vh"}}>
            {pageContent}
        </div>
      </div>
    );
  }
}

export default Dashboard;