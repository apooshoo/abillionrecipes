import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        backButton = <FontAwesomeIcon icon="chevron-left" onClick={()=>{this.revertMode()}} style={{cursor: "pointer"}}/>
    }

    return (
      <div>
        {backButton}
        <span>Header: {pageHeader}</span>
      </div>
    );
  }
}

export default PageHeader;