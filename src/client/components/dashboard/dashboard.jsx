import React from 'react';

import styles from './style.scss';
import PageHeader from '../pageHeader/pageHeader';
import Home from '../home/home';
import SearchBar from '../searchBar/searchBar';
import RecipeList from '../recipeList/recipeList';
import SelectedRecipe from '../recipeList/selectedRecipe/selectedRecipe';

// import {Recipe} from '../recipeList/recipeList';
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        //assumes login as userId 1
        userId: 1,
        mode: "dashboard",
        modeHistory: ["dashboard"],
        //modes: dashboard, explore, see yours, create, selectedRecipe
        selectedRecipe: null,
        //recipes: title (string), recipeId(int), imgs (arr), authorId(int), author (string), servings (string), instructions (arr), ingredients (arr)
            //ingredients: name (str), amount(str), tags(arr)
                //tags: name(str), display(boolean)
        recipes: [
            {
                title: "Omelette",
                recipeId: 1,
                imgs: [
                    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/omelette.jpg?itok=7K3AxA-w",
                    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-an-omelette-horizontal-1542310072.png?crop=0.616xw:0.923xh;0.218xw,0.0281xh&resize=480:*"
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
                    "/homemade-udon.jpg",
                    "https://steamykitchen.com/wp-content/uploads/2016/12/homemade-udon-noodles-recipe-morimoto-1-2.jpg",
                    "https://steamykitchen.com/wp-content/uploads/2016/12/homemade-udon-noodles-recipe-morimoto-4.jpg"
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
            }
        ],
    };
  }

  changeMode(modeToChangeTo){
    // console.log("modeToChangeTo:", modeToChangeTo);
    this.setState({modeHistory: [...this.state.modeHistory].concat(this.state.mode)});
    this.setState({mode: modeToChangeTo});
  }

  revertMode(){
    console.log(modeHistory)
    let modeHistory = [...this.state.modeHistory];
    let prev = modeHistory[modeHistory.length-1];
    modeHistory.pop();
    console.log(modeHistory)
    this.setState({mode: prev, modeHistory: modeHistory});
  }

  selectRecipeAndChangeMode(recipe, modeToChangeTo){
    console.log("selecting")
    this.setState({selectedRecipe: recipe});
    this.changeMode(modeToChangeTo);
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    let pageHeader;
    let pageContent;
    switch (this.state.mode) {
        //shows three buttons, explore, see yours and create
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
                            <SearchBar />
                            <RecipeList recipes={this.state.recipes} mode={this.state.mode} userId={this.state.userId}
                                selectRecipeAndChangeMode={(e, e2)=>{this.selectRecipeAndChangeMode(e, e2)}}
                            />
                          </React.Fragment>
        break;
        case "see yours":
            pageHeader = <PageHeader pageHeader={"See Yours"} revertMode={()=>{this.revertMode()}}/>
            pageContent = <React.Fragment>
                            <SearchBar />
                            <RecipeList recipes={this.state.recipes} mode={this.state.mode} userId={this.state.userId}
                                selectRecipeAndChangeMode={(e, e2)=>{this.selectRecipeAndChangeMode(e, e2)}}
                            />
                          </React.Fragment>
        break;
        case "create":
            pageHeader = <PageHeader pageHeader={"Create"} revertMode={()=>{this.revertMode()}}/>
            pageContent = <p>Forms Placeholder</p>
        break;
        case "selectedRecipe":
            pageHeader = <PageHeader pageHeader={this.state.selectedRecipe.title}revertMode={()=>{this.revertMode()}}/>
            pageContent = <React.Fragment>
                            <SelectedRecipe recipe={this.state.selectedRecipe}/>
                          </React.Fragment>
        break;
    }

    return (
      <div className={styles.page}>
        {/* header = string, backButton = function to change mode */}
        <div className={styles.pageHeader}>
            {pageHeader}
        </div>
        <div className={styles.pageContent}>
            {pageContent}
        </div>
      </div>
    );
  }
}

export default Dashboard;