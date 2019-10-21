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
      <div className="tag-item">

        <div>
            <label htmlFor={"tag-name-input"}>Tag Name: </label>
            <input id={"tag-name-input"} value={tag.name} onChange={()=>{this.updateTagsInput(tagIndex, "name", event.target.value)}}/>
        </div>

        <div>
            <label htmlFor={"tag-display-input"}>Make Public</label>
            <input id={"tag-display-input"} type={"checkBox"} value={tag.display} onChange={()=>{this.updateTagsInput(tagIndex, "display", !tag.display)}}/>
        </div>

      </div>
    );
  }
}

export default TagForm;