import React from 'react';

// import styles from './style.scss';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  changeMode(modeToChangeTo){
    this.props.changeMode(modeToChangeTo);
  }

  render() {
    return (
      <div>
        <p>home page</p>
        <button onClick={()=>{this.changeMode("explore")}}>Explore</button>
        <button onClick={()=>{this.changeMode("see yours")}}>See Yours</button>
        <button onClick={()=>{this.changeMode("create")}}>Create</button>
      </div>
    );
  }
}

export default Home;