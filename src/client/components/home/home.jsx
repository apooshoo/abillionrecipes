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
      <div className="row">
        <div className="col-8 offset-2 col-md-6 offset-md-3 shadow py-5 my-2 bg-white rounded">
            <div className="row">
                <button className="col-8 shadow-sm offset-2 my-4 btn btn-secondary" onClick={()=>{this.changeMode("explore")}}>Explore</button>
                <button className="col-8 shadow-sm offset-2 my-4 btn btn-secondary" onClick={()=>{this.changeMode("see yours")}}>See Yours</button>
                <button className="col-8 shadow-sm offset-2 my-4 btn btn-secondary" onClick={()=>{this.changeMode("create")}}>Create</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;