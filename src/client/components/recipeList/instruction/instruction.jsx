import React from 'react';
import styled from 'styled-components';

import styles from './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Instruction extends React.Component {
  constructor() {
    super();
    this.state = {
        display: true,
        open: true,
    };
  }

  toggleOpenAndClose(){
    this.setState({open: !this.state.open});
  }

  toggleDisplayAndHide(){
    this.setState({display: !this.state.display});
  }


  render() {
    let instruction = this.props.instruction;
    let stepNumber = this.props.stepNumber;


    return (
      <div className="shadow-sm p-3 mb-1 pl-5 bg-white rounded" style={{display: this.state.display ? false : 'none'}}>
        <span   >Step {stepNumber}</span>
        <FontAwesomeIcon className="mx-5" icon={this.state.open ? "angle-down" : "angle-left"} onClick={()=>{this.toggleOpenAndClose()}} style={{cursor: "pointer"}}/>
        <FontAwesomeIcon icon="times" onClick={()=>{this.toggleDisplayAndHide()}} style={{cursor: "pointer"}}/>
        <hr/>
        <p style={{display: this.state.open ? false : 'none'}}>{instruction}</p>
      </div>
    );
  }
}

export default Instruction;