import React from 'react';
import styled from 'styled-components';

import styles from './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  onDragStart(e, ingredient, ingredientIndex){
    this.props.onDragStart(e, ingredient, ingredientIndex);
  }

  render() {
    let ingredient = this.props.ingredient;
    let ingredientIndex = this.props.ingredientIndex;
    let tags;

    if (this.props.sortByTagsMode === false){
        if (ingredient.tags != []){
            tags = ingredient.tags.map((tag, tagIndex) => {
                return <span className="badge badge-pill badge-light font-weight-light" key={tagIndex} onClick={()=>{this.toggleSortByTagsModeAndAddColumnHeader(tag.name)}} style={{cursor: "pointer"}}>{tag.name}</span>
            });
        } else {
            tags = <span>~</span>
        };

        return (
          <div className="shadow-sm p-3 mb-1 pl-5 bg-white rounded" style={{display: this.state.display ? false : 'none'}}>
            <span>{ingredient.name}</span>
            <FontAwesomeIcon className="mx-5" icon={this.state.open ? "angle-down" : "angle-left"} onClick={()=>{this.toggleOpenAndClose()}} style={{cursor: "pointer"}}/>
            <FontAwesomeIcon icon="times" onClick={()=>{this.toggleDisplayAndHide()}} style={{cursor: "pointer"}}/>
            <hr/>
            <div style={{display: this.state.open ? false : 'none'}}>
                <p style={{marginBottom: "0px"}}>Amount: {ingredient.amount}</p>
                <span>Tags: </span>
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
            ingredientInColumn = <span draggable onDragStart={()=>{this.onDragStart(event, ingredient, ingredientIndex)}}>{ingredient.name}</span>
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