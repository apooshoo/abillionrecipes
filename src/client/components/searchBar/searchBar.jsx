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
    //reset input when change category
    //maybe reduce confusion so users always see more being filtered to less.
    if(this.state.searchInput != ""){
        this.setState({searchInput: ""});
    };

    let inputValue = e.target.value;
    this.setState({searchCategory: inputValue});

  }

  filterCurrentRecipesBySearch(searchInputValue, searchCategory){
    this.props.filterCurrentRecipesBySearch(searchInputValue, searchCategory);
  }

  render() {
    return (
      <div className="row shadow-sm py-1 mb-2 bg-white rounded">
        <div className="input-group col-9 px-1">
            <div className="input-group-prepend">
                <span className="input-group-text">Search</span>
            </div>
            <input className="form-control" value={this.state.searchInput} onChange={()=>{this.searchInputHandler(event)}}/>
        </div>
        <select className="form-control col-3" onChange={()=>{this.searchCategoryHandler(event)}}>
            <option value={"title"}>Title</option>
            <option value={"ingredient"}>Ingredient</option>
            <option value={"tag"}>Tag</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;