import React from 'react';

// import styles from './style.scss';
import PageHeader from '../pageHeader/pageHeader';
import Home from '../home/home';
import SearchBar from '../searchBar/searchBar';
import RecipeList from '../recipeList/recipeList';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        mode: "dashboard",
    };
  }

  changeMode(modeToChangeTo){
    console.log("modeToChangeTo:", modeToChangeTo);
    this.setState({mode: modeToChangeTo});
  }

  render() {
    let pageHeader;
    let pageContent;
    switch (this.state.mode) {
        case "dashboard":
            pageHeader = <PageHeader pageHeader={"Home"} changeMode={null}/>
            pageContent = <Home
                            changeMode={(e)=>this.changeMode(e)}
                        />
        break;
        case "explore":
            pageHeader = <PageHeader pageHeader={"Explore"} changeMode={(e)=>{this.changeMode(e)}}/>
            pageContent = <React.Fragment>
                            <SearchBar />
                            <RecipeList />
                          </React.Fragment>
        break;
        case "see yours":
            pageHeader = <PageHeader pageHeader={"See Yours"} changeMode={(e)=>{this.changeMode(e)}}/>
            pageContent = <React.Fragment>
                            <SearchBar />
                            <RecipeList />
                          </React.Fragment>
        break;
        case "create":
            pageHeader = <PageHeader pageHeader={"Create"} changeMode={(e)=>{this.changeMode(e)}}/>
            pageContent = <p>Forms Placeholder</p>
        break;
    }

    return (
      <div>
        {/* header = string, backButton = function to change mode */}
        <div className="page-header">
            {pageHeader}
        </div>
        <div className="page-content">
            {pageContent}
        </div>
      </div>
    );
  }
}

export default Dashboard;