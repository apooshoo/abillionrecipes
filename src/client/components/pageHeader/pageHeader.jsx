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

    {/* set the mode ( = string ) the back button redirects to */}
    let modeToChangeTo;
    switch (pageHeader) {
        case "Home":
            modeToChangeTo = null;
        break;
        case "Explore":
            modeToChangeTo = "dashboard";
        break;
        case "See Yours":
            modeToChangeTo = "dashboard";
        break;
        case "Create":
            modeToChangeTo = "dashboard";
        break;
    }

    let backButton;
    if (this.props.changeMode != null) {
        backButton = <button onClick={()=>{this.changeMode(modeToChangeTo)}}>Button</button>
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