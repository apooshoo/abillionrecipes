import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
import Dashboard from './components/dashboard/dashboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'hello',
    };
  }

  render() {
    return (
      <div>
        <Dashboard />

      </div>
    );
  }
}

export default hot(module)(App);