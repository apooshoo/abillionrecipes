import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class RecipeListItem extends React.Component {
  constructor() {
    super();
    this.state = {
        currentRecipes: null,
        //default main img thumbnail
        selectedImgIndex: 0,
    };
  }

  changeMode(modeToChangeTo){
    this.props.changeMode(modeToChangeTo);
  }


  returnImgThumbnail(img, imgIndex){
    // let ImgThumbnail = styled.div`
    //     background-image: url('${img}');
    //     background-size: cover;
    //     width: 50px;
    //     height: 50px;
    //     display: inline-block;
    // `
    // let imgThumbnail = <ImgThumbnail key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndex(imgIndex)}}/>
    // return imgThumbnail;
    return <Image cloudName="moggle93" publicId={img} key={imgIndex} onClick={()=>{this.editDefaultStateForSelectedImgIndex(imgIndex)}} style={{cursor: "pointer"}}>
                <Transformation  width="50" height="50" crop="scale"/>
            </Image>
  }

  editDefaultStateForSelectedImgIndex(imgIndex){
    this.setState({selectedImgIndex: imgIndex});
  }

  returnDisplayTags(recipe){
    let recipeTags = [];
    recipe.ingredients.map((ingredient, ingredientIndex) => {
        ingredient.tags.forEach(tag => {
            if (tag.display === true){
                recipeTags.push(tag)
            };
        });
    });
    let displayTags;
    if (recipeTags === []){
        displayTags = <p>No public tags</p>
    } else {
        displayTags = recipeTags.map((displayTag, displayTagIndex) => {
            return <span key={displayTagIndex}>{displayTag.name}</span>
        });
    };
    return displayTags;
  }

  render() {
    let recipe = this.props.recipe;
    let recipeIndex = this.props.recipeIndex;

    let mainImgThumbnail = <Image cloudName="moggle93" publicId={recipe.imgs[this.state.selectedImgIndex]}
                                onClick={()=>{this.props.selectRecipeAndChangeMode(recipe, recipeIndex, "selectedRecipe")}}
                                style={{cursor: "pointer"}}
                                >
                                <Transformation width="200" height="200" crop="scale"/>
                            </Image>

    let imgThumbnails = recipe.imgs.map((img, imgIndex) => {
        return this.returnImgThumbnail(img, imgIndex);
    });

    let displayTags = this.returnDisplayTags(recipe);


    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2" key={recipeIndex}>
        <div className="card text-center shadow bg-white rounded">
        <div className="card-header" style={{cursor: "pointer"}}>{recipe.title}</div>
            <div className="card-body">
                {mainImgThumbnail}
                <div className="img-thumbnails-container">
                    {imgThumbnails}
                </div>
            </div>
            <div className="card-footer text-muted text-left">
                <span>Tags: </span>
                {displayTags}
            </div>
        </div>
      </div>
    );
  }
}

export default RecipeListItem;