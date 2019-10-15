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

  revertMode(){
    this.props.revertMode();
  }

  render() {
    {/* page header = string */}
    let pageHeader = this.props.pageHeader;

    {/* call the back button if not Home */}
    let backButton;
    if (this.props.revertMode != null) {
        backButton = <button onClick={()=>{this.revertMode()}}>Back</button>
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