import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="h-4" alt="logo" />
      </div>
    );
  }
}

export default App;
