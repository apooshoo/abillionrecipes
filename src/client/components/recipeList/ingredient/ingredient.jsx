import React from 'react';
import styled from 'styled-components';

import styles from './style.scss';

class Ingredient extends React.Component {
  constructor() {
    super();
    this.state = {
        display: true,
        open: true,
    };
  }

  toggleOpenAndClose(){
    this.setState({open: !this.state.open});
  }

  toggleDisplayAndHide(){
    this.setState({display: !this.state.display});
  }

  toggleSortByTagsMode(){
    this.props.toggleSortByTagsMode();
  }

  addColumnHeader(columnHeader){
    this.props.addColumnHeader(columnHeader);
  }

  toggleSortByTagsModeAndAddColumnHeader(columnHeader){
    this.addColumnHeader(columnHeader);
    this.toggleSortByTagsMode();
  }


  render() {
    let ingredient = this.props.ingredient;
    let ingredientIndex = this.props.ingredientIndex;
    let tags;

    if (this.props.sortByTagsMode === false){
        if (ingredient.tags != []){
            tags = ingredient.tags.map((tag, tagIndex) => {
                return <span key={tagIndex} onClick={()=>{this.toggleSortByTagsModeAndAddColumnHeader(tag.name)}}>{tag.name}</span>
            });
        } else {
            tags = <p>No tags</p>
        };

        return (
          <div className={styles.ingredient} style={{display: this.state.display ? false : 'none'}}>
            <span onClick={()=>{this.toggleOpenAndClose()}} style={{cursor: "pointer"}}>Ingredient: {ingredient.name}</span>
            <button onClick={()=>{this.toggleDisplayAndHide()}}>Hide</button>
            <div className={styles.collapsibleIngredientData} style={{display: this.state.open ? false : 'none'}}>
                <p>Amount: {ingredient.amount}</p>
                {tags}
            </div>
          </div>
        );
    } else {
        let ingredientInColumn;

        let columnHeader = this.props.columnHeader;

        let columnHeaderIncludedInTags;

        if (ingredient.tags != []){
            columnHeaderIncludedInTags = ingredient.tags.find(tag => {
                return tag.name.trim().toLowerCase() === columnHeader.trim().toLowerCase();
            });
        } else {
            //undefined = failed check
            columnHeaderIncludedInTags = undefined;
        }

        if (columnHeaderIncludedInTags != undefined){
            ingredientInColumn = <span draggable>{ingredient.name}</span>
        } else {
            ingredientInColumn = <span>---</span>
        }
        // if (ingredient.tags != []){
        //     tags = ingredient.tags.map((tag, tagIndex) => {
        //         return <span key={tagIndex} onClick={()=>{this.toggleSortByTagsMode()}}>{tag.name}</span>
        //     });
        // } else {
        //     tags = <p>No tags</p>
        // };

        return (
            <React.Fragment>
                {ingredientInColumn}
            </React.Fragment>
        );
    };
  }
}

export default Ingredient;