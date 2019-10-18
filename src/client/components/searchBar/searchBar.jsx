import React from 'react';

// import styles from './style.scss';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
        searchInput: "",
        searchCategory: "title",
    };
  }

  searchInputHandler(e){
    let inputValue = e.target.value;
    this.setState({searchInput: inputValue});

    //filter
    this.filterCurrentRecipesBySearch(inputValue, this.state.searchCategory);
  }

  searchCategoryHandler(e){
    let inputValue = e.target.value;
    console.log(inputValue)
    this.setState({searchCategory: inputValue});
  }

  filterCurrentRecipesBySearch(searchInputValue, searchCategory){
    this.props.filterCurrentRecipesBySearch(searchInputValue, searchCategory);
  }

  render() {
    return (
      <div>
        <input value={this.state.searchInput} onChange={()=>{this.searchInputHandler(event)}}/>
        <select onChange={()=>{this.searchCategoryHandler(event)}}>
            <option value={"title"}>Title</option>
            <option value={"ingredient"}>Ingredient</option>
            <option value={"tag"}>Tag</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;