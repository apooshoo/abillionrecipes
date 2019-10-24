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

  addTagToRecipe(recipeIndex, ingredientIndex, tagName, tagDisplay){
    this.props.addTagToRecipe(recipeIndex, ingredientIndex, tagName, tagDisplay);
  }

  onDragOver(e){
    e.preventDefault();
  }

  onDragStart(e, ingredient, ingredientIndex){
    console.log('dragstart', ingredient);
    //sets name and content of data in dataTransfer
    //NOTE TO SELF: dataTransfer ONLY STORES STRINGS, so stringify objects
    e.dataTransfer.setData("ingredient", JSON.stringify(ingredient));
    e.dataTransfer.setData("ingredientIndex", ingredientIndex);
  }

  //can add more parameters to customize if you want, eg: tag public: T/F
  onDrop(e, columnHeader){
    let ingredient = JSON.parse(e.dataTransfer.getData("ingredient"));
    let ingredientIndex = e.dataTransfer.getData("ingredientIndex");
    console.log('dropping')
    console.log(ingredient);
    console.log(ingredientIndex)
    console.log('header', columnHeader);

    let tagAlreadyAdded = false;
    let checkForTag = ingredient.tags.forEach(tag => {
        if (tag.name === columnHeader.name){
            console.log('tag already present, stop add tag')
            tagAlreadyAdded = true;
        };
    });

    if (tagAlreadyAdded === false){
        // let newTag = new Tag(columnHeader.name, false);
        // ingredient.tags.push(newTag);
        this.addTagToRecipe(this.props.recipeIndex, ingredientIndex, columnHeader.name, false)
    }
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
                    <div className="shadow-sm p-3 bg-white rounded text-center" style={{width: `${eachColumnWidthPercent}%`, display: "inline-block"}}
                        key={columnHeaderIndex}
                        onDragOver={()=>{this.onDragOver(event)}}
                        onDrop={()=>{this.onDrop(event, columnHeader)}}
                    >
                        <span>{columnHeader.name}</span>
                        <FontAwesomeIcon className="mx-2" icon="edit" onClick={()=>{this.selectColumnHeaderToToggleEdit(columnHeaderIndex)}}/>
                        <FontAwesomeIcon icon="times" onClick={()=>{this.removeColumnHeader(columnHeaderIndex)}}/>
                    </div>
                )
            } else {
                return (
                    <div className="shadow-sm p-3 bg-white rounded text-center" style={{width: `${eachColumnWidthPercent}%`, display: "inline-block"}} key={columnHeaderIndex}>
                        <input value={columnHeader.name} onChange={()=>{this.editColumnHeader(event.target.value, columnHeaderIndex)}}/>
                        <FontAwesomeIcon className="mx-2" icon="check" onClick={()=>{this.selectColumnHeaderToToggleEdit(columnHeaderIndex)}}/>
                    </div>
                )
            }
        });


        let ingredientRows = this.props.ingredients.map((ingredient, ingredientIndex) => {
            //for each ingredient, try to place it in each column
            let ingredientColumns = [...this.state.columnHeaders].map((columnHeader, columnIndex) => {
                return (
                        <div className="text-center" key={columnIndex} style={{width: `${eachColumnWidthPercent}%`, display: "inline-block"}}>
                            <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex}
                                sortByTagsMode={this.state.sortByTagsMode}
                                toggleSortByTagsMode={()=>{this.toggleSortByTagsMode()}}
                                columnHeader={columnHeader.name}
                                onDragStart={(e, e2, e3)=>{this.onDragStart(e, e2, e3)}}
                                />
                        </div>
                )
            });

            return <React.Fragment key={ingredientIndex}>{ingredientColumns}</React.Fragment>
            // return <Ingredient key={ingredientIndex} ingredient={ingredient} ingredientIndex={ingredientIndex} sortByTagsMode={this.state.sortByTagsMode}/>
        });

        return(
            <div>
                <div className="tags-icons-container" style={{width: "100%"}}>
                    <span className="pl-3" style={{width: "80%", display: "inline-block"}}>Ingredients By Tags</span>
                    <FontAwesomeIcon icon="plus" style={{marginRight: "10%"}} onClick={()=>{this.addColumnHeader("", true)}}/>
                    <FontAwesomeIcon icon="times" onClick={()=>{this.toggleSortByTagsMode()}}/>
                </div>
                <div className="tags-header-container" style={{width: "100%", display: "block", position:"relative"}}>
                    {columnHeaders}
                </div>
                <div className="tags-ingredients-container" style={{width: "100%", display: "block"}}>
                    {ingredientRows}
                </div>
            </div>
        )
    }
  }
}

export default IngredientsList;