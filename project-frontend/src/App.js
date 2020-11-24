import React, { Component } from 'react';
import './App.css';

import RouterComponent from './component/RouterComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {

    return (
      
      <div className="container">
        <RouterComponent/>
      </div>

    );

  }
}

export default App;
