import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
import Dashboard from './components/dashboard/dashboard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faCheckSquare, faCoffee)
library.add(fab, faChevronLeft)

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