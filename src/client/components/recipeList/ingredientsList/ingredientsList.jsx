import React from 'react';
import styles from './style.scss';

import Ingredient from '../ingredient/ingredient';

class IngredientsList extends React.Component {
  constructor() {
    super();
    this.state = {
        sortByTagsMode: false,
        columnHeaders: ["eggs", "dry"],
    };
  }

  toggleSortByTagsMode(){
    this.setState({sortByTagsMode: !this.state.sortByTagsMode});
  }

  addColumnHeader(columnHeader){
    this.setState({columnHeaders: [...this.state.columnHeaders].concat(columnHeader)});
  }

  render() {
    if (this.state.sortByTagsMode === false){
        let ingredients = this.props.ingredients.map((ingredient, ingredientIndex) => {
            return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode} toggleSortByTagsMode={()=>{this.toggleSortByTagsMode()}} addColumnHeader={(e)=>{this.addColumnHeader(e)}}/>
        });

        return (
          <div>
            {ingredients}
          </div>
        );
    } else {
        let numberOfRows = this.props.ingredients.length -1;
        let numberOfColumns = this.state.columnHeaders.length;
        let eachColumnWidthPercent = 100 / numberOfColumns;
        let columnHeaders = this.state.columnHeaders.map((columnHeader, columnHeaderIndex) => {
            return (
                <div className="column-header" style={{width: `${eachColumnWidthPercent}%`, backgroundColor: "yellow", display: "inline-block"}} key={columnHeaderIndex}>
                    <p>{columnHeader}</p>
                </div>
            )
        });


        let ingredientRows = this.props.ingredients.map((ingredient, ingredientIndex) => {
            //for each ingredient, try to place it in each column
            let ingredientColumns = [...this.state.columnHeaders].map((columnHeader, columnIndex) => {
                return (
                        <div className="ingredient-column" key={columnIndex} style={{width: `${eachColumnWidthPercent}%`, backgroundColor: "teal", display: "inline-block"}}>
                            <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode} toggleSortByTagsMode={()=>{this.toggleSortByTagsMode()}} columnHeader={columnHeader}/>
                        </div>
                )
            });

            return <React.Fragment key={ingredientIndex}>{ingredientColumns}</React.Fragment>
            // return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode}/>
        });

        return(
            <div>
                <div className="tags-header-container" style={{width: "100%", backgroundColor: "pink", display: "block"}}>
                    {columnHeaders}
                </div>
                <div className="tags-ingredients-container" style={{width: "100%", backgroundColor: "pink", display: "block"}}>
                    {ingredientRows}
                </div>
            </div>
        )
    }
  }
}

export default IngredientsList;