import React from 'react';

// import styles from './style.scss';

//RETURNS PAGE HEADER AND BACK BUTTON
class PageHeader extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  changeMode(modeToChangeTo){
    this.props.changeMode(modeToChangeTo);
  }

  render() {
    {/* page header = string */}
    let pageHeader = this.props.pageHeader;

    {/* set the mode ( = string ) the back button redirects to in LINE 40*/}
    let modeToChangeTo;
    switch (pageHeader) {
        case "Home":
            modeToChangeTo = null;
        break;
        case "Explore":
        case "See Yours":
        case "Create":
            modeToChangeTo = "dashboard";
        break;
    }

    {/* call the back button if not Home */}
    let backButton;
    if (this.props.changeMode != null) {
        backButton = <button onClick={()=>{this.changeMode(modeToChangeTo)}}>Back</button>
    }

    return (
      <div>
        <span>Header: {pageHeader}</span>
        {backButton}
      </div>
    );
  }
}

export default PageHeader;