import React from 'react';
import styled from 'styled-components';

// import styles from './style.scss';

class Instruction extends React.Component {
  constructor() {
    super();
    this.state = {
        display: true,
    };
  }


  render() {
    let instruction = this.props.instruction;
    let stepNumber = this.props.stepNumber;


    return (
      <div className="instruction-step">
        <p>Step {stepNumber}</p>
        <p>{instruction}</p>
      </div>
    );
  }
}

export default Instruction;