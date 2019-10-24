import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';

//RETURNS PAGE HEADER AND BACK BUTTON
class TagForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  // updateIngredientInput(ingredientIndex, ingredientCategory, inputValue){
  //   this.props.updateIngredientInput(ingredientIndex, ingredientCategory, inputValue);
  // }
  updateTagsInput(tagIndex, tagCategory, inputValue){
    this.props.updateTagsInput(tagIndex, tagCategory, inputValue);
  }

  render() {
    let tag = this.props.tag;
    let tagIndex = this.props.tagIndex;


    return (
      <div className="tag-item shadow-sm px-4 py-3 mb-1 bg-white rounded">

        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Tag Name: </span>
            </div>
            <input type="text" className="form-control" id={"tag-name-input"} value={tag.name} onChange={()=>{this.updateTagsInput(tagIndex, "name", event.target.value)}}/>
        </div>

        <div className="input-group" style={{position: "relative"}}>
            <div className="input-group-prepend mr-1">
                <span className="input-group-text">Make Public: </span>
            </div>
            <input id={"tag-display-input"} type="checkBox" style={{width: "40px", height: "40px"}} value={tag.display} onChange={()=>{this.updateTagsInput(tagIndex, "display", !tag.display)}}/>
        </div>

      </div>
    );
  }
}

export default TagForm;