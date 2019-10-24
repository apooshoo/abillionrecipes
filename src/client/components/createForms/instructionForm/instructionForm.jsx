import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './style.scss';


//RETURNS PAGE HEADER AND BACK BUTTON
class InstructionForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  updateInstructionsInput(instructionIndex, inputValue){
    this.props.updateInstructionsInput(instructionIndex, inputValue);
  }


  render() {
    let instruction = this.props.instruction;
    let instructionIndex = this.props.instructionIndex;


    return (

      <div className="instruction-item shadow-sm px-4 py-3 mb-1 bg-white rounded">
        <div>
            <label htmlFor={"instruction-input"}>Step {instructionIndex+1}: </label>
            <input id={"instruction-input"} value={instruction} onChange={()=>{this.updateInstructionsInput(instructionIndex, event.target.value)}}/>
        </div>

      </div>
    );
  }
}

export default InstructionForm;