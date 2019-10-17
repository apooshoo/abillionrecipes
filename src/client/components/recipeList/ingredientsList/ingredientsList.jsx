import React from 'react';
import styles from './style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Ingredient from '../ingredient/ingredient';

class IngredientsList extends React.Component {
  constructor() {
    super();
    this.state = {
        sortByTagsMode: false,
        columnHeaders: [],
        columnHeaderToEdit: null,
    };
  }

  toggleSortByTagsMode(){
    this.setState({sortByTagsMode: !this.state.sortByTagsMode});
  }

  addColumnHeader(columnHeader, editing = false){
    this.setState({columnHeaders: [...this.state.columnHeaders].concat({name: columnHeader, editing: editing})});
  }

  removeColumnHeader(columnHeaderIndex){
    let columnHeaders = [...this.state.columnHeaders];
    columnHeaders.splice(columnHeaderIndex, 1);
    this.setState({columnHeaders: columnHeaders});
  }

  selectColumnHeaderToToggleEdit(columnHeaderIndex){
    let columnHeaders = [...this.state.columnHeaders];
    columnHeaders[columnHeaderIndex].editing = !columnHeaders[columnHeaderIndex].editing;
    this.setState({columnHeaders: columnHeaders});
  }

  editColumnHeader(input, columnHeaderIndex){
    let columnHeaders = [...this.state.columnHeaders];
    columnHeaders[columnHeaderIndex].name = input;
    this.setState({columnHeaders: columnHeaders});
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
            if(columnHeader.editing === false){
                return (
                    <div className="column-header" style={{width: `${eachColumnWidthPercent}%`, backgroundColor: "yellow", display: "inline-block"}} key={columnHeaderIndex}>
                        <span>{columnHeader.name}</span>
                        <FontAwesomeIcon icon="edit" onClick={()=>{this.selectColumnHeaderToToggleEdit(columnHeaderIndex)}}/>
                        <FontAwesomeIcon icon="times" onClick={()=>{this.removeColumnHeader(columnHeaderIndex)}}/>
                    </div>
                )
            } else {
                return (
                    <div className="column-header" style={{width: `${eachColumnWidthPercent}%`, backgroundColor: "yellow", display: "inline-block"}} key={columnHeaderIndex}>
                        <input value={columnHeader.name} onChange={()=>{this.editColumnHeader(event.target.value, columnHeaderIndex)}}/>
                        <FontAwesomeIcon icon="check" onClick={()=>{this.selectColumnHeaderToToggleEdit(columnHeaderIndex)}}/>/>
                    </div>
                )
            }
        });


        let ingredientRows = this.props.ingredients.map((ingredient, ingredientIndex) => {
            //for each ingredient, try to place it in each column
            let ingredientColumns = [...this.state.columnHeaders].map((columnHeader, columnIndex) => {
                return (
                        <div className="ingredient-column" key={columnIndex} style={{width: `${eachColumnWidthPercent}%`, backgroundColor: "teal", display: "inline-block"}}>
                            <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode} toggleSortByTagsMode={()=>{this.toggleSortByTagsMode()}} columnHeader={columnHeader.name}/>
                        </div>
                )
            });

            return <React.Fragment key={ingredientIndex}>{ingredientColumns}</React.Fragment>
            // return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode}/>
        });

        return(
            <div>
                <div className="tags-icons-container" style={{width: "100%"}}>
                    <h5 style={{width: "80%", display: "inline-block"}}>Ingredients By Tags</h5>
                    <FontAwesomeIcon icon="plus" style={{marginRight: "10%"}} onClick={()=>{this.addColumnHeader("", true)}}/>
                    <FontAwesomeIcon icon="times" onClick={()=>{this.toggleSortByTagsMode()}}/>
                </div>
                <div className="tags-header-container" style={{width: "100%", backgroundColor: "pink", display: "block", position:"relative"}}>
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