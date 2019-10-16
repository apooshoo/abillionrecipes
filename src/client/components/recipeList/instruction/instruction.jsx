import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';

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
      <div className="instruction-step" style={{display: this.state.display ? false : 'none'}}>
        <span onClick={()=>{this.toggleOpenAndClose()}}>Step {stepNumber}</span>
        <button onClick={()=>{this.toggleDisplayAndHide()}}>Hide</button>
        <p style={{display: this.state.open ? false : 'none'}}>{instruction}</p>
      </div>
    );
  }
}

export default Instruction;